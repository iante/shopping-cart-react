import React, { Component } from 'react'
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
 class Cart extends Component {
  
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

  closeModal = () => {
    this.props.clearOrder(); //clearOrder from the OrderActions.js
  };
  render() {
//getting cartItems from app.js and passing them as props

        const {cartItems, order} = this.props;
        return (
            <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}

        {/*Checking if order exists, if it does, show the modal(conditinal rendering) */}
 {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
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

export default connect(
 /*Mapping state to props*/ (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);

