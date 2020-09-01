const express = require("express"); //importing the modules
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

//initializing mongoose database
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//creating product model on mogoose db, first parameter is name of db and 2nd parameter list of products in db
const Product = mongoose.model(
    "products",
    new mongoose.Schema({
      _id: { type: String, default: shortid.generate },
      title: String,
      description: String,
      image: String,
      price: Number,
      availableSizes: [String],
    })
  );

app.get("/api/products", async (req, res) => {
    //returns all products from the Product mongoose schema
    const products = await Product.find({});
    res.send(products);
  });

  //creating an endpoint to create product in the database
  app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    
    //Saving the new product created in the db
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  });

  //Api to delete product from db based on id
  app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  });

  //Listening to port and launching the server, process.env sets the port number automaticaly
  const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
