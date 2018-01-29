var product = require('../model/model.js');

exports.add = function(req, res) {
    // Create and Save a new product

    console.log("here babe");
    if(!req.body.name) {
        res.status(400).send({message: "Note can not be empty"});
    }

    var note = new product(req.body);

    note.save(function(err, data) {
        if(err) {
            console.log("error");
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } 
        else {
            res.send(data);
        }
    });

};

exports.findAll = function(req, res) {
    // Retrieve and return all products from the database.

    console.log("Hi babe");
    product.find(function(err, data){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving products."});
        } else {
            res.send(JSON.stringify({ "result": data },null));
        }
    });

};

exports.findOne = function(req, res) {
    // Find a single product with a productId
    product.findOne({name: req.params.productName}, function(err, data) 
    {
        if(err) {
            res.status(500).send({message: "Could not retrieve product with name " + req.params.productName});
        } else {
            res.send(JSON.stringify({ "result": data},null));
        }

    });

};

exports.update = function(req, res) {
    // Update a product identified by the productId in the request

    product.findOneAndUpdate({name:req.params.productName}, req.body, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not find a product with name " + req.params.productName});
        }else {
                res.send({message: "Updated successfully"});
            }
    });
        // var i=0;
        // if(req.body.price)
        //     {
        //      product.price = req.body.price;
        //      i=1;
        //     }

        //  if(req.body.stock)
        //     {
        //      product.stock = req.body.stock;
        //      i=1;
        //     }
        
        //  if(req.body.tagline)
        //     {
        //      product.tagline = req.body.tagline;
        //      i=1;
        //     }

        //  if(req.body.img)
        //     {
        //      product.img = req.body.img;
        //      i=1;
        //     }

        // if(i==1)
        // {
        //  note.save(function(err, data){
        //     if(err) {
        //         res.status(500).send({message: "Could not update product with name " + req.params.productName});
        //     } 
        //     }
        //   });
        // }
        // else
        // {
        //  res.send({message: "No product has been updated"});
        // }
};

exports.delete = function(req, res) {
    // Delete a product with the specified productId in the request
console.log("Delete");
    product.remove({name: req.params.productName}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete product with name " + req.params.productName});
        } else {
            res.send({message: "Sure to delete!"});
        }
    });

};
