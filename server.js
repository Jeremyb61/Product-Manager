var express = require('express')
var app = express();
// const router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/product-manager');

var path = require('path');
app.use(express.static(__dirname + '/public/dist/public'));

var ProductSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Please enter the products title"] },
    price: { type: String, required: [true, "Please enter the products price"] },
    image: { type: String, required: [true, "Please enter and image URL of the product"] }
});

mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.post('/product', function (req, res) {
    product_inst = new Product(req.body);
    console.log('for data', req.body)
    product_inst.save(function (err, data) {
        if (err) {
            res.json({
                status: false,
                err: err
            });
        }
        else {
            res.json({
                data: data,
                status: true
            });
        }
    });
});
app.get('/product', function (req, res) {
    Product.find({}).sort({ createdAt: 'desc' }).exec(function (err, data) {
        if (err) {
            console.log("Server Error, at get all products route");
        } else {
            console.log("Success at get all products route");
            res.json(data);
        }
    })
});
app.get('/product/:id', function (req, res) {
    Product.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            console.log("ERROR, findOne route")
        } else {
            console.log("SUCCESS at findOne route");
            res.json({
                data: data
            });
        }
    });
});
app.delete('/product/:id', function (req, res) {
    Product.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            console.log("Error at Delete route")
        } else {
            console.log("Delete routes works")
            res.json(data)
        }
    });
});
app.put('/product/:id', function (req, res) {
    console.log("POST PRODUCT/ID, req.body", req.body)
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, function (err, data) {
        console.log("POST PRODUCT/ID, req.params", req.params)
        if (err) {
            console.log("SERVER ERROR, in edit product route");
            res.json({
                status: false,
                err: err
            })
        } else {
            console.log(data);
            console.log("Succes submitting comment/rating");
            res.json({
                status: true,
                data: data
            });
        }
    })
});

// this route will be triggered if any of the routes above did not match
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function () {
    console.log('Listening on 8000');
});