Treelo.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  cards: function (){
    if (this._cards) {
      return this._cards;
    } else {
      this._cards = new Treelo.Collections.Cards([], { Card: this });
      return this._cards;
    }
  },

  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards, { parse: true });
      delete response.cards;
    }

    return response;
  }
});
