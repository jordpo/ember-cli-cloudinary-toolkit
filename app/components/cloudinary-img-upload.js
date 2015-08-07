import Ember from 'ember';
import ENV from '../config/environment';

const { get, set, merge, isBlank } = Ember;
const { APP: { cloudinary } } = ENV;

// sample config settings
// ENV.APP.cloudinary = {
//   name: '',
//   uploadPreset: '',
//   // global settings for upload behavior
//   imgUploadSettings: {
//     disableImageResize: false,
//     imageMaxWidth: 1000,
//     imageMaxHeight: 1000,
//     acceptFileTypes: '(\.|\/)(gif|pdf|jpe?g|png|bmp|ico)$',
//     maxFileSize: 20000000, // 20MB
//   }
// };

export default Ember.Component.extend({
  classNames: ['CloudinaryImgUpload'],
  classNameBindings: ['isUploading', 'isFailed', 'isSucceeded'],
  cloudinaryId: null,
  progress: null,

  isUploading: false,
  isFailed: false,
  isSucceeded: false,

  imgUploadSettings: null,

  config: Ember.on('didInsertElement', function() {
    const input = this.$('input');
    const imgUploadSettings = get(this, 'imgUploadSettings') || cloudinary.imgUploadSettings;

    if (isBlank(imgUploadSettings)) {
      console.log('No imgUploadSettings detected.');
      return;
    }

    // add the drop and paste zones to settings
    merge(imgUploadSettings, {
      dropZone: input,
      pasteZone: input
    });

    // convert string to a reg ex
    imgUploadSettings.acceptFileTypes = new RegExp(imgUploadSettings.acceptFileTypes, 'i');

    // initialize cloudinary upload on the input element
    input.unsigned_cloudinary_upload(cloudinary.uploadPreset,
      { cloud_name: cloudinary.name }, imgUploadSettings
    );

    this.setEventHandlers(input);
  }),

  setEventHandlers(input) {
    input.bind('fileuploaddone', (e, data) => {
      Ember.run(() => {
        set(this, 'cloudinaryId', data.result.public_id);
      });

      this.toggleStates('isSucceeded');

      if (get(this, 'onSuccess')) {
        this.sendAction(get(this, 'onSuccess'));
      }
    });

    input.bind('fileuploadprogressall', (e, data) => {
      set(this, 'progress', parseInt(data.loaded / data.total * 100, 10));
      this.toggleStates('isUploading');

      if (get(this, 'onUploading')) {
        this.sendAction(get(this, 'onUploading'));
      }
    });

    input.bind('fileuploadprocessfail', () => {
      this.toggleStates('isFailed');

      if (get(this, 'onFail')) {
        this.sendAction(get(this, 'onFail'));
      }
    });
  },

  toggleStates(currentState) {
    const states = ['isUploading', 'isSucceeded', 'isFailed'];

    states.forEach((state) => {
      const isCurrent = currentState === state;
      set(this, state, isCurrent);
    });
  }
});
