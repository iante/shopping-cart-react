import React, { Component } from 'react'
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
export default class Cart extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }
  //handles what happents when user fills in the checkout form
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Handles what happens when use clicks checkout, creates a new order
  createOrder = (e) => {
    e.preventDefault(); //prevents page from refreshing when user clicks on submit
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order); //saving the createOrder Function and passing const order
  };
  render() {
//getting cartItems from app.js and passing them as props

        const {cartItems} = this.props;
        return (
            <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}

<div>
            <div className="cart">
              <Fade left cascade>
                <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                      <div>
                      <img src={item.image} alt={item.title}></img>
                      </div>
                      <div>
                <div>{item.title}</div>
                <div className="right">
                    {/*Line of code below increments nom of similar items added to cart */}
                {formatCurrency(item.price)} x {item.count}{" "}
                <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}>Remove</button>
                </div>
                
                      </div>
                  </li>
                ))}
                </ul>
                </Fade>
            </div>

            {/*Conditional rendering, we just want the total feature to be displayed if there is an item in the cart */}
            {cartItems.length!==0 && (
              <div>
          <div className="cart">
          <div className="total">
              <div>
                  {/* Line of code calculates total price of items in the cart*/}
                  Total:{" "}
           <b>   {formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )} </b>
              </div>
              <button
              onClick={() => {
                this.setState({ showCheckout: true });
              }}
              className="button primary"
            >
              Proceed
            </button>
          </div>
      </div>
      {/* creating ShowCheckout Form*/}
 {this.state.showCheckout  && (
   <Fade right cascade>
   <div className="cart">
   <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
   </div>
   </Fade>
 )}
</div>
            )}
            
        </div>
        </div>
       
        );
    }
}

