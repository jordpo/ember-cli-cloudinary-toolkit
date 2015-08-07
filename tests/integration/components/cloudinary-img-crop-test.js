import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cloudinary-img-crop', 'Integration | Component | cloudinary img crop', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cloudinary-img-crop}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cloudinary-img-crop}}
      template block text
    {{/cloudinary-img-crop}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
