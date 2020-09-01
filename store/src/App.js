import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from "react-redux";


class App extends React.Component //converting a functional component to a class component 
{
  
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
            <Products/>
          </div>
          <div className="sidebar">
             <Cart/>
             </div>
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
