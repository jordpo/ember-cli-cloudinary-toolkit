import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  position: 'top',
  classNames: ['c-tool-tip hint-fade'],
  classNameBindings: ['hintClass'],
  attributeBindings: ['dataHint:data-hint'],
  showHint: true,

  dataHint: function() {
    if (this.get('showHint')) {
      return this.get('title');
    }
  }.property('title'),

  hintClass: function() {
    return 'hint-' + this.get('position');
  }.property('position')
});
