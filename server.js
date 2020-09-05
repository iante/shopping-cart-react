const express = require("express"); //importing the modules
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const path = require("path");


const app = express();
app.use(bodyParser.json());


//initializing mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-shopping-cart-db", {
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

  //Creating a schema to store order details in mongoose db
  const Order = mongoose.model(
    "order",
    new mongoose.Schema(
      {
        _id: {
          type: String,
          default: shortid.generate,
        },
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [
          {
            _id: String,
            title: String,
            price: Number,
            count: Number,
          },
        ],
      },
      {
        timestamps: true,
      }
    )
  );

  //Post API to insert items in the order DB
  app.post("/api/orders", async (req, res) => {
    if (
        //checking if the paramters below exist
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.cartItems
    ) {
      return res.send({ message: "Fill in all required fields." });
    }

    //saving the Order in DB
    const order = await Order(req.body).save();
    
    //sending the order t DB
    res.send(order);
  });

  //GET api to get orders from Order DB
  app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  });

  //DELETE API to delete orders from order DB
  app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
  });

  //Checking if the app is already on heroku server
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'));
    app.get('*', (req,res) => {
      res.sendFile(path.join(__dirname,'store','build','index.html'));
    });
    
  }

  //Listening to port and launching the server, process.env sets the port number automaticaly
  const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
