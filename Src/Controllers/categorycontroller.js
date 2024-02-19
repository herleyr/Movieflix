

const categorycontroller = {
    findAll(req, res) {
        res.json([
            { 
                id: 1,
                name: 'Filmes de Ação',
                description: "Aqui estão os filmes de ação que você escolheu" 
            },

            { id: 2, name: "Filmes de Comédia", description: "Aqui estão os filmes de comédia que você escolheu" },
            { id: 3, name: "Filmes de Terror", description: "Aqui estão os filmes de terror que você escolheu" },
            { id: 4, name: "Animes", description: "Aqui estão os animes que você escolheu" }


        ]);
    },
    
    find(req, res) {
        const { id } = req.params;

        res.json({
            id: id,
            name: "Filmes de Ação",
            description: "Aqui estão os filmes de ação que você escolheu"
        })
    },

    create(req, res) {
        const { name, description } = req.body;
        
        res.status(201)
            .json({
            id: Number.MAX_SAFE_INTEGER,
            name: name,
            description: description,
        })
    },

    delete(req, res) {
        const { id } = req.params;
        res.status(204).json();
    

    },
    
    
    };



module.exports = categorycontroller;