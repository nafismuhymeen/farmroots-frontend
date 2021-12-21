import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../actions/videosActions";
import Header from "../components/Header";
import { Row, Container, Col } from "react-bootstrap";
var Scroll = require("react-scroll");
var Element = Scroll.Element;
var scroller = Scroll.scroller;

function VideoScreen(props) {
  const dispatch = useDispatch();

  const videosGet = useSelector((state) => state.videosGet);
  const { loading, videos, error } = videosGet;

  var id = props.location.search ? props.location.search.split("=")[1] : "/";

  useEffect(() => {
    dispatch(getVideos());
    return () => {
      //
    };
  }, []);

  const setScroll = () => {
    if (id === "cooking-videos") {
      scroller.scrollTo("cooking", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
        offset: 100,
      });
    }
    if (id === "kitchen-hacks") {
      scroller.scrollTo("kitchen", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
        offset: 100,
      });
    }
    if (id === "health-tips") {
      scroller.scrollTo("health", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
        offset: 100,
      });
    }
  };

  return (
    <Fragment>
      <Header></Header>
      <Container fluid>
        {/* <Row> */}
        {loading ? (
          <Row></Row>
        ) : error ? (
          <Row>{error.message}</Row>
        ) : (
          videos.map((video) => (
            <div key={video._id} onLoad={setScroll}>
              <Row>
                <Col className="paddingZero " sm="12">
                  <img
                    src={process.env.REACT_APP_IMG_BASEURL + video.topImage}
                    class="img-fluid width100cent"
                    alt="Responsive"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="paddingZero " sm="6">
                  <img
                    src={
                      process.env.REACT_APP_IMG_BASEURL +
                      video.cookingVideosImage
                    }
                    class="img-fluid"
                    alt="Responsive"
                  />
                </Col>
                <Col className="centerTextContainer" sm="6">
                  <span className="textstyleLife">
                    {video.cookingVideosHeading}
                  </span>
                  <span className="textstyleLife2">
                    {video.cookingVideosText}
                  </span>
                  {/* <span className="textstyleLife2">
                    {video.cookingVideosSloganText}
                  </span> */}
                </Col>
              </Row>
              <Row>
                <Col className="paddingZero " sm="12">
                  <div
                    style={{
                      color: `#${video.cookingVideosSloganColor}`,
                      backgroundColor: `#${video.cookingVideosSloganBackgroundColor}`,
                    }}
                    className="divider11"
                  >
                    {video.cookingVideosSloganText}
                  </div>
                </Col>
              </Row>
              {/* video part */}
              {video.cookingVideosContent.map((video, index) =>
                index % 2 === 0 ? (
                  <Row>
                    <Col className="centerTextContainer paddingZero" sm="6">
                      {/* <span className="textstyleLife">{video.name}</span> */}
                      {/* <ul className="recepieUlist"> */}
                      {video.recipe &&
                        video.recipe.map((step) => (
                          // <li className="recepieList">{step}</li>
                          <img
                            src={process.env.REACT_APP_IMG_BASEURL + step}
                            className="image-fluid imageSizeStyle"
                          />
                        ))}
                      {/* </ul> */}
                    </Col>
                    <Col className="paddingZero " sm="6">
                      <iframe
                        className="embed-responsive videos-cooking-youtube-frame"
                        src={
                          process.env.REACT_APP_IMG_BASEURL + video.youtubeLink
                        }
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </Col>

                    <Element name="kitchen"></Element>
                  </Row>
                ) : (
                  <Row>
                    <Col className="paddingZero " sm="6">
                      <iframe
                        className="embed-responsive videos-cooking-youtube-frame "
                        src={
                          process.env.REACT_APP_IMG_BASEURL + video.youtubeLink
                        }
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </Col>

                    <Col className="paddingZero centerTextContainer" sm="6">
                      {/* <span className="textstyleLife videos-cooking-name">
                        {video.name}
                      </span> */}
                      {/* <ul className="textstyleLife"> */}
                      {video.recipe &&
                        video.recipe.map((step) => (
                          // <li className="">{step}</li>
                          <img
                            src={process.env.REACT_APP_IMG_BASEURL + step}
                            className="image-fluid imageSizeStyle"
                          />
                        ))}
                      {/* </ul> */}
                    </Col>
                    <Element name="kitchen"></Element>
                  </Row>
                )
              )}

              {/* video part end */}
              <Row>
                <Col className="paddingZero " sm="12">
                  <div
                    style={{
                      color: `#${video.kitchenHacksSloganColor}`,
                      backgroundColor: `#${video.kitchenHacksSloganBackgroundColor}`,
                    }}
                    className="divider122"
                  >
                    {video.kitchenHacksSloganText}
                  </div>
                </Col>
              </Row>
              {/* row end */}
              {video.kitchenHacksContent.map((kitchenHack, index) =>
                index % 2 === 0 ? (
                  <Row>
                    <Col sm="6" className="paddingZero ">
                      <img
                        class="img-fluid image_height_objectfit"
                        alt="Responsive image"
                        src={
                          process.env.REACT_APP_IMG_BASEURL + kitchenHack.image
                        }
                      ></img>
                    </Col>

                    <Col className="centerTextContainer" sm="6">
                      <span className="textstyleLife">{kitchenHack.name}</span>
                      <span className="textstyleLife">{kitchenHack.info}</span>
                    </Col>
                    <Element name="health"></Element>
                  </Row>
                ) : (
                  <Row>
                    <Col className="centerTextContainer" sm="6">
                      <span className="textstyleLife">{kitchenHack.name}</span>
                      <span className="textstyleLife">{kitchenHack.info}</span>
                    </Col>
                    <Col sm="6" className="paddingZero ">
                      <img
                        class="img-fluid image_height_objectfit  "
                        alt="Responsive image"
                        src={
                          process.env.REACT_APP_IMG_BASEURL + kitchenHack.image
                        }
                      ></img>
                    </Col>

                    <Element name="health"></Element>
                  </Row>
                )
              )}

              {/* this is the start */}

              <Row>
                <Col className="paddingZero " sm="12">
                  <div
                    style={{
                      color: `#${video.healthTipsSloganColor}`,
                      backgroundColor: `#${video.healthTipsSloganBackgroundColor}`,
                    }}
                    className="divider11"
                  >
                    {video.healthTipsSloganText}
                  </div>
                </Col>
              </Row>

              {/* this is the end */}
              {/* start */}
              {video.healthTipsContent.map((healthTip, index) =>
                index % 2 === 0 ? (
                  <Row>
                    <Col className="centerTextContainer" sm="6">
                      <span className="textstyleLife">{healthTip.name}</span>
                      <span className="textstyleLife">{healthTip.info}</span>
                    </Col>
                    <Col className="paddingZero " sm="6">
                      <img
                        class="img-fluid image_height_objectfit "
                        alt="Responsive image"
                        src={
                          process.env.REACT_APP_IMG_BASEURL + healthTip.image
                        }
                      ></img>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col className="paddingZero " sm="6">
                      <img
                        src={
                          process.env.REACT_APP_IMG_BASEURL + healthTip.image
                        }
                        class="img-fluid image_height_objectfit "
                        alt="Responsive"
                      ></img>
                    </Col>
                    <Col className="paddingZero " sm="6">
                      <span className="textstyleLife">{healthTip.name}</span>
                      <span className="textstyleLife">{healthTip.info}</span>
                    </Col>
                  </Row>
                )
              )}
              {/* end */}
            </div>
          ))
        )}
        {/* </Row> */}
        {/* <div className="grid">
        <div className="main">
          {loading ? (
            <div></div>
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            videos.map((video) => (
              <div key={video._id} onLoad={setScroll}> */}
        {/* <img className="videos-top-image" src={video.topImage}></img> */}
        {/* <div className="videos-intro">
                  <img
                    src={video.cookingVideosImage}
                    className="videos-intro-image"
                  ></img>
                  <div className="videos-intro-content">
                    <div className="videos-intro-heading">
                      {video.cookingVideosHeading}
                    </div>
                    <div className="videos-intro-text">
                      {video.cookingVideosHeading}
                    </div>
                  </div>
                  <Element name="cooking"></Element>
                </div> */}
        {/* <div
                  style={{
                    color: `#${video.cookingVideosSloganColor}`,
                    backgroundColor: `#${video.cookingVideosSloganBackgroundColor}`,
                  }}
                  className="videos-cooking-slogan"
                >
                  {video.cookingVideosSloganText}
                </div> */}
        {/* {video.cookingVideosContent.map((video, index) =>
                  index % 2 === 0 ? (
                    <div className="videos-cooking">
                      <div className="videos-cooking-content">
                        <div className="videos-cooking-name">{video.name}</div>
                        <ul className="videos-cooking-recipe-list">
                          {video.recipe &&
                            video.recipe.map((step) => (
                              <li className="videos-cooking-recipe-point">
                                {step}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <iframe
                        className="videos-cooking-youtube-frame"
                        src={video.youtubeLink}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                      <Element name="kitchen"></Element>
                    </div>
                  ) : (
                    <div className="videos-cooking">
                      <iframe
                        className="videos-cooking-youtube-frame"
                        src={video.youtubeLink}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                      <div className="videos-cooking-content">
                        <div className="videos-cooking-name">{video.name}</div>
                        <ul className="videos-cooking-recipe-list">
                          {video.recipe &&
                            video.recipe.map((step) => (
                              <li className="videos-cooking-recipe-point">
                                {step}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <Element name="kitchen"></Element>
                    </div>
                  )
                )} */}
        {/* <div
                  style={{
                    color: `#${video.kitchenHacksSloganColor}`,
                    backgroundColor: `#${video.kitchenHacksSloganBackgroundColor}`,
                  }}
                  className="videos-kitchen-hacks-slogan"
                >
                  {video.kitchenHacksSloganText}
                </div> */}
        {/* {video.kitchenHacksContent.map((kitchenHack, index) =>
                  index % 2 === 0 ? (
                    <div className="videos-kitchen-hacks">
                      <img
                        src={kitchenHack.image}
                        className="videos-kitchen-hacks-image"
                      ></img>
                      <div className="videos-kitchen-hacks-content">
                        <div className="videos-kitchen-hacks-name">
                          {kitchenHack.name}
                        </div>
                        <div className="videos-kitchen-hacks-text">
                          {kitchenHack.info}
                        </div>
                      </div>
                      <Element name="health"></Element>
                    </div>
                  ) : (
                    <div className="videos-kitchen-hacks">
                      <div className="videos-kitchen-hacks-content">
                        <div className="videos-kitchen-hacks-name">
                          {kitchenHack.name}
                        </div>
                        <div className="videos-kitchen-hacks-text">
                          {kitchenHack.info}
                        </div>
                      </div>
                      <img
                        src={kitchenHack.image}
                        className="videos-kitchen-hacks-image"
                      ></img>
                      <Element name="health"></Element>
                    </div>
                  )
                )} */}
        {/* <div
                  style={{
                    color: `#${video.healthTipsSloganColor}`,
                    backgroundColor: `#${video.healthTipsSloganBackgroundColor}`,
                  }}
                  className="videos-health-tips-slogan"
                >
                  {video.healthTipsSloganText}
                </div> */}
        {/* {video.healthTipsContent.map((healthTip, index) =>
                  index % 2 === 0 ? (
                    <div className="videos-health-tips">
                      <div className="videos-health-tips-content">
                        <div className="videos-health-tips-name">
                          {healthTip.name}
                        </div>
                        <div className="videos-health-tips-text">
                          {healthTip.info}
                        </div>
                      </div>
                      <img
                        src={healthTip.image}
                        className="videos-health-tips-image"
                      ></img>
                    </div>
                  ) : (
                    <div className="videos-health-tips">
                      <img
                        src={healthTip.image}
                        className="videos-health-tips-image"
                      ></img>
                      <div className="videos-health-tips-content">
                        <div className="videos-health-tips-name">
                          {healthTip.name}
                        </div>
                        <div className="videos-health-tips-text">
                          {healthTip.info}
                        </div>
                      </div>
                    </div>
                  )
                )} */}
        {/* </div>
            ))
          )}
        </div>
      </div> */}
      </Container>
    </Fragment>
  );
}

export default VideoScreen;
