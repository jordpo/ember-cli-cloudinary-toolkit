import Ember from 'ember';
import ENV from '../config/environment';

const { APP: { cloudinary } } = ENV;

function initialize(/* container, application */) {
  Ember.$.cloudinary.config({
    cloud_name: cloudinary.name
  });
}

export default {
  name: 'cloudinary',
  initialize: initialize
};
