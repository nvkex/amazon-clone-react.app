const express = require('express');
const data = require('./data');
const config = require('./config');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.route');

const app = express();

dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch( err => console.log(err.reason))


app.use('/api/users', userRouter)
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: 'Product not found.'});
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});


app.listen(5000, () => {
    console.log('Running on 5000')
})