const db = require("../db");

const moviescontroller = {
        async findAll(req, res) {
            try {
              const moviesResult = await db.query("SELECT * FROM movies");
              const movies = moviesResult.rows;
          
              if (movies.length === 0) {
                return res.status(200).json({ message: 'Não existem filmes cadastrados' });
              }
          
              res.status(200).json(movies);
            } catch (error) {
              res.status(500).json({ error: error.message });
            }
          },
    
      async find(req, res) {
        const { id } = req.params;
    
        try {
          const movies = await db.query(
            `
            SELECT 
              m.*,
              c.name AS category_name
            FROM movies m 
            INNER JOIN category c ON c.id = m.category_id
            WHERE m.id = $1
          `,
          [id]
          );
    
          if (movies.rows.length > 0) {
            res.json(movies.rows[0]);
          } else {
            res.status(404).json({ error: "Filme não encontrado" });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      async create(req, res) {
        const { title, description, category_id, release_date } = req.body;
      
        try {
          const existingCategory = await db.query(
            "SELECT * FROM category WHERE id = $1",
            [category_id]
          );
      
          if (existingCategory.rowCount === 0) {
          return res.status(400).json({ message: 'Não é possível cadastrar este filme, pois a categoria informada não existe' });
          }
      
          
          const newMovies = await db.query(
            `INSERT INTO movies (title, description, category_id, release_date)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, description, category_id, release_date]
          );
      
          res.status(201).json(newMovies.rows[0]);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      async delete(req, res) {
        const { id } = req.params;
      
        try {
          const result = await db.query(
            "DELETE FROM movies WHERE id = $1 RETURNING *",
            [id]
          );
      
          if (result.rowCount > 0) {
            
            return res.status(204).json({ message: 'Filme removido com sucesso' });
          } else {
            
            return res.status(404).json({ message: 'Exclusão não realizada. Este filme não existe' });
          }
        } catch (error) {
          
          return res.status(500).json({ error: error.message });
        }
      },

    async updateMovie(req, res) {
    const { id } = req.params;
    const { title, description, category_id, release_date } = req.body;
  
    try {
     
      const existingMovie = await db.query("SELECT * FROM movies WHERE id = $1", [id]);
  
      if (existingMovie.rows.length === 0) {
        return res.status(404).json({ error: "Filme não encontrado" });
      }
  

      await db.query(
        "UPDATE movies SET title = $1, description = $2, category_id = $3, release_date = $4 WHERE id = $5",
        [title, description, category_id, release_date, id]
      );
  
      res.status(200).json({ message: "Filme atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    },

  };

 

module.exports = moviescontroller;