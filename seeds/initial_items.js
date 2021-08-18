
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {nomenclature: 'Desert Boot', common: "Compat Boots", part_number: "", nsn: "8430-01-514-5168", accounting: "", category: "clothing" , description: "Boots, Desert, 3-Layer, Hot Weather	(size:12R)"},
        {nomenclature: 'ACU Gore-Tex Parka', common: "Wet Weather Top", part_number: "", nsn: "8415-01-526-9181" , accounting: "", category: "clothing", description: "2nd Generation ECWCS parka is a soft and quiet outerwear garment constructed of durably waterproof GORE-TEX fabric and membrane (size: M-R"},
        {nomenclature: 'ACU Gore-Tex Trousers', common: "Compat Boots", part_number: "", nsn: "8415-01-526-9062" , accounting: "" ,category: "clothing", description: "2nd Generation ECWCS parka is a soft and quiet outerwear garment constructed of durably waterproof GORE-TEX fabric and membrane (size: M-R"},
        {nomenclature: 'ANTENNA AT-984/G', common: "Antenna", part_number: "", nsn: "01-215-9404", accounting: "", category: "" ,description: ""},
        {nomenclature: 'GENERATOR, 200 AMP', common: "Generator", part_number: "" , nsn: "01-215-9405", accounting:  "", category: "vehicles", description: ""}
      ]);
    });
};
