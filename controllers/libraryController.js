const Post = require('../models/Post')

const index = (req, res) => {
    res.send('Welcome')
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
            res.json({message: err})
        });
}

const updateData = async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            {bookId: req.params.postId},
            {$set: {title: req.body.title}}
        )
        res.json(updatePost)
    } catch (err) {
        res.json({message: err})
    }
}

const deleteData = async (req, res) => {
    try {
        const removePost = await Post.remove({bookId: req.params.postId});
        res.json(removePost)
    } catch (err) {
        res.json({message: err})
    }
}

const search = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({meesage: err});
    }
}

module.exports = {
    index, getList, createData, updateData, deleteData, search
}
