import Ember from 'ember';

const { get, set, merge } = Ember;

function normalize(data) {
  data.x = data.x.toFixed();
  data.y = data.y.toFixed();
  data.width = data.width.toFixed();
  data.height = data.height.toFixed();
  data.angle = data.rotate;
  delete data.rotate;
  return data;
}

export default Ember.Component.extend({
  classNames: ['CloudinaryImgCrop'],
  cloudinaryId: null,
  cloudinaryCropData: null,

  // pass this in to customize config
  customConfig: {},

  initializeCrop: Ember.on('didInsertElement', function() {
    const img = this.$('img');
    const customConfig = get(this, 'customConfig');
    const config = {
      aspectRatio: 1,
      zoomable: false,
      crop: (data) => {
        data = JSON.stringify(normalize(data));
        set(this, 'cloudinaryCropData', data);
      }
    };

    merge(config, customConfig);
    return img.cropper(config);
  })
});
