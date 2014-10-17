Treelo.Views.BoardIndexRow = Backbone.View.extend({
  template: JST["boards/board_subview"],

  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});

Treelo.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],

  initialize: function ($rootEl) {
    var view = this;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoardSubview);
    this.listenTo(this.collection, 'remove', this.removeIndexSubview);

    //setup subview, each over collection
    this.collection.each(function (board) {
      var boardSubview = new Treelo.Views.BoardIndexRow ({ model: board});
      view.addSubview(".board-index", boardSubview.render());
    });

    var newBoardView = new Treelo.Views.BoardsNew({ model: this.model });
    this.addSubview(".new-board", newBoardView.render());
  },

  events: {

  },

  addBoardSubview: function (board) {
    var boardSubview = new Treelo.Views.BoardIndexRow ({ model: board});
    this.addSubview(".board-index", boardSubview.render());
  },

  removeBoardSubview: function (board) {
    var subview = _.find(
      this.subviews(".board-index"),
      function (subview) {
        return subview.model === board;
      }
    );

    this.removeSubview(".board-index", subview);
  },

  boardsIndexSubview: Treelo.Views.BoardIndexRow,

  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },

});
