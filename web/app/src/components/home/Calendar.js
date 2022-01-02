import React from "react";
import { MDBRow as Row, MDBCol as Col, MDBTypography as Type } from "mdbreact";
import PropTypes from "prop-types";
import dateFormat from "dateformat";

function Calendar({ calendar, selectedDay, handleChangeSelectedDay, incomeExpense }) {
  return calendar.loading && incomeExpense.loading ? (
    <div className="spinner-grow spinner-grow-lg" />
  ) : (
    <>
      <Type tag="h1" variant="h2">
        {calendar.data.monthNames[calendar.data.monthIndex]} {calendar.year}
      </Type>
      <Row>
        {calendar.data.dayNames.map(day => (
          <Col>{day[0]}</Col>
        ))}
      </Row>
      {calendar.data.month.map(week => (
        <Row className="my-2">
          {week.map(day => {
            const fullDate = `${dateFormat(new Date(), "yyyy-mm")}-${day.day.toString().padStart(2, "0")}`;

            return (
              <Col>
                <div
                  className={`btn kill-shadow px-2 py-1 m-0 ${day.day === selectedDay ? "btn-primary" : null}`}
                  onClick={e => handleChangeSelectedDay(e, day.day)}
                >
                  <div
                    className={`${
                      !!incomeExpense.data.find(obj => obj.date === fullDate) && day.day !== selectedDay
                        ? "text-danger"
                        : null
                    }`}
                  >
                    {day.day !== 0 && day.day}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      ))}
    </>
  );
}

Calendar.propTypes = {
  calendar: PropTypes.object.isRequired,
  handleChangeSelectedDay: PropTypes.func.isRequired,
  incomeExpense: PropTypes.object.isRequired,
  selectedDay: PropTypes.number.isRequired,
};

export default Calendar;
