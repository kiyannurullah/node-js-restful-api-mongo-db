const express = require('express');
const Post = require('../models/Post')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('post here')
})

router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

   post.save()
       .then(data => {
           res.json(data);
       })
       .catch(err => {
           res.json({message: err})
       });
});

//Search by Id

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({meesage: err});
    }
});


//Update Post

router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        )
        res.json(updatePost)
    } catch (err) {
        res.json({message: err})
    }
});

//Delete Post

router.delete('/:postId', async  (req, res) => {
    try {
        const removePost = await Post.remove({_id: req.params.postId});
        res.json(removePost)
    } catch (err) {
        res.json({message: err})
    }
});

module.exports = router;
