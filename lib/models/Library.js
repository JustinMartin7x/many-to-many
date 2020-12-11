const  pool = require('../utils/pool');


module.exports = class Library {
    id;
    name;
    location;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.location = row.location;
    }
    
    static async insert({ name, location }) {
      const { rows } = await pool.query(
        'INSERT INTO library (name, location) VALUES ($1, $2) RETURNING *',
        [name, location]
      );
      return new Library(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM library WHERE id=$1`,
        [id]
      );
      return new Library(rows[0])
    }
    static async update(id, { name, location}) {
      const { rows } = await pool.query(
        `UPDATE library
              SET name=$1,
                  location=$2
              WHERE id=$3
              RETURNING *
              `,
            [name, location, id]
      )
      return new Library(rows[0])
    }


    static async remove(id) {
      const { rows } = await pool.query(
        'DELETE FROM library WHERE id=$1 RETURNING *',
      [id]
      )
      return new Library(rows[0])
    }




};
