import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCareers } from "../actions/careersActions";
import Header from "../components/Header";
import { Row, Col, Container } from "react-bootstrap";
var Scroll = require("react-scroll");
var Element = Scroll.Element;
var scroller = Scroll.scroller;

function CareerScreen(props) {
  const dispatch = useDispatch();

  const careersGet = useSelector((state) => state.careersGet);
  const { loading, careers, error } = careersGet;

  var id = props.location.search ? props.location.search.split("=")[1] : "/";

  useEffect(() => {
    dispatch(getCareers());
    return () => {
      //
    };
  }, []);

  const setScroll = () => {
    if (id === "life-at-farmroots") {
      // scroller.scrollTo("life", {
      //   duration: 1500,
      //   smooth: true,
      //   isDynamic: true,
      //   offset: 200,
      // });
    }
    if (id === "job-openings") {
      scroller.scrollTo("job", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
        offset: 100,
      });
    }
    if (id === "articles") {
      scroller.scrollTo("articles", {
        duration: 1500,
        smooth: true,
        isDynamic: true,
      });
    }
  };

  return (
    <Fragment>
      <Header></Header>
      {/*new code */}
      <Container fluid={true}>
        {loading ? (
          <div></div>
        ) : error ? (
          <Row>{error.message}</Row>
        ) : (
          careers.map((career) => (
            <Row key={career._id} onLoad={setScroll}>
              <Element name="life"></Element>
              <Row>
                <Col className=" " sm="12">
                  <img
                    src={process.env.REACT_APP_IMG_BASEURL + career.topImage}
                    class="img-fluid"
                    alt="Responsive image"
                  />
                </Col>
              </Row>
              {/* start */}
              <Row>
                <Col sm="6">
                  <img
                    src={
                      process.env.REACT_APP_IMG_BASEURL +
                      career.lifeAtFarmrootsImage
                    }
                    class="img-fluid"
                    alt="Responsive image"
                  ></img>
                </Col>
                <Col className="centerTextContainer" sm="6">
                  <span className="textstyleLife">
                    {career.lifeAtFarmrootsHeading}
                  </span>
                  <span className="textstyleLife2">
                    {career.lifeAtFarmrootsText}
                  </span>
                </Col>
                <Element name="job"></Element>
              </Row>
              {/* end */}
              {/* start */}
              {/* <Row>
                <Col className="centerTextContainer" sm="12">
                  <div
                    style={{
                      color: `#${career.jobOpeningsSloganColor}`,
                      backgroundColor: `#${career.jobOpeningsSloganBackgroundColor}`,
                    }}
                    className="divider11"
                  >
                    {career.jobOpeningsSloganText}
                  </div>
                </Col>
              </Row> */}
              <Row
                style={{
                  color: `#${career.jobOpeningsSloganColor}`,
                  backgroundColor: `#${career.jobOpeningsSloganBackgroundColor}`,
                }}
                className="career-work-life-slogan"
              >
                {career.jobOpeningsSloganText}
              </Row>
              <div className="career-job-openings">
                <div className="career-job-openings-heading centerTextContainer">
                  {career.jobOpeningsHeading}
                </div>
                {career.jobOpeningsContent.map((job) => (
                  <div className="career-job-openings-job">
                    <div className="career-job-openings-job-title">
                      {job.title}
                    </div>
                    <div className="career-job-openings-job-location">
                      {job.location}
                    </div>
                    <div className="career-job-openings-job-description">
                      <div className="career-job-openings-job-description-heading">
                        Job Description
                      </div>
                      <div>{job.jobDescription}</div>
                      <div className="career-job-openings-job-description-heading">
                        You will...
                      </div>
                      <ul className="career-job-openings-job-description-list">
                        {job.role &&
                          job.role.map((role) => (
                            <li className="career-job-openings-job-description-list-item">
                              {role}
                            </li>
                          ))}
                      </ul>
                      <div className="career-job-openings-job-description-heading">
                        Skills you'll need & Eligibility
                      </div>
                      <ul className="career-job-openings-job-description-list">
                        {job.skills &&
                          job.skills.map((skill) => (
                            <li className="career-job-openings-job-description-list-item">
                              {skill}
                            </li>
                          ))}
                      </ul>
                      <div className="career-job-openings-job-description-heading">
                        To Apply
                      </div>
                      <div>{`Send your latest Resume/CV at ${career.jobOpeningsEmail}`}</div>
                    </div>
                  </div>
                ))}
                <Element name="articles"></Element>
              </div>
              {/* end */}
              {/* job  start*/}

              {/* job end */}
              {/* row start*/}
              {/* <Row>
                <Col sm="12">
                  <div
                    style={{
                      color: `#${career.articlesSloganColor}`,
                      backgroundColor: `#${career.articlesSloganBackgroundColor}`,
                    }}
                    className="divider11"
                  >
                    {career.articlesSloganText}
                  </div>
                </Col>
              </Row> */}

              {/* row end */}
              {/* last one start */}
              {career.articlesContent.map((article, index) =>
                index % 2 === 0 ? (
                  <Row>
                    <Col sm="6">
                      <img
                        class="img-fluid"
                        alt="Responsive image"
                        src={process.env.REACT_APP_IMG_BASEURL + article.image}
                      ></img>
                    </Col>
                    <Col className="centerTextContainer" sm="6">
                      <span className="textstyleLife">{article.name}</span>
                      <span className="textstyleLife">{article.info}</span>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col className="centerTextContainer" sm="6">
                      <span className="textstyleLife">{article.name}</span>
                      <span className="textstyleLife">{article.info}</span>
                    </Col>
                    <Col sm="6">
                      <img
                        class="img-fluid"
                        alt="Responsive image"
                        src={process.env.REACT_APP_IMG_BASEURL + article.image}
                      ></img>
                    </Col>
                  </Row>
                )
              )}

              {/* end */}
            </Row>
          ))
        )}
      </Container>

      <div className="grid">
        {/* <div className="grid-header"></div> */}

        <div className="main">
          {loading ? (
            <div></div>
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            careers.map((career) => (
              <div key={career._id} onLoad={setScroll}>
                <Element name=""></Element>
                {/* <img className="career-top-image" src={career.topImage}></img> */}
                {/* <div className="career-life-at-farmroots">
                  <img
                    src={career.lifeAtFarmrootsImage}
                    className="career-life-at-farmroots-image"
                  ></img>
                  <div className="career-life-at-farmroots-content">
                    <div className="career-life-at-farmroots-heading">
                      {career.lifeAtFarmrootsHeading}
                    </div>
                    <div className="career-life-at-farmroots-text">
                      {career.lifeAtFarmrootsText}
                    </div>
                  </div>
                  <Element name="job"></Element>
                </div> */}
                {/* <div
                  style={{
                    color: `#${career.jobOpeningsSloganColor}`,
                    backgroundColor: `#${career.jobOpeningsSloganBackgroundColor}`,
                  }}
                  className="career-work-life-slogan"
                >
                  {career.jobOpeningsSloganText}
                </div>
                <div className="career-job-openings">
                  <div className="career-job-openings-heading">
                    {career.jobOpeningsHeading}
                  </div>
                  {career.jobOpeningsContent.map((job) => (
                    <div className="career-job-openings-job">
                      <div className="career-job-openings-job-title">
                        {job.title}
                      </div>
                      <div className="career-job-openings-job-location">
                        {job.location}
                      </div>
                      <div className="career-job-openings-job-description">
                        <div className="career-job-openings-job-description-heading">
                          Job Description
                        </div>
                        <div>{job.jobDescription}</div>
                        <div className="career-job-openings-job-description-heading">
                          You will...
                        </div>
                        <ul className="career-job-openings-job-description-list">
                          {job.role &&
                            job.role.map((role) => (
                              <li className="career-job-openings-job-description-list-item">
                                {role}
                              </li>
                            ))}
                        </ul>
                        <div className="career-job-openings-job-description-heading">
                          Skills you'll need & Eligibility
                        </div>
                        <ul className="career-job-openings-job-description-list">
                          {job.skills &&
                            job.skills.map((skill) => (
                              <li className="career-job-openings-job-description-list-item">
                                {skill}
                              </li>
                            ))}
                        </ul>
                        <div className="career-job-openings-job-description-heading">
                          To Apply
                        </div>
                        <div>{`Send your latest Resume/CV at ${career.jobOpeningsEmail}`}</div>
                      </div>
                    </div>
                  ))}
                  <Element name="articles"></Element>
                </div> */}
                {/* <div
                  style={{
                    color: `#${career.articlesSloganColor}`,
                    backgroundColor: `#${career.articlesSloganBackgroundColor}`,
                  }}
                  className="career-publication-slogan"
                >
                  {career.articlesSloganText}
                </div> */}
                {/* {career.articlesContent.map((article, index) =>
                  index % 2 === 0 ? (
                    <div className="career-publications">
                      <img
                        src={article.image}
                        className="career-publications-image"
                      ></img>
                      <div className="career-publications-content">
                        <div className="career-publications-heading">
                          {article.name}
                        </div>
                        <div className="career-publications-text">
                          {article.info}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="career-publications">
                      <div className="career-publications-content">
                        <div className="career-publications-heading">
                          {article.name}
                        </div>
                        <div className="career-publications-text">
                          {article.info}
                        </div>
                      </div>
                      <img
                        src={article.image}
                        className="career-publications-image"
                      ></img>
                    </div>
                  )
                )} */}
              </div>
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default CareerScreen;
