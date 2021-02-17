module.exports = app => {
    app.route('/signup').post(app.api.user.save)
    app.route('/signin').post(app.api.auth.signin)
    app.route('/validateToken').post(app.api.auth.validateToken)

    app.route('/users')
        .get(app.api.user.get)

    app.route('/users/:id')
        .delete(app.api.user.remove)

    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(app.api.article.save)
        .delete(app.api.article.remove)
}