Treelo.Views.BoardsNew = Backbone.CompositeView.extend({
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
    var newBoard = new Treelo.Models.Board({"title": boardTitle});
    var that = this;
    newBoard.save({}, {
      success: function () {
          Treelo.Collections.boards.add(newBoard);
          Backbone.history.navigate("api/boards/" + newBoard.id, { trigger: true});
      }
    });
  }
});
