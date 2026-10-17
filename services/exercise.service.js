
import db from "../config/db.js";

const exerciseService = {
  async create(data) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      const {
        name,
        imageUrl,
        primaryMuscleGroup,
        muscleGroups = [],
        equipment = [],
      } = data;

      const result = await client.query(
        `INSERT INTO exercises
           (name, image_url, primary_muscle_group_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, imageUrl ?? null, primaryMuscleGroup]
      );

      const exercise = result.rows[0];

      for (const mg of muscleGroups) {
        await client.query(
          `INSERT INTO exercise_muscle_groups
             (exercise_id, muscle_group_id, weight)
           VALUES ($1, $2, $3)`,
          [exercise.id, mg.muscleGroup, mg.value]
        );
      }

      for (const equipmentId of equipment) {
        await client.query(
          `INSERT INTO exercise_equipment
             (exercise_id, equipment_id)
           VALUES ($1, $2)`,
          [exercise.id, equipmentId]
        );
      }

      await client.query("COMMIT");
      return exercise;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async getAll() {
    const result = await db.query(`
      SELECT
        e.*,
        mg.name AS primary_muscle_group_name,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'muscleGroup', mg2.id,
                'name', mg2.name,
                'value', emg.weight
              )
            )
            FROM exercise_muscle_groups emg
            JOIN muscle_groups mg2 ON mg2.id = emg.muscle_group_id
            WHERE emg.exercise_id = e.id
          ),
          '[]'::json
        ) AS muscle_groups,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', eq.id,
                'name', eq.name,
                'imageUrl', eq.image_url
              )
            )
            FROM exercise_equipment ee
            JOIN equipment eq ON eq.id = ee.equipment_id
            WHERE ee.exercise_id = e.id
          ),
          '[]'::json
        ) AS equipment
      FROM exercises e
      JOIN muscle_groups mg ON mg.id = e.primary_muscle_group_id
      ORDER BY e.id
    `);

    return result.rows;
  },

  async getById(id) {
    const result = await db.query(
      `
      SELECT
        e.*,
        mg.name AS primary_muscle_group_name,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'muscleGroup', mg2.id,
                'name', mg2.name,
                'value', emg.weight
              )
            )
            FROM exercise_muscle_groups emg
            JOIN muscle_groups mg2 ON mg2.id = emg.muscle_group_id
            WHERE emg.exercise_id = e.id
          ),
          '[]'::json
        ) AS muscle_groups,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', eq.id,
                'name', eq.name,
                'imageUrl', eq.image_url
              )
            )
            FROM exercise_equipment ee
            JOIN equipment eq ON eq.id = ee.equipment_id
            WHERE ee.exercise_id = e.id
          ),
          '[]'::json
        ) AS equipment
      FROM exercises e
      JOIN muscle_groups mg ON mg.id = e.primary_muscle_group_id
      WHERE e.id = $1
      `,
      [id]
    );

    return result.rows[0] ?? null;
  },

  async updateById(id, data) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      const {
        name,
        imageUrl,
        primaryMuscleGroup,
        muscleGroups,
        equipment,
      } = data;

      const result = await client.query(
        `UPDATE exercises
         SET name = COALESCE($1, name),
             image_url = COALESCE($2, image_url),
             primary_muscle_group_id =
               COALESCE($3, primary_muscle_group_id)
         WHERE id = $4
         RETURNING *`,
        [
          name ?? null,
          imageUrl ?? null,
          primaryMuscleGroup ?? null,
          id,
        ]
      );

      if (!result.rows.length) {
        await client.query("ROLLBACK");
        return null;
      }

      if (muscleGroups !== undefined) {
        await client.query(
          "DELETE FROM exercise_muscle_groups WHERE exercise_id = $1",
          [id]
        );

        for (const mg of muscleGroups) {
          await client.query(
            `INSERT INTO exercise_muscle_groups
               (exercise_id, muscle_group_id, weight)
             VALUES ($1, $2, $3)`,
            [id, mg.muscleGroup, mg.value]
          );
        }
      }

      if (equipment !== undefined) {
        await client.query(
          "DELETE FROM exercise_equipment WHERE exercise_id = $1",
          [id]
        );

        for (const equipmentId of equipment) {
          await client.query(
            `INSERT INTO exercise_equipment
               (exercise_id, equipment_id)
             VALUES ($1, $2)`,
            [id, equipmentId]
          );
        }
      }

      await client.query("COMMIT");
      return this.getById(id);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async deleteById(id) {
    const result = await db.query(
      "DELETE FROM exercises WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0] ?? null;
  },
};

export default exerciseService;
