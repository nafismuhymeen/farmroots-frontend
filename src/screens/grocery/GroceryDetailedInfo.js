import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

export default function GroceryDetailedInfo(props) {
  return (
    <>
      {props.value.nutrientValues !== undefined ? (
        <Row className="grocery-detailed-info">
          <Col sm="12" className="grocery-detailed-info-description-heading">
            Description
          </Col>
          <Col sm="12" className="grocery-detailed-info-description">
            {props.value.detailedDescription}
          </Col>
          {/* {props.value.nutrientValues.map((nutrientValue) => (
            <>{nutrientValue?<></>:<></>}</>
          ))} */}
          <Col sm="12" className="grocery-detailed-info-nutrition-heading">
            Nutrition Value
          </Col>
          <table className="grocery-detailed-info-table table">
            {props.value.nutrientValues.map((nutrientValue) => (
              <>
                {nutrientValue.value == "undefined" ? (
                  <></>
                ) : (
                  <>
                    <tr key={nutrientValue._id}>
                      <th className="grocery-detailed-info-th">
                        {nutrientValue.name}
                      </th>
                      <td className="grocery-detailed-info-td">
                        {nutrientValue.value}
                      </td>
                    </tr>
                  </>
                )}
              </>
            ))}
          </table>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
}
