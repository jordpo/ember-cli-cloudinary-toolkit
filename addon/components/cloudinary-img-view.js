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

  cloudinaryCropData: null,

  crop: Ember.computed('cloudinaryCropData', function() {
    return get(this, 'cloudinaryCropData') ? 'crop' : 'fill';
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

  src: computed('cloudinaryId', 'imageAttrs', 'cloudinaryCropData', function() {
    const cloudinaryId = get(this, 'cloudinaryId');
    const imageAttrs = get(this, 'imageAttrs');
    const cloudinaryCropData = get(this, 'cloudinaryCropData');

    if (get(this, 'hasImage')) {
      if (cloudinaryCropData) {
        merge(imageAttrs, JSON.parse(cloudinaryCropData));
      }

      return cloudinary.url(cloudinaryId, imageAttrs);
    }
  })
});
