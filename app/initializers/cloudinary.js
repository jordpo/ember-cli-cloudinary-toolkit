import Ember from 'ember';
import ENV from '../config/environment';

function initialize(/* container, application */) {
  Ember.$.cloudinary.config({
    cloud_name: ENV.CLOUDINARY_NAME
  });
}

export default {
  name: 'cloudinary',
  initialize: initialize
};
