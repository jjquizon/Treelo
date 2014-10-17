TrelloClone.Collections.Boards = Backbone.Collection.extend({
  model: TrelloClone.Models.Board,
  url: "api/boards",

  getOrFetch: function (id) {
    var getBoard = this.get(id);

    if (!getBoard){
      getBoard = new TrelloClone.Models.Board({
        id: id
      });

      var that = this;
      getBoard.fetch({
        success: function (){
          that.add(getBoard);
        }
      });
    } else {
      getBoard.fetch();
    }

    return getBoard;
  }

});

TrelloClone.Collections.boards = new TrelloClone.Collections.Boards();
