
import db from "../config/db.js";

const muscleGroupService = {
  async create(data) {
    const { name, imageUrl } = data;

    const result = await db.query(
      `INSERT INTO muscle_groups (name, image_url)
       VALUES ($1, $2)
       RETURNING *`,
      [name, imageUrl ?? null]
    );

    return result.rows[0];
  },

  async getAll() {
    const result = await db.query(
      "SELECT * FROM muscle_groups ORDER BY id"
    );

    return result.rows;
  },

  async getById(id) {
    const result = await db.query(
      "SELECT * FROM muscle_groups WHERE id = $1",
      [id]
    );

    return result.rows[0] ?? null;
  },

  async updateById(id, data) {
    const { name, imageUrl } = data;

    const result = await db.query(
      `UPDATE muscle_groups
       SET name = COALESCE($1, name),
           image_url = COALESCE($2, image_url)
       WHERE id = $3
       RETURNING *`,
      [name ?? null, imageUrl ?? null, id]
    );

    return result.rows[0] ?? null;
  },

  async deleteById(id) {
    const result = await db.query(
      "DELETE FROM muscle_groups WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0] ?? null;
  },
};

export default muscleGroupService;
