import React from 'react';
import data from './data.json'
import Products from './components/Products';

class App extends React.Component //converting a functional component to a class component 
{
  constructor(){
    super();
    this.state = { //setting initial state
      products: data.products,
      size: "",
      sort:"",
    };
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
        <div className="content">
          <div className="main">
            {/*passing this.state to Products component as a prop  */}
            <Products products={this.state.products}/>
          </div>
          <div className="sidebar"> Cart Items</div>
        </div>
        </main>
        <footer>
          Created By Ian Murithi
        </footer>
      </div>
      );

  }
}
  


export default App;

//git remote add origin git@github.com:iante/react-shopping-cart.git
//git push -u origin master
