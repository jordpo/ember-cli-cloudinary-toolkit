import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['c-progress-bar'],

  percentComplete: function() {
    const current = this.get('current');
    const max = this.get('max');

    if (Ember.isBlank(current)) {
      return 0;
    } else {
      return Math.min((current / max) * 100, 100);
    }
  }.property('current', 'max'),

  setProgressWidth: function() {
    const percentComplete = this.get('percentComplete');
    this.$('.c-progress-bar-progress').css('width', percentComplete + '%');
  }.on('didInsertElement').observes('percentComplete')
});
