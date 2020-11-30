import React from "react";
import { MDBRow as Row, MDBCol as Col, MDBTypography as Type } from "mdbreact";

export default function Calendar({ loading, calendar }) {
  return loading ? (
    <div className="spinner-grow spinner-grow-lg" />
  ) : (
    <>
      <Type tag="h1" variant="h2">
        {calendar.monthNames[calendar.monthIndex]} {calendar.year}
      </Type>
      <Row>
        {calendar.dayNames.map(day => (
          <Col>{day.slice(0, 3)}</Col>
        ))}
      </Row>
      {calendar.month.map(week => (
        <Row className="my-2">
          {week.map(day => (
            <Col>{day === 0 ? null : day}</Col>
          ))}
        </Row>
      ))}
    </>
  );
}
