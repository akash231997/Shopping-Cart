
var product = require(./api/model/model.js);


var apple = new product_details(
	{
		id: 1,
		name: "Apple",
		price: 20,
		stock: 50,
		tagline: "An apple a day keeps doctor away",
		added_at: new Date();
	});



// call the built-in save method to save to the database
product.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});