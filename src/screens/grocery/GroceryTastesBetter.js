import React, { useEffect } from 'react';
// import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { listRecommendedProducts } from '../../actions/productActions';
import GroceryCart from '../../components/GroceryCart';
import GroceryRating from '../../components/GroceryRating';
import { Icon } from '@iconify/react';
import currencyBdt from '@iconify-icons/mdi/currency-bdt';
import { Button, Carousel, Container, Row, Col, Card } from 'react-bootstrap';

function GroceryTastesBetter(props) {
  const dispatch = useDispatch();

  const recommendedProduct = useSelector((state) => state.recommendedProduct);
  const { loading, recommendedProducts, error } = recommendedProduct;

  useEffect(() => {
    if (props.value.id) {
      dispatch(listRecommendedProducts(props.value.id));
    }
    return () => {
      //
    };
  }, []);

  const openCart = () => {
    document.querySelector('.grocery-cart').classList.add('open');
  };

  const handleAddToCart = (recommendedProductId) => {
    dispatch(addToCart(recommendedProductId, 1));
    openCart();
  };

  // console.log('recommendedProductsrecommendedProducts=>', recommendedProducts);

  return (
    <>
      <GroceryCart></GroceryCart>
      {loading ? (
        <div></div>
      ) : error ? (
        <div>{error}</div>
      ) : recommendedProducts.length === 0 ? (
        <div>No Recommended Products</div>
      ) : (
        <>
          {recommendedProducts.map((recommendedProduct) => (
            <Col
              xs="12"
              sm="6"
              lg="3"
              className="mrLfm"
              key={recommendedProduct.id}
            >
              <Card className="grocery-tastes-better-product">
                <Link
                  className="imgContainer"
                  to={`/product/${recommendedProduct.category}/${recommendedProduct.subCategory}/${recommendedProduct.id}`}
                >
                  <Card.Img
                    className="grocery-tastes-better-product-image "
                    src={recommendedProduct.image}
                    alt="Grocery Product"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://farmroot.fourbrick.in/default.jpg';
                    }}
                    alt="Grocery Product"
                  />
                  {recommendedProduct.price ===
                  recommendedProduct.discountPrice ? (
                    <></>
                  ) : (
                    <div className="discountPer">
                      {Math.round(
                        ((recommendedProduct.price -
                          recommendedProduct.discountPrice) /
                          recommendedProduct.price) *
                          100
                      )}
                      %
                    </div>
                  )}
                </Link>
                <Card.Title className="cardtitlefont col-12">
                  {recommendedProduct.name}
                </Card.Title>

                <Row className="grocery-tastes-better-product-rating">
                  <GroceryRating
                    value={recommendedProduct.rating}
                  ></GroceryRating>
                  <span className="ml-2">
                    ({recommendedProduct.numReviews})
                  </span>
                </Row>
                <Row className="ml-2">
                  <Col xs="6" sm="6">
                    <span>Price</span>
                  </Col>
                  <Col xs="6" sm="6" className="dflexCenter padding-left0">
                    {' '}
                    {recommendedProduct.price ===
                    recommendedProduct.discountPrice ? (
                      <>
                        <Icon icon={currencyBdt} />
                        <span>
                          <b>{recommendedProduct.price}</b>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className=" align-items-center mr-3">
                          <Icon icon={currencyBdt} />
                          <span>
                            <b>
                              {Math.round(recommendedProduct.discountPrice)}
                            </b>
                          </span>
                        </span>
                        <span
                          className="d-flex align-items-center linethrough"
                          style={{ fontSize: '1.7rem' }}
                        >
                          <Icon icon={currencyBdt} />
                          <span>{recommendedProduct.price}</span>
                          <hr className="grocery-product-discount-price-cut-line"></hr>
                        </span>
                      </>
                    )}
                  </Col>
                </Row>
                <Row className="ml-2">
                  <Col xs="6" sm="6">
                    <span>Net Wt.</span>
                  </Col>
                  <Col xs="6" sm="6" className="dflexCenter">
                    <span> {recommendedProduct.netWeight}</span>
                  </Col>
                </Row>

                {/* <div className="grocery-tastes-better-product-price">
                  <span>Price</span>
                  {recommendedProduct.price ===
                  recommendedProduct.discountPrice ? (
                    <Col className="d-flex align-items-center">
                      <Icon icon={currencyBdt} />
                      <span>
                        <b>{recommendedProduct.price}</b>
                      </span>
                    </Col>
                  ) : (
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center mr-3">
                        <Icon icon={currencyBdt} />
                        <div>
                          <b>{recommendedProduct.discountPrice}</b>
                        </div>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ fontSize: "1.7rem" }}
                      >
                        <Icon icon={currencyBdt} />
                        <div>{recommendedProduct.price}</div>
                        <hr className="grocery-product-discount-price-cut-line"></hr>
                      </div>
                    </div>
                  )}
                </div> */}
                {/* <div className="grocery-tastes-better-product-price">
                  <div>Net Wt.</div>
                  <div>{recommendedProduct.netWeight}</div>
                </div> */}
                {!recommendedProduct.outOfStock ? (
                  <Button
                    onClick={() => handleAddToCart(recommendedProduct.id)}
                    className="grocery-tastes-better-product-button"
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <div
                    className="grocery-product-out-of-stock"
                    style={{ fontSize: '2.1rem', height: '4.4rem' }}
                  >
                    Out of Stock
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </>
      )}
    </>
  );
}

export default withRouter(GroceryTastesBetter);
