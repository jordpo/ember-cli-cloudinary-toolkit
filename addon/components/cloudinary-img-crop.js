import Ember from 'ember';

const { get, set, merge, run } = Ember;
const { debounce } = run;
const cloudinary = Ember.$.cloudinary;

function normalizeData(data) {
  // cloudinary uses angle instead of rotate as key name
  data.angle = data.rotate;
  delete data.rotate;

  // check if all crucial values are 0 indicating a clear trigger
  const isClear = ['width', 'height', 'x', 'y'].every((k) => {
    return data[k] === 0;
  });

  return isClear ? null : data;
}

export default Ember.Component.extend({
  classNames: ['CloudinaryImgCrop'],

  // public
  cloudinaryId: null,
  cropData: null,
  config: {},
  autoSave: true,
  cropperPreview: false,
  format: 'jpg',

  // private
  $img: null,

  _cropperMethods: [
    Ember.A(['Drag move', 'setDragMode', 'move']),
    Ember.A(['Drag crop', 'setDragMode', 'crop']),
    Ember.A(['Zoom in', 'zoom', 0.1]),
    Ember.A(['Zoom out', 'zoom', -0.1]),
    Ember.A(['Rotate left', 'rotate', -45]),
    Ember.A(['Rotate right', 'rotate', 45]),
    Ember.A(['Crop', 'crop']),
    Ember.A(['Clear', 'clear']),
    Ember.A(['Disable', 'disable']),
    Ember.A(['Enable', 'enable']),
    Ember.A(['Reset', 'reset'])
  ],

  cropperMethods: Ember.computed('_cropperMethods', function() {
    return get(this, '_cropperMethods').filter((item) => {
      return !!get(this, item[1]);
    });
  }),

  cloudinaryUrl: Ember.computed('cloudinaryId', function() {
    const cloudinaryId = get(this, 'cloudinaryId');
    const $img = get(this, '$img');
    const format = get(this, 'format');


    if (cloudinaryId) {
      const cloudinaryUrl = cloudinary.url(cloudinaryId, {format: format});

      // ensure the img cropper has the correct image url
      if ($img) {
        $img.cropper('replace', cloudinaryUrl);
      }

      return cloudinaryUrl;
    }
  }),

  initializeCropper: Ember.on('didInsertElement', function() {
    const $img = this.$('.CloudinaryImgCrop-img > img');
    const config = get(this, 'config');

    set(this, '$img', $img);

    merge(config, {
      preview: '.CloudinaryImgCrop-preview',
      crop: () => {
        if (get(this, 'autoSave')) {
          debounce(this, this.finalizeCrop, 500);
        }
      }
    });

    return $img.cropper(config);
  }),

  finalizeCrop() {
    const $img = get(this, '$img');
    let cropData = $img.cropper('getData', true);

    cropData = normalizeData(cropData);

    run(() => {
      set(this, 'cropData', cropData);
    });

    if (get(this, 'afterCrop')) {
      this.sendAction('afterCrop');
    }
  },

  actions: {
    save() {
      this.finalizeCrop();
    },

    triggerCropperMethod(cropperMethod) {
      const $img = get(this, '$img');
      const method = cropperMethod[1];
      const arg = cropperMethod[2];

      $img.cropper(method, arg);
    }
  }
});
