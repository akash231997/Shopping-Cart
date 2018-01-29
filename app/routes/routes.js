module.exports = function(app){

console.log("here you are");

    var products = require('../controllers/controllers.js');

    // Create a new product
    app.post('/add', products.add);

    // Retrieve all products
    app.get('/read', products.findAll);

    // Retrieve a single product with productName
    app.get('/:productName', products.findOne);

    // Update a product with productName
    app.put('/update/:productName', products.update);

    // Delete a product with productName
    app.delete('/delete/:productName', products.delete);
}