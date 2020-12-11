const pool = require('../utils/pool')

module.exports = class Books {
id;
title;

constructor(row) {
    this.id = row.id;
    this.title = row.title
}

// static async insert({ title }) {
//     const { rows } = await pool.query(
//         'INSERT INTO books (title) VALUES ($2) RETURNING *',
//         [title]
//         );
//         return new Books(rows[0])
//     }
static async insert({ text, books = [] }) {
    const { rows } = await pool.query('INSERT INTO library (title) VALUES ($1) RETURNING *',
      [text]
    );

    await pool.query(
      `
      INSERT INTO library_books (library_id, book_id)
      SELECT ${rows[0].id}, id FROM books WHERE title = ANY($1::title[])
      `,
      [books]
    );
    
    return new Books(rows[0]);
  }



    // static async findById(id) {
    //     const { rows } = pool.query(
    //         'SELECT * FROM books WHERE id=$1',
    //         [id]
    //     );
    //     if(!rows[0]) throw new Error(`No hashtag with id ${id}`);
    //     return new Books(rows[0]);
    // }
    static async findById(id) {
        const { rows } = await pool.query(
          `
          SELECT
            library.*,
            array_agg(books.title) AS tags
          FROM
            library_books
          JOIN library
          ON library_books.comment_id = library.id
          JOIN books
          ON library_books.tag_id = books.id
          WHERE library.id=$1
          GROUP BY library.id
          `,
          [id]
        );
    
        if(!rows[0]) throw new Error(`No library with the id ${id}`);
    
        return {
          ...new Library(rows[0]),
          books: rows[0].books
        };
      }



    static async update(id, { title }) {
        const { rows } = pool.query(
            'UPDATE books SET title=$1 WHERE id=$2 RETURNING *',
            [title, id]
        )
        if(!rows[0]) throw new Error(`No book with id ${id}`);
    return new Books(rows[0]);
    }
    static async remove(id) {
        const { rows } = await pool.query(
            'DELETE FROM books WHERE id=$1 RETURNING *',
            [id]
        );
        return new Books(rows[1]);
    }




}