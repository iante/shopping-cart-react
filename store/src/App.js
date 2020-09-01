import React from 'react';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from "react-redux";


class App extends React.Component //converting a functional component to a class component 
{
  constructor(){
    super();
    this.state = { //setting initial state
      products: data.products,
      //JSON.parse converts string to json set in localStorage
      cartItems:localStorage.getItem("cartItems")? 
      JSON.parse(localStorage.getItem("cartItems")): [],
      size: "",
      sort:"",
    };
  }
createOrder = (order) => {
  alert("Need to Save Order for" + order.name)
}
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
//removes current product user selected to remove
cartItems: cartItems.filter((x=>x._id !== product._id)),
    });

    localStorage.setItem("cartItems", JSON.stringify( cartItems.filter((x)=>x._id !== product._id))
    );
  };

  addToCart = (product) => {
const cartItems = this.state.cartItems.slice();
let alreadyInCart = false;

//checks each item added in the cart and if item id is equal to product id, it increments the cart by 1
cartItems.forEach(item => {
  if(item._id === product._id){
    item.count++;
    alreadyInCart = true;
  }
});
//if item wasnt already in cart, spread it and add it to the array
if(!alreadyInCart){
  cartItems.push({...product, count: 1})
}

this.setState({cartItems});

//saving the cart items when the page is refreshed
localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  sortProducts = (event) => {
const sort = event.target.value;
    //function below accepts current state as a parameter and returns a new state
    this.setState(state => ({
sort: sort ,
//state.products gets access to the filtered products, slice creates a clone for the filtered products
products: this.state.products.slice().sort((a,b) => (
sort === "highest"?
((a.price < b.price)? 1:-1):
sort === "lowest"?
((a.price > b.price)? 1:-1):

//sorts the newest
((a._id > b._id)? 1:-1)

))
    }));

  };
//method function
  filterProducts = (event) => {
// if value selcted is empty, set the size and products to data.products
    if(event.target.value === ""){
  this.setState({
    size: event.target.value
    , products: data.products
  })
}else{
  this.setState({
    size: event.target.value,
    products: data.products.filter(product => product.availableSizes.indexOf(event.target.value)>=0)
  })
}
    
  }
  render(){
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
        <div className="content">
          <div className="main">
            {/*this.state.products.length displays the total number of products as a result */}
            <Filter count={this.state.products.length} 
            size={this.state.size} //passing size and sort as property to filter component
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}
            />
            {/*passing this.state to Products component as a prop  */}
            <Products products={this.state.products} addToCart={this.addToCart}/>
          </div>
          <div className="sidebar">
             <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}
             createOrder={this.createOrder}
             /></div>
        </div>
        </main>
        <footer>
          Created By Ian Murithi
        </footer>
      </div>
      </Provider>
      );

  }
}
  


export default App;

//git remote add origin git@github.com:iante/react-shopping-cart.git
//git push -u origin master
