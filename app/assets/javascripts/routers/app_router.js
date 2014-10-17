TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "api/boards/new" : "boardsNew",
    "api/boards/:id" : "boardShow"
  },

  initialize: function($rootEl) {
    this.$rootEl = $rootEl;
  },

  boardsIndex: function () {
    TrelloClone.Collections.boards.fetch();
    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });

    this._swapView(boardsIndexView);
  },

  boardShow: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    var boardShowView = new TrelloClone.Views.BoardShow({
      model: board
    });

    this._swapView(boardShowView);
  },

  boardsNew: function () {
    var newView = new TrelloClone.Views.BoardsNew();
    this._swapView(newView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


});
