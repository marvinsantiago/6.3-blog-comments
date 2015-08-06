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
    'click .submit': 'submit',
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
  submit: function() {
    var email = this.$el.find('input.email').val();
    var comment = this.$el.find('input.comment').val();
    this.collection.create({email: email, comment: comment});
  },

});
