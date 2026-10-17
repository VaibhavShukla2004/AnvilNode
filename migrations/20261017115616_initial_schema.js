
export async function up(knex) {
    // 1. Users
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email", 255).notNullable().unique();
        table.string("password_hash", 255).notNullable();
        table.string("role", 20).notNullable().defaultTo("user");
        table.timestamps(true, true);

        table.check("role IN ('admin', 'user')");
    });


    await knex.raw(`
  CREATE UNIQUE INDEX users_single_admin
  ON users (role)
  WHERE role = 'admin'
`);


    // 2. Muscle groups
    await knex.schema.createTable("muscle_groups", (table) => {
        table.increments("id").primary();
        table.string("name", 100).notNullable().unique();
        table.text("image_url");
        table.timestamps(true, true);
    });

    // 3. Equipment
    await knex.schema.createTable("equipment", (table) => {
        table.increments("id").primary();
        table.string("name", 100).notNullable().unique();
        table.text("image_url");
        table.timestamps(true, true);
    });

    // 4. Exercises
    await knex.schema.createTable("exercises", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.integer("primary_muscle_group_id")
            .notNullable()
            .references("id")
            .inTable("muscle_groups")
            .onDelete("RESTRICT");
        table.text("image_url");
        table.timestamps(true, true);
    });

    // 5. Exercise-to-muscle-group relationships + weights
    await knex.schema.createTable("exercise_muscle_groups", (table) => {
        table.integer("exercise_id").notNullable()
            .references("id").inTable("exercises").onDelete("CASCADE");
        table.integer("muscle_group_id").notNullable()
            .references("id").inTable("muscle_groups").onDelete("RESTRICT");
        table.decimal("weight", 4, 3).notNullable();

        table.primary(["exercise_id", "muscle_group_id"]);
        table.check("weight >= 0 AND weight <= 1");
    });

    // 6. Exercise-to-equipment relationships
    await knex.schema.createTable("exercise_equipment", (table) => {
        table.integer("exercise_id").notNullable()
            .references("id").inTable("exercises").onDelete("CASCADE");
        table.integer("equipment_id").notNullable()
            .references("id").inTable("equipment").onDelete("RESTRICT");

        table.primary(["exercise_id", "equipment_id"]);
    });

    // 7. Workouts
    await knex.schema.createTable("workouts", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.integer("no_of_exercises").notNullable().defaultTo(0);
        table.boolean("is_premade").notNullable().defaultTo(false);
        table.integer("user_id")
            .references("id").inTable("users").onDelete("CASCADE");
        table.timestamps(true, true);
    });

    // 8. Workout-to-muscle-group relationships
    await knex.schema.createTable("workout_muscle_groups", (table) => {
        table.integer("workout_id").notNullable()
            .references("id").inTable("workouts").onDelete("CASCADE");
        table.integer("muscle_group_id").notNullable()
            .references("id").inTable("muscle_groups").onDelete("RESTRICT");

        table.primary(["workout_id", "muscle_group_id"]);
    });

    // 9. Workout-to-exercise relationships + set counts
    await knex.schema.createTable("workout_exercises", (table) => {
        table.integer("workout_id").notNullable()
            .references("id").inTable("workouts").onDelete("CASCADE");
        table.integer("exercise_id").notNullable()
            .references("id").inTable("exercises").onDelete("RESTRICT");
        table.integer("sets").notNullable();

        table.primary(["workout_id", "exercise_id"]);
        table.check("sets > 0");
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("workout_exercises");
    await knex.schema.dropTableIfExists("workout_muscle_groups");
    await knex.schema.dropTableIfExists("workouts");
    await knex.schema.dropTableIfExists("exercise_equipment");
    await knex.schema.dropTableIfExists("exercise_muscle_groups");
    await knex.schema.dropTableIfExists("exercises");
    await knex.schema.dropTableIfExists("equipment");
    await knex.schema.dropTableIfExists("muscle_groups");
    await knex.schema.dropTableIfExists("users");
}
