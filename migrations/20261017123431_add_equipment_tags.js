
export async function up(knex) {
  await knex.raw(`
    ALTER TABLE equipment
    ADD COLUMN tags TEXT[] NOT NULL
  `);

  await knex.raw(`
    ALTER TABLE equipment
    ADD CONSTRAINT equipment_tags_valid
    CHECK (
      cardinality(tags) >= 1
      AND tags <@ ARRAY['home', 'gym']::TEXT[]
    )
  `);
}

export async function down(knex) {
  await knex.raw(`
    ALTER TABLE equipment
    DROP COLUMN tags
  `);
}
