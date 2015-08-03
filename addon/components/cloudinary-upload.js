import Ember from 'ember';
import ENV from '../config/environment';

const { get, set } = Ember;

export default Ember.Component.extend({
  tagName:           'label',
  classNames:        ['cloudinary-fileupload'],
  attributeBindings: 'title',
  title: null,

  // defaults
  disableImageResize: false,
  imageMaxWidth: 1000,
  imageMaxHeight: 1000,
  acceptFileTypes: /(\.|\/)(gif|pdf|jpe?g|png|bmp|ico)$/i,
  maxFileSize: 20000000, // 20MB


  didInsertElement: function() {
    const self = this.$();
    const input = this.$('input');

    // initial config
    input.unsigned_cloudinary_upload(
      ENV.CLOUDINARY_UPLOAD_PRESET,
      { cloud_name: ENV.CLOUDINARY_NAME },
      {
        dropZone: self,
        pasteZone: self,
        disableImageResize: get(this, 'disableImageResize'),
        imageMaxHeight: get(this, 'imageMaxHeight'),
        imageMaxWidth: get(this, 'imageMaxWidth'),
        acceptFileTypes: get(this, 'acceptFileTypes'),
        maxFileSize: get(this, 'maxFileSize')
      }
    );

    // event handler for success event
    input.bind('fileuploaddone', (e, data) => {

      // run this synchronously to update all observers
      Ember.run(() => {
        set(this, 'value', data.result.public_id);
      });

      this.wuphf.success('Uploaded successfully');

      // handle callback
      if (get(this, 'onUpload')) {
        this.sendAction(get(this, 'onUpload'));
      }
    });

    // event handlers for loading and fail events
    self.bind('fileuploadprogressall', (e, data) => {
      set(this, 'progress', parseInt(data.loaded / data.total * 100, 10));
    });

    self.bind('fileuploadprocessfail', () => {
      this.wuphf.danger('Upload failed');
    });
  }
});
