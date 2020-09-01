import React from 'react';
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
      //products: data.products,
      //JSON.parse converts string to json set in localStorage
      cartItems:localStorage.getItem("cartItems")? 
      JSON.parse(localStorage.getItem("cartItems")): [],
     
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
            <Filter/>
            {/*passing this.state to Products component as a prop  */}
            <Products products={this.state.products}/>
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
