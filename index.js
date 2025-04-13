const express = require('express');
const db = require('./src/models/index');

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const sequelize = db.sequelize;

const app = express();

const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());
app.use('/upload', express.static(path.join(__dirname, 'upload')));






const categorieroutes = require('./src/routes/categoryroutes');
const commentroutes = require('./src/routes/commentroutes');
const orderitemsroute = require('./src/routes/orderitemsroutes');
const orderroutes = require('./src/routes/orderroutes');
const photoroutes = require('./src/routes/photoroutes');
const productroutes = require('./src/routes/productroutes');
const reviewsroutes = require('./src/routes/reviewroutes');
const uploadroutes = require('./src/routes/uploadroutes');
const userroutes = require('./src/routes/userroutes');
const authroutes = require('./src/routes/authroutes');

app.use('/api', uploadroutes)
app.use('/api', categorieroutes);
app.use('/api', commentroutes);
app.use('/api', orderitemsroute);
app.use('/api', orderroutes);
app.use('/api', photoroutes);
app.use('/api', productroutes);
app.use('/api', reviewsroutes);
app.use('/api', userroutes);
app.use('/api/auth', authroutes);


sequelize.authenticate()
.then(()=>{
    console.log('connection successfully');
})
.catch(err =>{
    console.error('unable to connect to database')
});

app.listen(PORT,()=> {
    console.log('server running on port ',PORT);
})