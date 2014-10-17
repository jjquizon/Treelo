Treelo.Collections.Boards = Backbone.Collection.extend({
  model: Treelo.Models.Board,
  url: "api/boards",

  getOrFetch: function (id) {
    var getBoard = this.get(id);

    if (!getBoard){
      getBoard = new Treelo.Models.Board({
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

Treelo.Collections.boards = new Treelo.Collections.Boards();
