var AppTemplates = {};

AppTemplates['app'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<section class=\"blogapp\">\n    <header class=\"header\">\n        <button class=\"addcomment\">Add a comment</button>\n        <form class=\"new-blog\">\n            <label>Email:</label>\n            <input type=\"text\" class=\"email\">\n\n            <label>Comment:</label>\n            <textarea name=\"text\" class=\"comment\" cols=\"30\" rows=\"10\"></textarea>\n\n            <button class=\"submit\">Submit</button>\n        </form>\n    </header>\n    <section class=\"main\">\n        <ul class=\"blog-list\">\n        </ul>\n    </section>\n</section>\n";
},"useData":true});
AppTemplates['blog'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <p> Email: "
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "</p>\n    <p> Comments: \""
    + alias3(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"comment","hash":{},"data":data}) : helper)))
    + "\"</p>\n";
},"useData":true});
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

var BlogView = Backbone.View.extend({
  tagName: 'li',
  template: AppTemplates.blog,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  // events: {

  // },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);

    return this;
  },

});

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '#target',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
    'click .addcomment': 'addComment',  // When addcomment button is clicked, form section appears
    'submit form': 'submit',
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(html);
    this.collection.forEach(function(blog) {
      var childView = new BlogView({model: blog});

      _this.$el.find('.blog-list')
        .append(childView.render().$el);
    });

    console.info('render');
    return this;
  },

  // Event
  addComment: function() {
    this.$el.find('.new-blog').slideDown();
  },

  // Event
  submit: function(ev) {
    ev.preventDefault();

    var email = this.$el.find('input.email').val();
    var comment = this.$el.find('textarea.comment').val();
    this.collection.create({email: email, comment: comment});
  },

});

// Created Collection and View instances:
var blog = new BlogList();
var app = new AppView({collection: blog});
//# sourceMappingURL=app.map