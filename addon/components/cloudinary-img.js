import Ember from 'ember';

const cloudinary = Ember.$.cloudinary;
const { computed, get } = Ember;
const { oneWay, notEmpty } = computed;

export default Ember.Component.extend({
  classNames:        ['cloudinary-img'],
  imageId:           null,

  // defaults
  height:            500,
  width:             500,
  alt:               oneWay('imageId'),
  crop:              'fill',

  hasImage:          notEmpty('imageId'),

  src: computed('imageId', 'height', 'width', 'crop', 'format', function() {
    if (get(this, 'hasImage')) {
      return cloudinary.url(get(this, 'imageId'), {
        height: get(this, 'height'),
        width:  get(this, 'width'),
        crop:   get(this, 'crop'),
        format: get(this, 'format')
      });
    }
  })
});
