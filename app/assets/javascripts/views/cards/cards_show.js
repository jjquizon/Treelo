Treelo.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],

  className: "card",

  attributes: function() {
    return {
      'data-card-id': this.model.id
    };
  },

  render: function() {
    renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
