import React, { Component } from 'react'
import formatCurrency from "../util";
export default class Cart extends Component {
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
            </div>

            {/*Conditional rendering, we just want the total feature to be displayed if there is an item in the cart */}
            {cartItems.length!==0 && (
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
            )}
            
        </div>
        </div>
       
        );
    }
}

