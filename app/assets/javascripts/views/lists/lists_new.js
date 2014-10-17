TrelloClone.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],

  events: {
    "click .new-list": "createList"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  createList: function () {
    event.preventDefault();
    var listTitle = this.$('#list-title').val();
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
    this.$('#list-title').val("");
  }
});
