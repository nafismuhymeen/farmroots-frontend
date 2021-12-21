import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEmployeeLogo } from '../actions/logoActions';
import {
  addToCart,
  emptyBuyNow,
  listCartItems,
  removeFromCart,
} from "../actions/cartActions";
import { MdClose } from "react-icons/md";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { Card } from "react-bootstrap";

function GroceryCart(props) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoGet = useSelector(state => state.logoGet);
  const { logo } = logoGet;


  useEffect(() => {
    dispatch(listCartItems(cartItems));
    return () => {
      //
    };
  }, []);

  const closeCart = () => {
    document.querySelector(".grocery-cart").classList.remove("open");
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    dispatch(emptyBuyNow());
    props.history.push("/checkout");
  };


  let a = logoGet.logo;
  let cc = ""
  if (a != undefined) {
    cc = a.emptyCart
  }

  return (
    <Container className="grocery-cart d-flex flex-column">
      {cartItems.length === 0 ? (
        <>
          <Button className="btn-dark cart-close-button" onClick={closeCart}>
            <MdClose></MdClose>
          </Button>
          <img className="grocery-cart-empty-image" src={cc} alt="empty cart"></img>
          <div className="d-flex align-items-center flex-column mt-3">
            <div className="grocery-cart-empty-text">Your cart is empty</div>
            <div className="grocery-cart-empty-text">
              Add items to get started
            </div>
          </div>{" "}
        </>
      ) : (
        <div className="d-flex flex-column">
          <div className="grocery-cart-close-box">
            <Button className="btn-dark cart-close-button" onClick={closeCart}>
              <MdClose></MdClose>
            </Button>
            <div className="grocery-cart-order-text">Your Order</div>
          </div>
          <div className="grocery-cart-items-div">
            {cartItems.map((item) => (
              <div key={item.product} className="grocery-cart-items">
                <div className="d-flex align-items-center flex-row">
                  {item.qty > 1 ? (
                    <Button
                      className="ml-3 cart-button"
                      onClick={() =>
                        dispatch(addToCart(item.product, item.qty - 1))
                      }
                    >
                      <i className="fa fa-minus"></i>
                    </Button>
                  ) : (
                    <Button
                      className="ml-3 cart-button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fa fa-minus"></i>
                    </Button>
                  )}
                  <div className="grocery-cart-qty">{item.qty}</div>
                  <Button
                    className="grocery-cart-button"
                    onClick={() =>
                      dispatch(addToCart(item.product, item.qty + 1))
                    }
                  >
                    <i className="fa fa-plus"></i>
                  </Button>
                  <div className="ml-2 pt-3 cart-name">
                    {item.name}-{item.netWeight}
                  </div>
                </div>
                <div className="d-flex align-items-center flex-row">
                  <div className="mr-1 cart-price">
                    <Icon icon={currencyBdt} />
                    <div>{item.price * item.qty}</div>
                  </div>
                  <Button
                    className="ml-1 mr-3 btn-light grocery-cart-remove-button"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <MdClose></MdClose>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="grocery-cart-checkout-box">
            <hr style={{ width: "100%", borderColor: "#888888" }}></hr>
            <div className="grocery-cart-subtotal-div">
              <div className="grocery-cart-subtotal">Subtotal</div>
              <div className="grocery-cart-totalPrice">
                <Icon icon={currencyBdt} />
                <div>{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</div>
              </div>
            </div>
            <Button className="grocery-cart-checkout" onClick={checkoutHandler}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default withRouter(GroceryCart);
