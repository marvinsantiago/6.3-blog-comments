var BlogView = Backbone.View.extend({
  tagName: 'li',
  template: AppTemplates.blog,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'change .toggle': 'toggleDone',
    'click .destroy': 'burnItWithFire',
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    this.$el.toggleClass('completed', this.model.get('done'));

    return this;
  },

  toggleDone: function() {
    this.model.set('done', !this.model.get('done'));
    this.model.save();
  },

  burnItWithFire: function() {
    var _this = this;
    this.$el.slideUp(function() {
      _this.model.destroy();
      _this.remove();
    });
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
    'submit form': 'addBlog',
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(html);
    this.collection.sortBy('done').forEach(function(blog) {
      var childView = new BlogView({model: blog});

      _this.$el.find('.blog-list')
        .append(childView.render().$el);
    });

    console.info('render');

    this.$('.new-blog').focus();
    return this;
  },

  addBlog: function(ev) {
    ev.preventDefault();

    var title = this.$el.find('input').val();
    this.collection.create({title: title});
    this.$el.find('input').val('');
  },

});
