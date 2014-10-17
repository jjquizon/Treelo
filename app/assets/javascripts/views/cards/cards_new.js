TrelloClone.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/new"],

  render: function() {
    renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  createList: function () {
    event.preventDefault();
    var listTitle = this.$('#card-title').val();
    var newList = new TrelloClone.Models.List({
      "title": listTitle,
      "board_id" : this.model.id
      });
    var that = this;
    newList.save({}, {
      success: function () {
          that.model.lists().add(newList);
      }
    });
  }
});
