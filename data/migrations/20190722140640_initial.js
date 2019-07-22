exports.up = function(knex) {
    // zoos, species, animals
    // zoos 1 -- * animals
    // species 1 -- * animals
    return knex.schema
      .createTable('zoos', tbl => {
        // generates integer primary key called id that auto increments
        tbl.increments();
  
        tbl
          .string('zoo_name', 128)
          .notNullable()
          .unique();
        tbl
          .string('address', 256)
          .notNullable()
          .unique();
      })
      .createTable('species', tbl => {
        tbl.increments();
  
        tbl
          .string('species_name', 128)
          .notNullable()
          .unique();
      })
      .createTable('animals', tbl => {
        tbl.increments();
  
        tbl.string('animal_name').notNullable();
  
        tbl
          .integer('species_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('species')
          .onDelete('RESTRICT') // what happens if the species is deleted
          .onUpdate('CASCADE'); // what happens if the id of the species changes
      });
  };
  
  exports.down = function(knex) {};
  
  // return knex.schema.table('zoos', tbl => {
  //   tbl.float('rating');
  // })
  // down tbl.dropColumn('rating');