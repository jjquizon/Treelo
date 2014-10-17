TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  url: "api/lists",

  getOrFetch: function (id) {
    var getList = this.get(id);

    if (!getList){
      getList = new TrelloClone.Models.List({
        id: id
      });

      var that = this;
      getList.fetch({
        success: function (){
          that.add(getList);
        }
      });
    }
    return getList;
  }

});
