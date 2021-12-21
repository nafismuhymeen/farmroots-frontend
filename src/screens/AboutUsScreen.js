import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../actions/aboutActions";
import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
var Scroll = require("react-scroll");
var Element = Scroll.Element;
var scroller = Scroll.scroller;

function AboutUsScreen(props) {
  const dispatch = useDispatch();

  const aboutGet = useSelector((state) => state.aboutGet);
  const { loading, about, error } = aboutGet;

  var id = props.location.search ? props.location.search.split("=")[1] : "/";

  useEffect(() => {
    dispatch(getAbout());
    return () => {
      //
    };
  }, []);

  const setScroll = () => {
    if (id === "about-farmroots") {
      scroller.scrollTo("about", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
        offset: 200,
      });
    }
    if (id === "vision") {
      scroller.scrollTo("vision", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
        offset: 100,
      });
    }
    if (id === "management") {
      scroller.scrollTo("management", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
        offset: 100,
      });
    }
    if (id === "factory") {
      scroller.scrollTo("factory", {
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
      <Container fluid={true}>
        <Row>
          {loading ? (
            <Row></Row>
          ) : error ? (
            <Row>{error.message}</Row>
          ) : (
            about.map((aboutContent) => (
              <Container fluid={true} key={aboutContent._id} onLoad={setScroll}>
                <Row>
                  <Col sm="12" className="paddingZero">
                    <img
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        aboutContent.topImage
                      }
                      className="img-fluid"
                      alt="Responsive image"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="paddingZero" xs="12" sm="12" lg="6">
                    <img
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        aboutContent.aboutFarmrootsImage
                      }
                      className="img-fluid"
                      alt="Responsive image"
                    />
                  </Col>
                  <Col xs="12" sm="12" lg="6">
                    <span className="textstyleLife">
                      {aboutContent.aboutFarmrootsHeading}
                    </span>
                    <span className="textstyleLife2">
                      {aboutContent.aboutFarmrootsText}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col className="paddingZero" sm="12">
                    <div
                      style={{
                        color: `#${aboutContent.visionSloganColor}`,
                        backgroundColor: `#${aboutContent.visionSloganBackgroundColor}`,
                      }}
                      className="divider11"
                    >
                      {aboutContent.visionSloganText}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6" className="centerTextContainer">
                    <span className="textstyleLife">
                      {aboutContent.visionHeading}
                    </span>
                    <span className="textstyleLife2">
                      {aboutContent.visionText}
                    </span>
                  </Col>
                  <Col className="paddingZero" sm="6">
                    <img
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        aboutContent.visionImage
                      }
                      className="about-us-vision-image"
                    ></img>
                    <Element name="management"></Element>
                  </Col>
                </Row>
                <Row>
                  <Col className="paddingZero" sm="12">
                    <div
                      style={{
                        color: `#${aboutContent.managementSloganColor}`,
                        backgroundColor: `#${aboutContent.managementSloganBackgroundColor}`,
                      }}
                      className="divider12"
                    >
                      {aboutContent.managementSloganText}
                    </div>
                  </Col>
                </Row>

                <>
                  {aboutContent.managementContent.map((manager, index) =>
                    index % 2 === 0 ? (
                      <Row key={manager._id}>
                        <Col className="paddingZero" sm="6">
                          <img
                            className="img-fluid"
                            alt="Responsive image"
                            src={
                              process.env.REACT_APP_IMG_BASEURL + manager.image
                            }
                          ></img>
                        </Col>

                        <Col sm="6" className="centerTextContainer">
                          <span className="textstyleLife">{manager.name}</span>
                          <span className="textstyleLifePosition">
                            {manager.position}
                          </span>
                          <span className="textstyleLife2">{manager.info}</span>
                        </Col>
                        <Element name="factory"></Element>
                      </Row>
                    ) : (
                      <Row key={manager._id}>
                        <Col sm="6" className="centerTextContainer">
                          <span className="textstyleLife">{manager.name}</span>
                          <span className="textstyleLifePosition">
                            {manager.position}
                          </span>
                          <span className="textstyleLife2">{manager.info}</span>
                        </Col>
                        <Col className="paddingZero" sm="6">
                          <img
                            src={
                              process.env.REACT_APP_IMG_BASEURL + manager.image
                            }
                            className="img-fluid"
                            alt="Responsive image"
                          ></img>
                        </Col>

                        <Element name="factory"></Element>
                      </Row>
                    )
                  )}
                </>
                <Row>
                  <Col className="paddingZero" sm="12">
                    <div
                      style={{
                        color: `#${aboutContent.factorySloganColor}`,
                        backgroundColor: `#${aboutContent.factorySloganBackgroundColor}`,
                      }}
                      className="divider122"
                    >
                      {aboutContent.factorySloganText}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="paddingZero" sm="6">
                    <img
                      className="img-fluid"
                      alt="Responsive image"
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        aboutContent.factoryBeforeVideoImage
                      }
                    ></img>
                  </Col>
                  <Col sm="6" className="centerTextContainer">
                    <span className="textstyleLife">
                      {aboutContent.factoryBeforeVideoHeading}
                    </span>
                    <span className="textstyleLife2">
                      {aboutContent.factoryBeforeVideoText}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="paddingZero">
                    <video
                      className=" embed-responsive-item about-us-factory-video"
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        aboutContent.factoryVideo
                      }
                      controls
                      autoPlay
                      muted
                    ></video>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6" className="centerTextContainer">
                    <span className="textstyleLife">
                      {aboutContent.factoryAfterVideoHeading}
                    </span>
                    <span className="textstyleLife2">
                      {aboutContent.factoryAfterVideoText}
                    </span>
                  </Col>
                  <Col className="paddingZero" sm="6">
                    <img
                      className="img-fluid"
                      alt="Responsive image"
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        aboutContent.factoryAfterVideoImage
                      }
                      className="about-us-factory-image"
                    ></img>
                  </Col>
                </Row>
              </Container>
            ))
          )}
        </Row>
      </Container>
      {/* <div class="row">
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          about.map((aboutContent) => (
            <div key={aboutContent._id} onLoad={setScroll}>
              <div class="col-sm-12">
                <img
                  src={aboutContent.topImage}
                  class="img-fluid"
                  alt="Responsive image"
                />
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <img
                    src={aboutContent.aboutFarmrootsImage}
                    class="img-fluid"
                    alt="Responsive image"
                  />
                </div>
                <div className="col-sm-6">
                  <span class="textstyleLife">
                    {" "}
                    {aboutContent.aboutFarmrootsHeading}
                  </span>
                  <span class="textstyleLife2">
                    {" "}
                    {aboutContent.aboutFarmrootsText}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div
                    style={{
                      color: `#${aboutContent.visionSloganColor}`,
                      backgroundColor: `#${aboutContent.visionSloganBackgroundColor}`,
                    }}
                    className="divider11"
                  >
                    {aboutContent.visionSloganText}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <span className="textstyleLife">
                    {aboutContent.visionHeading}
                  </span>
                  <span className="textstyleLife2">
                    {aboutContent.visionText}
                  </span>
                </div>
                <div className="col-sm-6">
                  <img
                    src={aboutContent.visionImage}
                    className="about-us-vision-image"
                  ></img>
                  <Element name="management"></Element>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div
                    style={{
                      color: `#${aboutContent.managementSloganColor}`,
                      backgroundColor: `#${aboutContent.managementSloganBackgroundColor}`,
                    }}
                    className="divider12"
                  >
                    {aboutContent.managementSloganText}
                  </div>
                </div>
              </div>

              <div className="row">
                {aboutContent.managementContent.map((manager, index) =>
                  index % 2 === 0 ? (
                    <div key={manager._id} className="row">
                      <div className="col-sm-6">
                        <img
                          class="img-fluid"
                          alt="Responsive image"
                          src={manager.image}
                        ></img>
                      </div>

                      <div className="col-sm-6">
                        <span className="textstyleLife">{manager.name}</span>
                        <span className="textstyleLife">
                          {manager.position}
                        </span>
                        <span className="textstyleLife">{manager.info}</span>
                      </div>
                      <Element name="factory"></Element>
                    </div>
                  ) : (
                    <div key={manager._id} className="row">
                      <div className="col-sm-6">
                        <span className="textstyleLife">{manager.name}</span>
                        <span className="textstyleLife">
                          {manager.position}
                        </span>
                        <span className="textstyleLife">{manager.info}</span>
                      </div>
                      <div className="col-sm-6">
                        <img
                          src={manager.image}
                          class="img-fluid"
                          alt="Responsive image"
                        ></img>
                      </div>

                      <Element name="factory"></Element>
                    </div>
                  )
                )}
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div
                    style={{
                      color: `#${aboutContent.factorySloganColor}`,
                      backgroundColor: `#${aboutContent.factorySloganBackgroundColor}`,
                    }}
                    className="divider122"
                  >
                    {aboutContent.factorySloganText}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <img
                    class="img-fluid"
                    alt="Responsive image"
                    src={aboutContent.factoryBeforeVideoImage}
                  ></img>
                </div>
                <div className="col-sm-6">
                  <span className="textstyleLife">
                    {aboutContent.factoryBeforeVideoHeading}
                  </span>
                  <span className="textstyleLife">
                    {aboutContent.factoryBeforeVideoText}
                  </span>
                </div>
              </div>
              <div className="row">
                <div class="embed-responsive embed-responsive-16by9">
                  <video
                    className=" embed-responsive-item about-us-factory-video"
                    src={aboutContent.factoryVideo}
                    controls
                    autoPlay
                    muted
                  ></video>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <span className="textstyleLife">
                    {aboutContent.factoryAfterVideoHeading}
                  </span>
                  <span className="textstyleLife">
                    {aboutContent.factoryAfterVideoText}
                  </span>
                </div>
                <div className="col-sm-6">
                  <img
                    class="img-fluid"
                    alt="Responsive image"
                    src={aboutContent.factoryAfterVideoImage}
                    className="about-us-factory-image"
                  ></img>
                </div>
              </div>
            </div>
          ))
        )}
      </div> */}
      {/* <div className="">
        <div className="main">
          {loading ? (
            <div></div>
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            about.map((aboutContent) => (
              <div key={aboutContent._id} onLoad={setScroll}>
                <Element name="about"></Element> */}
      {/* <div className="container-fluid"> */}
      {/* <div className="row">
                    <div className="col-sm-12">
                      <img
                        className=" img-fluid"
                        src={aboutContent.topImage}
                      ></img>
                    </div>
                  </div> */}
      {/* <div className="row"> */}
      {/* <div className="col-sm-6">
                      <div className="about-us-about-farmroots">
                        <img
                          src={aboutContent.aboutFarmrootsImage}
                          className="about-us-about-farmroots-image"
                        ></img>
                      </div>
                    </div> */}
      {/* <div className="col-sm-6">
                      <div className="about-us-about-farmroots-content">
                        <div className="about-us-about-farmroots-heading mt-4">
                          {aboutContent.aboutFarmrootsHeading}
                        </div>
                        <div className="about-us-about-farmroots-text">
                          {aboutContent.aboutFarmrootsText}
                        </div>
                      </div>
                      <Element name="vision"></Element>
                    </div> */}
      {/* </div> */}
      {/* <div className="row">
                    <div className="col-sm-12">
                      <div
                        style={{
                          color: `#${aboutContent.visionSloganColor}`,
                          backgroundColor: `#${aboutContent.visionSloganBackgroundColor}`,
                        }}
                        className="about-us-vision-slogan"
                      >
                        {aboutContent.visionSloganText}
                      </div>
                    </div>
                  </div> */}
      {/* <div className="row">
                    <div className="col-sm-6">
                      <div className="about-us-vision-content">
                        <div className="about-us-vision-heading">
                          {aboutContent.visionHeading}
                        </div>
                        <div className="about-us-vision-text">
                          {aboutContent.visionText}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <img
                        src={aboutContent.visionImage}
                        className="about-us-vision-image"
                      ></img>
                      <Element name="management"></Element>
                    </div>
                  </div> */}
      {/* <div className="row">
                    <div className="col-sm-12">
                      <div
                        style={{
                          color: `#${aboutContent.managementSloganColor}`,
                          backgroundColor: `#${aboutContent.managementSloganBackgroundColor}`,
                        }}
                        className="about-us-management-slogan"
                      >
                        {aboutContent.managementSloganText}
                      </div>
                    </div>
                  </div> */}
      {/* <div className="row">
                    <div className="col-sm-12">
                      {aboutContent.managementContent.map((manager, index) =>
                        index % 2 === 0 ? (
                          <div
                            key={manager._id}
                            className="about-us-management"
                          >
                            <img
                              src={manager.image}
                              className="about-us-management-image"
                            ></img>
                            <div className="about-us-management-content">
                              <div className="about-us-management-name">
                                {manager.name}
                              </div>
                              <div className="about-us-management-position">
                                {manager.position}
                              </div>
                              <div className="about-us-management-text">
                                {manager.info}
                              </div>
                            </div>
                            <Element name="factory"></Element>
                          </div>
                        ) : (
                          <div
                            key={manager._id}
                            className="about-us-management"
                          >
                            <div className="about-us-management-content">
                              <div className="about-us-management-name">
                                {manager.name}
                              </div>
                              <div className="about-us-management-position">
                                {manager.position}
                              </div>
                              <div className="about-us-management-text">
                                {manager.info}
                              </div>
                            </div>
                            <img
                              src={manager.image}
                              className="about-us-management-image"
                            ></img>
                            <Element name="factory"></Element>
                          </div>
                        )
                      )}
                    </div>
                  </div> */}
      {/* <div className="row">
                    <div className="col-sm-12">
                      <div
                        style={{
                          color: `#${aboutContent.factorySloganColor}`,
                          backgroundColor: `#${aboutContent.factorySloganBackgroundColor}`,
                        }}
                        className="about-us-factory-slogan"
                      >
                        {aboutContent.factorySloganText}
                      </div>
                    </div>
                  </div> */}
      {/* <div className="row">
                    <div className="col-sm-6">
                      <img
                        src={aboutContent.factoryBeforeVideoImage}
                        className="about-us-factory-image"
                      ></img>
                    </div>
                    <div className="col-sm-6">
                      <div className="about-us-factory-content">
                        <div className="about-us-factory-heading">
                          {aboutContent.factoryBeforeVideoHeading}
                        </div>
                        <div className="about-us-factory-text">
                          {aboutContent.factoryBeforeVideoText}
                        </div>
                      </div>
                    </div>
                  </div> */}
      {/* <div className="row">
                    <div className="col-sm-12">
                      <video
                        className="about-us-factory-video"
                        src={aboutContent.factoryVideo}
                        controls
                        autoPlay
                        muted
                      ></video>
                    </div>
                  </div> */}
      {/* <div className="row">
                    <div className="col-sm-6">
                      <div className="about-us-factory-content">
                        <div className="about-us-factory-heading">
                          {aboutContent.factoryAfterVideoHeading}
                        </div>
                        <div className="about-us-factory-text">
                          {aboutContent.factoryAfterVideoText}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <img
                        src={aboutContent.factoryAfterVideoImage}
                        className="about-us-factory-image"
                      ></img>
                    </div>
                  </div> */}
      {/* </div> */}
      {/* 
              <div className="about-us-vision">
                <div className="about-us-vision-content">
                  <div className="about-us-vision-heading">
                    {aboutContent.visionHeading}
                  </div>
                  <div className="about-us-vision-text">
                    {aboutContent.visionText}
                  </div>
                </div>
              </div> */}

      {/* <div className="about-us-factory">
                <img
                  src={aboutContent.factoryBeforeVideoImage}
                  className="about-us-factory-image"
                ></img>
                <div className="about-us-factory-content">
                  <div className="about-us-factory-heading">
                    {aboutContent.factoryBeforeVideoHeading}
                  </div>
                  <div className="about-us-factory-text">
                    {aboutContent.factoryBeforeVideoText}
                  </div>
                </div>
              </div> */}
      {/* <video
                className="about-us-factory-video"
                src={aboutContent.factoryVideo}
                controls
                autoPlay
                muted
              ></video> */}
      {/* <div className="about-us-factory">
                <div className="about-us-factory-content">
                  <div className="about-us-factory-heading">
                    {aboutContent.factoryAfterVideoHeading}
                  </div>
                  <div className="about-us-factory-text">
                    {aboutContent.factoryAfterVideoText}
                  </div>
                </div>
                <img
                  src={aboutContent.factoryAfterVideoImage}
                  className="about-us-factory-image"
                ></img>
              </div> */}
      {/* </div>
            ))
          )}
        </div>
      </div> */}
    </Fragment>
  );
}

export default AboutUsScreen;
