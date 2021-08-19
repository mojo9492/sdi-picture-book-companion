
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {nsn: 'a', first: 'aa', last: 'aaa', quantity: 1},
        {nsn: 'b', first: 'bb', last: 'bbb', quantity: 1},
        {nsn: 'c', first: 'cc', last: 'ccc', quantity: 1},
        {nsn: 'd', first: 'dd', last: 'ddd', quantity: 1},
        {nsn: 'e', first: 'ee', last: 'eee', quantity: 1},
        {nsn: 'f', first: 'ff', last: 'fff', quantity: 1},
      ]);
    });
};
