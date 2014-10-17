Treelo.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],

    orderOptions: {
    modelElement: '.card-display',
    modelName: 'card',
    subviewContainer: '.list-cards'
  },

  className: "show-list",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);

    var cardNewView = new Treelo.Views.CardsNew({ model: this.model });

  },

  events: {
    "click .new-card": "createCard",
    "click .delete-list": "deleteList",
    'sortreceive': 'receiveCard',
    'sortremove': 'removeCard',
    'sortstop': 'saveCards'
  },

  addCard: function(card) {
    var cardView = new Treelo.Views.CardShow({ model: card });
    this.addSubview(".show-cards", cardView.render());
  },

  // removeCard: function (card) {
  //   var subview = _.find(
  //     this.subviews(".show-cards"),
  //     function (subview) {
  //       return subview.model === card;
  //     }
  //   );
  //
  // this.removeSubview(".show-cards", subview);
  // },

  removeCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        cards = this.model.cards(),
        cardToRemove = cards.get(cardId),
        cardSubviews = this.subviews('.show-cards');
    cards.remove(cardToRemove);

    var subviewToRemove = _.findWhere(cardSubviews, {model: cardToRemove});
    cardSubviews.splice(cardSubviews.indexOf(subviewToRemove), 1);
  },

  createCard: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget.parentElement);
    $newInput = $form.find(".new-card-title");
    var cardTitle = $newInput.val();

    var newCard = new Treelo.Models.Card({
      title: cardTitle,
      list_id: this.model.id
    });

    var that = this;
    newCard.save({}, {
      success: function () {
        that.model.cards().add(newCard);
      }
    });

    $newInput.val("");
  },

  receiveCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        newOrd = $cardDisplay.index();
    var cardClone = new Treelo.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    // cardClone.save();
    // this.collection.add(cardClone, {silent: true});
    // this.saveCards(event);
  },

  deleteList: function (event) {
    event.preventDefault();
    this.model.destroy();

  },

  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    // this.attachSubviews();
    this.renderCards();
    this.renderCardForm();
    return this;
  },

  renderCards: function () {
    this.model.cards().each(this.addCard.bind(this));
    this.$('.show-cards').sortable({connectWith: '.show-cards'});
  },

  renderCardForm: function () {
    var view = new Treelo.Views.CardsNew({
      collection: this.collection
    });
    this.addSubview('.new-cards-form', view);
  },

  saveCards: function(event) {
    event.stopPropagation();
    // this.saveOrds();
  }

});
