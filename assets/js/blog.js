/**
 * Defined Model class
 *
 */

var Blog = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    email: '',
    comment: '',
  },
});

/**
 * Defined Collection
 */

var BlogList = Backbone.Collection.extend({
  model: Blog,
  url: 'http://tiny-lr.herokuapp.com/collections/ms-comments',
});
