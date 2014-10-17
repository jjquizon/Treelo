TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function () {

    var listNewView = new TrelloClone.Views.ListsNew({ model: this.model });
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList);
  },

  events: {
    "click .delete-board": "deleteBoard"
  },

  addList: function (list) {
    var listView = new TrelloClone.Views.ListShow({ model: list });
    this.addSubview("#show-lists", listView.render());
  },

  removeList: function (list) {
    var subview = _.find(this.subviews("#show-lists"),
      function (subview) {
        return subview.model === list;
      }
    );
    this.removeSubview("#show-lists", subview);
  },

  deleteBoard: function(event) {
    event.preventDefault();
    this.remove();

    this.model.destroy({
      success: function (){
        Backbone.history.navigate("/", { trigger: true});
      }
    });
  },

  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.renderLists();
    this.renderListForm();
    return this;
  },

  renderLists: function () {
    this.model.lists().each(this.addList.bind(this));
    this.$('#show-lists').sortable();
  },

  renderListForm: function () {
    var view = new TrelloClone.Views.ListsNew({
      model: this.model
    });
    this.addSubview('.new-lists-form', view);
  }


});
