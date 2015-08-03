import Ember from 'ember';

const { computed, get } = Ember;
const { oneWay } = computed;


function or(property, ...values) {
  return Ember.computed(property, function() {
    return values.any((value) => {
      return get(this, property) === value;
    });
  });
}

export default Ember.Component.extend({
  classNames: ['editable-image'],
  faIcon: null,
  placeholderText: null,
  title: 'Max file size is 20MB and accepted file types are jpeg, pdf, png, and gif.',
  progress: 0,

  value: null,
  uploadClass: null,

  // defaults
  isEditable: true,
  alt: oneWay('value'),
  onUpload: null,
  height: 500,
  width: 500,

  hideProgress: or('progress', 0, 100),

  actions: {
    hideAndCallback: function() {
      if (get(this, 'onUpload')) {
        this.sendAction(get(this, 'onUpload'));
      }
    }
  },
});
