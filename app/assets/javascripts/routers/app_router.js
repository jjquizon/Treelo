Treelo.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "api/boards/new" : "boardsNew",
    "api/boards/:id" : "boardShow"
  },

  initialize: function($rootEl) {
    this.$rootEl = $rootEl;
  },

  boardsIndex: function () {
    Treelo.Collections.boards.fetch();
    var boardsIndexView = new Treelo.Views.BoardsIndex({
      collection: Treelo.Collections.boards
    });

    this._swapView(boardsIndexView);
  },

  boardShow: function (id) {
    var board = Treelo.Collections.boards.getOrFetch(id);
    var boardShowView = new Treelo.Views.BoardShow({
      model: board
    });

    this._swapView(boardShowView);
  },

  boardsNew: function () {
    var newView = new Treelo.Views.BoardsNew();
    this._swapView(newView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


});
