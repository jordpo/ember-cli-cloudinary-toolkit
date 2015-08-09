import Ember from 'ember';

const cloudinary = Ember.$.cloudinary;
const { computed, get, merge } = Ember;
const { notEmpty } = computed;

export default Ember.Component.extend({
  classNames:['CloudinaryImgView'],
  classNameBindings:['hasImage'],
  cloudinaryId: null,
  alt: null,

  height: null,
  width: null,
  format: null, // defaults to jpg

  cropData: null,

  crop: Ember.computed('cropData', function() {
    return get(this, 'cropData') ? 'crop' : 'fill';
  }),

  hasImage: notEmpty('cloudinaryId'),

  imageAttrs: Ember.computed('height', 'width', 'crop', 'format', function() {
    const attrs = ['height', 'width', 'crop', 'format'];

    return attrs.reduce((imageAttrs, attr) => {
      if (get(this, attr)) {
        imageAttrs[attr] = get(this, attr);
      }

      return imageAttrs;
    }, {});
  }),

  src: computed('cloudinaryId', 'imageAttrs', 'cropData', function() {
    const cloudinaryId = get(this, 'cloudinaryId');
    const imageAttrs = get(this, 'imageAttrs');
    const cropData = get(this, 'cropData');

    if (get(this, 'hasImage')) {

      // add cropData if present
      if (cropData) {
        merge(imageAttrs, cropData);
      }

      return cloudinary.url(cloudinaryId, imageAttrs);
    }
  })
});
