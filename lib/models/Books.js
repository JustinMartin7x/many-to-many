const pool = require('../utils/pool');

module.exports = class Books {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  static async insert({ title }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title) VALUES ($1) RETURNING *',
      [title]
    );

    return new Books(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM books');

    return rows.map(book => new Books(book));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM books WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No book with id ${id}`);
    return new Books(rows[0]);
  }

  static async update(id, { title }) {
    const { rows } = await pool.query(
      'UPDATE books SET title=$1 WHERE id=$2 RETURNING *',
      [title, id]
    );
    
    if(!rows[0]) throw new Error(`No book with id ${id}`);
    return new Books(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM books WHERE id=$1 RETURNING *',
      [id]
    );

    return new Books(rows[0]);
  }
};