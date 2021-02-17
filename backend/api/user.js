const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    
    const save = (req, res) => {
        const user = {...req.body}  
        
        user.password = encryptPassword(user.password)        
        delete user.confirmPassword

        if(user.userId) {
            app.db('users')
                .update(user)
                .where({ userId: user.userId })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }       
    }

    const limit = 6 // PAGINACAO
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('users').count('userId').first()
        const count = parseInt(result.count)

        app.db('users')
            .select('userId', 'name', 'email')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    
    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('users')
                .where({ userId: req.params.id }).del()
            
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, remove, get}
}