import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addToCart,
  emptyBuyNow,
  listCartItems,
  removeFromCart,
} from "../actions/cartActions";
import { MdClose } from "react-icons/md";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { getEmployeeLogo } from "../actions/logoActions";

function Cart(props) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const logoGet = useSelector((state) => state.logoGet);
  const { logo } = logoGet;

  useEffect(() => {
    dispatch(listCartItems(cartItems));
    return () => {
      //
    };
  }, []);

  const closeCart = () => {
    document.querySelector(".cart").classList.remove("open");
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    dispatch(emptyBuyNow());
    props.history.push("/checkout");
  };
  let a = logoGet.logo;
  let cc = "";
  if (a !== undefined) {
    cc = a.emptyCart;
  }
  return (
    <div className="cart d-flex flex-column">
      {cartItems.length === 0 ? (
        <>
          <Button className="btn-light cart-close-button" onClick={closeCart}>
            <MdClose></MdClose>
          </Button>
          <img className="cart-empty-image" src={cc} alt="empty cart"></img>
          <div className="d-flex align-items-center flex-column mt-3">
            <div className="cart-empty-text">Your cart is empty</div>
            <div className="cart-empty-text">Add items to get started</div>
          </div>{" "}
        </>
      ) : (
        <div className="d-flex flex-column">
          <div className="cart-close-box">
            <Button className="btn-light cart-close-button" onClick={closeCart}>
              <MdClose></MdClose>
            </Button>
            <div className="cart-order-text">Your Order</div>
          </div>
          <div className="cart-items-div">
            {cartItems.map((item) => (
              <div key={item.product} className="cart-items">
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
                  <div className="cart-qty">{item.qty}</div>
                  <Button
                    className="cart-button"
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
                    className="ml-1 mr-3 btn-light cart-remove-button"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <MdClose></MdClose>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-checkout-box">
            <hr width="100%"></hr>
            <div className="cart-subtotal-div">
              <div className="cart-subtotal">Subtotal</div>
              <div className="cart-totalPrice">
                <Icon icon={currencyBdt} />
                <div>{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</div>
              </div>
            </div>
            <Button className="cart-checkout" onClick={checkoutHandler}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(Cart);
