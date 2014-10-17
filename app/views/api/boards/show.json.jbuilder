# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :id, :title, :created_at)
json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.board_id list.board_id
  json.ord list.ord
  json.created_at list.created_at
  json.updated_at list.updated_at
  json.cards list.cards do |card|
    json.title card.title
  end
end
#
# # json.(@list, :id, :title, :created_at, :updated_at, :board_id, :ord)
# json.cards @list.cards do |card|
#   json.id card.id
#   json.title card.title
#   json.description card.description
#   json.ord card.ord
#   json.list_id card.list_id
#   json.created_at card.created_at
#   json.updated_at card.updated_at
# end
#
# # json.(@card, :id, :title, :description, :created_at, :updated_at, :board_id, :ord)
# json.item @card.items do |item|
#   json.id item.id
#   json.title item.title
#   json.card_id item.card_id
#   json.done item.done
#   json.created_at item.created_at
#   json.updated_at item.updated_at
# end
#
# # json.(@item, :id, :title, :card_id, :done, :created_at, :updated_at)
#
#
# # json.(@article, :id, :name, :published_at)
