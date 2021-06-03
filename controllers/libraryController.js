const Post = require('../models/Post')

const index = (req, res) => {
    res.send('<div style="color:#ffffff;background: #2f2f2f; margin: auto;width: 375px;box-shadow: 0px 6px 12px #2f2f2f;padding: 24px;border-radius: 8px;font-family: system-ui;"><h1 style="text-align: center">Welcome To <br/> &#128214; <br/> Library App Restful APIs</h1> ' +
        '<h2>Used Technologies</h2>' +
        '<ul>' +
        '<li>NodeJS</li>' +
        '<li>MongoDB</li>' +
        '<li>Express</li>' +
        '<li>Jwt</li>' +
        '<li>bcrypt</li>' +
        '</ul>' +
        '<h2>APIs</h2>' +
        '<ul>' +
        '<li>Login</li>' +
        '<li>Register</li>' +
        '<li>List</li>' +
        '<li>Insert</li>' +
        '<li>Update</li>' +
        '<li>Delete</li>' +
        '<li>Search by ID</li>' +
        '</ul>' +
        '<h2>Links</h2>' +
        '<ul>' +
        '<li><a href="https://github.com/kiyannurullah/node-js-restful-api-mongo-db" target="_blank" style="color: white;text-decoration: none;">Github</a></li>' +
        '<li><a href="https://library-app-node-js-react-js.herokuapp.com/" target="_blank" style="color: white;text-decoration: none;">Herokuapp</a></li>' +
        '</ul>' +
        '</div>')
}

const getList = (req, res) => {
    Post.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured.'
            })
        })
}

const createData = (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json({message: err})
        });
}

const updateData = async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            {bookId: req.params.postId},
            {$set: {
                    title: req.body.title,
                    description: req.body.description,
                    author: req.body.author
            }}
        )
        res.json(updatePost)
    } catch (err) {
        res.status(400).json({
            message: (err.name === 'MongoError' && err.code === 11000) ? 'Title already exists !' : errorHandler.getErrorMessage(err)
        })
    }
}

const deleteData = async (req, res) => {
    try {
        const removePost = await Post.remove({bookId: req.params.postId});
        res.json(removePost)
    } catch (err) {
        res.status(400).json({message: err})
    }
}

const search = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.status(400).json({meesage: err});
    }
}

module.exports = {
    index, getList, createData, updateData, deleteData, search
}
