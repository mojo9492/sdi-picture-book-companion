
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {first: 'Cathryn', last: "Biaggi", dod: "5512027745"},
        {first: 'Llywellyn', last: "Davion", dod: "4693565132"},
        {first: 'Jerrylee', last: "Schusterl", dod: "8469922095"},
        {first: "Scarface", last: "Orgel", dod: "9880934504"},
        {first: 'Gilles', last: "Winks", dod: "3366274558"},
        {first: 'Farrand', last: "Sommerfeld", dod: "4693565132"},
        {first: 'Angeline', last: "Sefton", dod: "7453460509"},

        {first: "Ardath", last: "Cicci", dod: "2858500903"},
        {first: 'Elston', last: "Tabert", dod: "7816252128"},
        {first: 'Velma', last: "Mosson", dod: "2968173015"},
        {first: 'Mano', last: "Bowstead", dod: "2487145912"},
        {first: "Upton", last: "Annwyl", dod: "8003904061"},
        {first: 'Kass', last: "McAreavey", dod: "5163848518"},
        {first: 'Seana', last: "Ibbett", dod: "4250781828"},
        {first: 'Mella', last: "Alcott", dod: "9299027308"},
        {first: "Kristoffer", last: "McInulty", dod: "4616763024"},
        {first: 'Byrann', last: "Stud", dod: "3036624220"},

        {first: 'Cheston', last: "Kittless", dod: "6882405082"},
        {first: 'Jeremie', last: "Case", dod: "1704571168"},
        {first: "Elane", last: "O'Dunneen", dod: "7582117440"},
        {first: 'Upton', last: "Blincoe", dod: "1214312262"},
        {first: 'Devlen', last: "Vallintine", dod: "2238679427"},
        {first: 'Ethelin', last: "Satterthwaite", dod: "8609744485"},
        {first: "Shirleen", last: "Kennsley", dod: "2150119667"},
        {first: 'Verena', last: "Wilkowski", dod: "1188032121"}
      ]);
    });
  };