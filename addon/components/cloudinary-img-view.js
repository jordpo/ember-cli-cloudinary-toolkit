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
  crop: 'fill',
  format: null, // defaults to jpg

  hasImage: notEmpty('cloudinaryId'),

  imageAttrs: Ember.computed('height', 'width', 'crop', 'format', function() {
    const imageAttrs = {};
    const attrs = ['height', 'width', 'crop', 'format'];

    attrs.forEach((attr) => {
      if (get(this, attr)) {
        merge(imageAttrs, get(this, attr));
      }
    });

    return imageAttrs;
  }),

  src: computed('cloudinaryId', function() {
    if (get(this, 'hasImage')) {
      return cloudinary.url(get(this, 'cloudinaryId'), get(this, 'imageAttrs'));
    }
  })
});
