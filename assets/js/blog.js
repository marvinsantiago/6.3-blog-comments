/**
 * Defined Model class
 *
 */

var Blog = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    email: null,
    comment: null,
  },
});

/**
 * Defined Collection
 */

var BlogList = Backbone.Collection.extend({
  model: Blog,
  url: 'http://tiny-lr.herokuapp.com/collections/ms-comments',
});
