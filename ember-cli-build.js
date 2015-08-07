/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/jquery-ui/ui/widget.js');
  app.import('bower_components/cloudinary_js/js/load-image.min.js');
  app.import('bower_components/cloudinary_js/js/canvas-to-blob.min.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.iframe-transport.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.fileupload.js');
  app.import('bower_components/cloudinary_js/js/jquery.cloudinary.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-process.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-image.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js');

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
