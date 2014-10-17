TrelloClone.Views.BoardsNew = Backbone.CompositeView.extend({
  template: JST["boards/new"],

  events: {
    "click .button.new-board": "createBoard"
  },

  render: function () {
    var renderContent = this.template();
    this.$el.html(renderContent);
    return this;
  },

  createBoard: function () {
    event.preventDefault();
    var boardTitle = this.$('.new-board-title').val();
    var newBoard = new TrelloClone.Models.Board({"title": boardTitle});
    var that = this;
    newBoard.save({}, {
      success: function () {
          TrelloClone.Collections.boards.add(newBoard);
          Backbone.history.navigate("api/boards/" + newBoard.id, { trigger: true});
      }
    });
  }
});
