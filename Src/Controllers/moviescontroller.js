

const moviescontroller = {
    
    findAll(req, res) {
        res.json([
            { 
                id: 1,
                title: 'Velozes e Furiosos 10',
                description: "Muita velocidade e ação nessa sequência da franquia de filmes com Vin Diesel",
                category_id: 1,
                release_date: "05/11/2023", 
            },

            { 
                id: 2,
                title: 'A Viagem de Chihiro',
                description: "Uma garota em um mundo de fantasia tem uma imersão espiritual para seu crescimento",
                category_id: 4,
                release_date: "02/01/2024" 
            },
        ]);
    },
    
    find(req, res) {
        const { id } = req.params;

        res.json({
            id: id,
            title: 'Velozes e Furiosos 10',
            description: "Muita velocidade e ação nessa sequência da franquia de filmes com Vin Diesel",
            category_id: 1,
            release_date: "05/11/2023", 
        });
    },

    create(req, res) {
        const { title, description , category_id, release_date, } = req.body;
        
        res.status(201)
            .json({
            id: Number.MAX_SAFE_INTEGER,
            title,
            description,
            category_id,
            release_date,
        })
    },

    delete(req, res) {
        const { id } = req.params;
        res.status(204).json();
    

    }
};


module.exports = moviescontroller;