const db = require("../db");

const categorycontroller = {
    async findAll(req, res) {
        try {
          const category = await db.query("SELECT * FROM category");
          const categories = category.rows;
      
          if (categories.length === 0) {
            // Não existem categorias cadastradas
            return res.status(200).json({ message: 'Não existem categorias cadastradas' });
          }
      
          res.status(200).json(categories);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    
      async find(req, res) {
        const { id } = req.params;
    
        try {
          const category = await db.query("SELECT * FROM category WHERE id = $1", [
            id,
          ]);
    
          if (category.rows.length > 0) {
            res.json(category.rows[0]);
          } else {
            res.status(404).json({ error: "Categoria não encontrada" });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    
      async create(req, res) {
        const { name, description } = req.body;
      
        try {
          // Verifica se a categoria já existe
          const existingCategory = await db.query(
            "SELECT * FROM category WHERE name = $1",
            [name]
          );
      
          if (existingCategory.rowCount > 0) {
            // Categoria já existe
            return res.status(409).json({ message: 'Categoria já existente' });
          }
      
          // Insere a nova categoria
          const newCategory = await db.query(
            "INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
          );
      
          res.status(201).json(newCategory.rows[0]);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      async delete(req, res) {
        const { id } = req.params;
      
        try {
          const result = await db.query(
            "DELETE FROM category WHERE id = $1 RETURNING *",
            [id]
          );
      
          if (result.rowCount > 0) {
            // Excluiu com sucesso
            return res.status(204).json({ message: 'Categoria removida com sucesso' });
          } else {
            // Não há dados a serem excluídos
            return res.status(404).json({ message: 'Exclusão não realizada. Esta categoria não existe' });
          }
        } catch (error) {
          // Erro interno do servidor
          return res.status(500).json({ error: error.message });
        }
      },

      async updatecategory(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
      
        try {
          
          const existingcategory = await db.query("SELECT * FROM category WHERE id = $1", [id]);
      
          if (existingcategory.rows.length === 0) {
            return res.status(404).json({ error: "Categoria não encontrada" });
          }
      
        
          await db.query(
            "UPDATE category SET name = $1, description = $2",
            [name, description]
          );
      
          res.status(200).json({ message: "Categoria atualizada com sucesso" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    },
    };



module.exports = categorycontroller;