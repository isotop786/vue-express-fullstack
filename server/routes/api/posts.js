const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const uri = 'mongodb+srv://maruf:MaruF786@cluster0.n9jw5.mongodb.net/PostDB'


// get posts
router.get('/',async (req,res)=>{
    const post = await loadPostsCollection();

    res.send(await post.find({}).toArray())
})


// add post
router.post('/',async (req,res)=>{
    const posts = await loadPostsCollection();

    await posts.insertOne({
       text: req.body.text,
       createdAt: new Date()
    });
    res.status(201).send()
})

// delete post

router.delete('/:id',async (req,res)=>{
    const posts = await loadPostsCollection();
    const id = req.params.id

    posts.deleteOne({_id: new mongodb.ObjectID(id)})
    res.status(200).send()
})

// get single post 
router.get('/:id',async (req,res)=>{
    const posts = await loadPostsCollection();
    const id = req.params.id

    res.status(200).
    send(await posts.findOne({_id:new mongodb.ObjectID(id)}))
})

// update post 
router.put('/:id',async (req,res)=>{
    const posts = await loadPostsCollection();
    const id = req.params.id 

    await posts.update({_id: new mongodb.ObjectID(id)},{
        text : req.body.text,
        createdAt: new Date()
    })

    res.status(201).send()
})




// database connection
async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(
        uri ,{useNewUrlParser:true}
    );

    return client.db('PostDB').collection('Posts')
}


module.exports = router