Treelo.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards",

  lists: function (){
    if (this._list) {
      return this._list;
    } else {
      this._list = new Treelo.Collections.Lists([], { Board: this });
      return this._list;
    }
  },

  parse: function (payload) {
    if (payload.lists) {
      this.lists().set(payload.lists, { parse: true });
      delete payload.lists;
    }

    return payload;
  }

});
