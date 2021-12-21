import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listSearchProducts } from '../actions/productActions';
import Header from '../components/Header';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { IoMdHeart } from 'react-icons/io';
import {
  addToWishlist,
  deleteFromWishlist,
  listProductWishlist,
} from '../actions/wishlistActions';
import { addToCart } from '../actions/cartActions';
import Rating from '../components/Rating';
import Cart from '../components/Cart';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { Icon } from '@iconify/react';
import currencyBdt from '@iconify-icons/mdi/currency-bdt';

function SearchScreen(props) {
  const [sortOrder, setSortOrder] = useState('');
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [priceFilterCheck, setPriceFilterCheck] = useState(false);

  const search = props.match.params.id ? props.match.params.id : '';

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productWishlist = useSelector((state) => state.productWishlist);
  const {
    wishlist,
    loading: loadingWishlist,
    error: errorWishlist,
  } = productWishlist;

  const addWishlist = useSelector((state) => state.addWishlist);
  const { success: wishlistAddSuccess } = addWishlist;

  const deleteWishlist = useSelector((state) => state.deleteWishlist);
  const { success: wishlistDeleteSuccess } = deleteWishlist;

  useEffect(() => {
    dispatch(listSearchProducts(search, sortOrder, minPrice, maxPrice, rating));
    if (userInfo) {
      dispatch(listProductWishlist());
    }
    return () => {
      //
    };
  }, [
    search,
    sortOrder,
    priceFilterCheck,
    rating,
    wishlistAddSuccess,
    wishlistDeleteSuccess,
    userInfo,
  ]);

  const wishlistAddHandler = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const wishlistDeleteHandler = (wishlistId) => {
    dispatch(deleteFromWishlist(wishlistId));
  };

  function checkProductWishlist(productId) {
    if (wishlist.indexOf(productId) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId, 1));
    openCart();
  };
  const handleBuyNow = (productId) => {
    dispatch(addToCart(productId, 1));
    setTimeout(() => {
      props.history.push('/checkout');
    }, 1000);
  };

  const openCart = () => {
    document.querySelector('.cart').classList.add('open');
  };

  const openSortDropdown = () => {
    document.querySelector('.search-sort-dropdown-list').classList.add('open');
    setSortDropdownVisible(true);
  };

  const closeSortDropdown = () => {
    document
      .querySelector('.search-sort-dropdown-list')
      .classList.remove('open');
    setSortDropdownVisible(false);
  };

  const sortHandler = (sortOrder) => {
    setSortOrder(sortOrder);
    setSortDropdownVisible(false);
  };

  const filterHandler = (e) => {
    e.preventDefault();
    setPriceFilterCheck(true);
  };

  const priceFilterRemover = () => {
    setMinPrice(0);
    setMaxPrice(0);
    setPriceFilterCheck(false);
  };

  const filterRemover = () => {
    setRating(0);
    setMinPrice(0);
    setMaxPrice(0);
    setPriceFilterCheck(false);
  };

  return (
    <>
      <Header></Header>
      {/* <Cart></Cart> */}
      <Container fluid={true}>
        <Row>
          <>
            {loading ? (
              <Col>.</Col>
            ) : error ? (
              <Col>{error}</Col>
            ) : (
              <>
                <Col xs="12" sm="3" className="search-sidebar">
                  <>
                    <div className="search-sidebar-filter">
                      <h1 className="search-sidebar-filter-heading">Filters</h1>
                      {(priceFilterCheck === true || rating > 0) && (
                        <Button
                          onClick={filterRemover}
                          className="search-sidebar-filter-clear-button"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                    {(priceFilterCheck === true || rating > 0) && (
                      <div className="search-sidebar-filter-content">
                        {priceFilterCheck === true && (
                          <Button
                            onClick={priceFilterRemover}
                            className="search-sidebar-filter-button"
                          >
                            <FiX className="search-sidebar-filter-icon"></FiX>
                            <div className="mr-2">Price: </div>
                            <Icon icon={currencyBdt} />
                            <div>{minPrice} </div>
                            <div className="ml-2 mr-1"> - </div>
                            <Icon icon={currencyBdt} />
                            <div>{maxPrice}</div>
                          </Button>
                        )}
                        {rating > 0 && (
                          <Button
                            onClick={() => setRating(0)}
                            className="search-sidebar-filter-button"
                          >
                            <FiX className="search-sidebar-filter-icon"></FiX>
                            {`Rating: ${rating} & above`}
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                  <hr className="search-sidebar-horizontal-line"></hr>
                  <div className="search-sidebar-price">
                    <div className="search-sidebar-price-heading">Price</div>
                    <form onSubmit={filterHandler}>
                      <div className="d-flex align-items-center">
                        <input
                          autoComplete="off"
                          type="text"
                          name="minPrice"
                          placeholder="Min"
                          className="search-sidebar-price-input"
                          onChange={(e) => setMinPrice(e.target.value)}
                        ></input>
                        <div className="search-sidebar-price-dash">-</div>
                        <input
                          autoComplete="off"
                          type="text"
                          name="maxPrice"
                          placeholder="Max"
                          className="search-sidebar-price-input"
                          onChange={(e) => setMaxPrice(e.target.value)}
                        ></input>
                      </div>
                      <Button
                        type="submit"
                        className="search-sidebar-price-button"
                      >
                        Apply Filter
                      </Button>
                    </form>
                  </div>
                  <hr className="search-sidebar-horizontal-line"></hr>
                  <div className="search-sidebar-price">
                    <div className="search-sidebar-rating-heading">
                      Customer Ratings
                    </div>
                    <Button
                      className="search-sidebar-rating-button"
                      onClick={() => setRating(4)}
                    >
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star-last"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      And Up
                    </Button>
                    <Button
                      className="search-sidebar-rating-button"
                      onClick={() => setRating(3)}
                    >
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star-last"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      And Up
                    </Button>
                    <Button
                      className="search-sidebar-rating-button"
                      onClick={() => setRating(2)}
                    >
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star-last"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      And Up
                    </Button>
                    <Button
                      className="search-sidebar-rating-button"
                      onClick={() => setRating(1)}
                    >
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#ffc702' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      <i
                        className="fa fa-star search-sidebar-rating-star-last"
                        style={{ color: '#bbbbbb' }}
                      ></i>
                      And Up
                    </Button>
                  </div>
                </Col>
                <Col xs="12" sm="9" className="search-main">
                  <Row className="search-sort">
                    <Col sm="6">
                      {products.length === 0 ? (
                        <span className="search-sort-heading">
                          No Results Found
                        </span>
                      ) : (
                        <span className="search-sort-heading">{`Search results for '${search}'`}</span>
                      )}
                    </Col>
                    <Col sm="6" className="d-flex dflexEnd">
                      <div className="search-sort-div">
                        <div>Sort By</div>
                        <div className="search-sort-dropdown">
                          {sortDropdownVisible ? (
                            <>
                              {sortOrder === '' && (
                                <Button
                                  onClick={closeSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Latest <FiChevronUp></FiChevronUp>
                                </Button>
                              )}
                              {sortOrder === 'highestPrice' && (
                                <Button
                                  onClick={closeSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Price: Highest First{' '}
                                  <FiChevronUp></FiChevronUp>
                                </Button>
                              )}
                              {sortOrder === 'lowestPrice' && (
                                <Button
                                  onClick={closeSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Price: Lowest First{' '}
                                  <FiChevronUp></FiChevronUp>
                                </Button>
                              )}
                              {sortOrder === 'highestRating' && (
                                <Button
                                  onClick={closeSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Rating: Highest First{' '}
                                  <FiChevronUp></FiChevronUp>
                                </Button>
                              )}
                              {sortOrder === 'lowestRating' && (
                                <Button
                                  onClick={closeSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Rating: Lowest First{' '}
                                  <FiChevronUp></FiChevronUp>
                                </Button>
                              )}
                            </>
                          ) : (
                            <>
                              {sortOrder === '' && (
                                <Button
                                  onClick={openSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Latest <FiChevronDown></FiChevronDown>
                                </Button>
                              )}
                              {sortOrder === 'highestPrice' && (
                                <Button
                                  onClick={openSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Price: Highest First{' '}
                                  <FiChevronDown></FiChevronDown>
                                </Button>
                              )}
                              {sortOrder === 'lowestPrice' && (
                                <Button
                                  onClick={openSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Price: Lowest First{' '}
                                  <FiChevronDown></FiChevronDown>
                                </Button>
                              )}
                              {sortOrder === 'highestRating' && (
                                <Button
                                  onClick={openSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Rating: Highest First{' '}
                                  <FiChevronDown></FiChevronDown>
                                </Button>
                              )}
                              {sortOrder === 'lowestRating' && (
                                <Button
                                  onClick={openSortDropdown}
                                  className="search-sort-dropdown-select"
                                >
                                  Rating: Lowest First{' '}
                                  <FiChevronDown></FiChevronDown>
                                </Button>
                              )}
                            </>
                          )}
                          <div className="search-sort-dropdown-list">
                            <Button
                              className="search-sort-dropdown-list-button"
                              onClick={() => sortHandler('')}
                            >
                              Latest
                            </Button>
                            <Button
                              className="search-sort-dropdown-list-button"
                              onClick={() => sortHandler('highestPrice')}
                            >
                              Price: Highest First
                            </Button>
                            <Button
                              className="search-sort-dropdown-list-button"
                              onClick={() => sortHandler('lowestPrice')}
                            >
                              Price: Lowest First
                            </Button>
                            <Button
                              className="search-sort-dropdown-list-button"
                              onClick={() => sortHandler('highestRating')}
                            >
                              Rating: Highest First
                            </Button>
                            <Button
                              className="search-sort-dropdown-list-button"
                              onClick={() => sortHandler('lowestRating')}
                            >
                              Rating: Lowest First
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="search-products">
                    {products.map((product) => (
                      <Col sm="3" xs="6" key={product.id}>
                        <div className="card">
                          <div
                            style={{ position: 'relative' }}
                            className="search-product-image-div card-img"
                          >
                            <Link
                              className="imgContainer"
                              to={`/product/${product.category.replace(
                                ' ',
                                ''
                              )}/${product.subCategory.replace(' ', '')}/${
                                product.id
                              }`}
                            >
                              <img
                                className="search-product-image"
                                src={product.image1}
                                alt="Grocery Product"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '../default.jpg';
                                }}
                              />
                            </Link>
                            {product.price === product.discountPrice ? (
                              <></>
                            ) : (
                              <div className="discountPer">
                                {Math.round(
                                  ((product.price - product.discountPrice) /
                                    product.price) *
                                    100
                                )}
                                %
                              </div>
                            )}
                            {userInfo && (
                              <>
                                {loadingWishlist ? (
                                  <div></div>
                                ) : errorWishlist ? (
                                  <div>{error.message}</div>
                                ) : checkProductWishlist(product.id) ===
                                  true ? (
                                  <Button
                                    onClick={() =>
                                      wishlistDeleteHandler(product.id)
                                    }
                                    className="search-product-wishlist-remove"
                                  >
                                    <IoMdHeart></IoMdHeart>
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      wishlistAddHandler(product.id)
                                    }
                                    className="search-product-wishlist"
                                  >
                                    <IoMdHeart></IoMdHeart>
                                  </Button>
                                )}
                              </>
                            )}
                            {product.specialDeliveryOffer &&
                              product.specialDeliveryOffer.type ===
                                'Free Delivery' &&
                              product.specialDeliveryOffer.value === 0 && (
                                <div className="search-product-free-delivery">
                                  Free Delivery
                                </div>
                              )}
                          </div>
                          <div className="search-product-content">
                            <div className="search-product-name">
                              <Link to={'/grocery/product/' + product.id}>
                                {product.name}
                              </Link>
                            </div>
                            <div className="search-product-rating">
                              <Rating value={product.rating * 20}></Rating>
                              <div className="ml-2">({product.numReviews})</div>
                            </div>
                            <div className="search-product-price">
                              <div>Price</div>
                              {product.price === product.discountPrice ? (
                                <div className="d-flex align-items-center">
                                  <Icon icon={currencyBdt} />
                                  <div>
                                    <b>{product.price}</b>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  <div className="d-flex align-items-center mr-3">
                                    <Icon icon={currencyBdt} />
                                    <div>
                                      <b>{Math.round(product.discountPrice)}</b>
                                    </div>
                                  </div>
                                  <div
                                    className="d-flex align-items-center"
                                    style={{ fontSize: '1.7rem' }}
                                  >
                                    <Icon icon={currencyBdt} />
                                    <div className="textLinethrough">
                                      {product.price}
                                    </div>
                                    <hr className="search-product-discount-price-cut-line"></hr>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="search-product-price">
                              <div>Net Wt.</div>
                              <div>{product.netWeight}</div>
                            </div>
                            {!product.outOfStock ? (
                              <Row className="centerme margin0">
                                <Button
                                  onClick={() => handleAddToCart(product.id)}
                                  className="search-product-button"
                                >
                                  Add To Cart
                                </Button>
                                <Button
                                  className="search-product-button mt-2"
                                  onClick={() => handleBuyNow(product.id)}
                                >
                                  Buy Now
                                </Button>
                              </Row>
                            ) : (
                              <div className="search-product-out-of-stock">
                                Out of Stock
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </>
            )}
          </>
        </Row>
      </Container>
      <div className="grid"></div>
    </>
  );
}

export default SearchScreen;
