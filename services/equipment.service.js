
import db from "../config/db.js";

const equipmentService = {
  async create(data) {
    const { name, imageUrl, tags } = data;

    if (
      !Array.isArray(tags) ||
      tags.length === 0 ||
      tags.some((tag) => !["home", "gym"].includes(tag)) ||
      new Set(tags).size !== tags.length
    ) {
      throw new Error(
        "tags must contain 'home', 'gym', or both, without duplicates"
      );
    }

    const result = await db.query(
      `INSERT INTO equipment (name, image_url, tags)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, imageUrl ?? null, tags]
    );

    return result.rows[0];
  },

  async getAll() {
    const result = await db.query(
      "SELECT * FROM equipment ORDER BY id"
    );

    return result.rows;
  },

  async getById(id) {
    const result = await db.query(
      "SELECT * FROM equipment WHERE id = $1",
      [id]
    );

    return result.rows[0] ?? null;
  },

  async updateById(id, data) {
    const { name, imageUrl, tags } = data;

    if (
      tags !== undefined &&
      (!Array.isArray(tags) ||
        tags.length === 0 ||
        tags.some((tag) => !["home", "gym"].includes(tag)) ||
        new Set(tags).size !== tags.length)
    ) {
      throw new Error(
        "tags must contain 'home', 'gym', or both, without duplicates"
      );
    }

    const result = await db.query(
      `UPDATE equipment
       SET name = COALESCE($1, name),
           image_url = COALESCE($2, image_url),
           tags = COALESCE($3::text[], tags)
       WHERE id = $4
       RETURNING *`,
      [name ?? null, imageUrl ?? null, tags ?? null, id]
    );

    return result.rows[0] ?? null;
  },

  async deleteById(id) {
    const result = await db.query(
      "DELETE FROM equipment WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0] ?? null;
  },
};

export default equipmentService;
