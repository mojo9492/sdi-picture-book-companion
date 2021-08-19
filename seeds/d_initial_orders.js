
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {item_id: '5', user_id: '1', quantity: 1},
        {item_id: '2', user_id: '2', quantity: 4},
        {item_id: '4', user_id: '3', quantity: 2},
        {item_id: '2', user_id: '4', quantity: 3},
        {item_id: '3', user_id: '5', quantity: 1},
        {item_id: '1', user_id: '6', quantity: 1}
      ]);
    });
};
