module.exports = app => {
    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id

        if(article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 6 // PAGINACAO
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select()
            .limit(limit).offset(page * limit - limit)
            .orderBy('published', 'desc')
            .then(articles => { 
                articles.map(article => {article.content = article.content.toString()} )
                res.json({ data: articles, count, limit }) 
            })
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .select()
            .where({id: req.params.id})
            .first()
            .then(article => {
                article.content = article.content.toString()
                res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
            
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return {save, get, getById, remove}
}