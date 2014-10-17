window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    console.log("Starting");
    this.$rootEl = $("main");
    var router = new TrelloClone.Routers.AppRouter(this.$rootEl);
    Backbone.history.start();
  }
};

$(TrelloClone.initialize);


Backbone.CompositeView = Backbone.View.extend({

  // add subview to the subview's array and attach it to the page
  addSubview: function (selector, subview) {
    // this.subviews(selector) will return an array, we'll append to that
    this.subviews(selector).append(subview);

    // after appending, now we attach it. call the render on subview
    this.attachSubview(selector, subview.render());
  },

  // appending a subView to a selector
  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);

    // must call delegateEvents on the subView again
    subview.delegateEvents();
  },

  // this method will be used to attach all the subviews to the container
  attachSubviews: function () {
    var view = this;

    // iterate through its array of subviews
    // use underscore because array doesn't have an each method
    // call

    // value, key into function
    _(this.subviews()).each( function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    // must call this on the backbone view to get original remove()
    Backbone.View.prototype.remove.call(this);

    // must remove all subviews to not get zombie views
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    // remove the subview
    subview.remove();

    // must also remove it from the view's array
    var subviews = this.subviews(select);
    subviews.splice(subviews.indexOf(subview), 1);

  },

  subviews: function (selector) {
    //initialize subViews hash or, if exists, calls it
    this._subviews = this._subviews || {};

    //if no selector provided, return all the subviews
    if (!selector) {
      return this._subviews;
    } else {
      // if selector provided, call or initialize the subViews array
      this._subViews[selector] = this._subViews[selector] || [];
      //return this value selector's array
      return this._subViews[selector];
    }
  }

});
