import React from 'react';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';

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
