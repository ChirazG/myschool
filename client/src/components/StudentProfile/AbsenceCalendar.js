import React from 'react';
import Calendar from 'calendar-reactjs';
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap';
import '../../pages/Profile.css';
import { useDispatch, useSelector } from 'react-redux';


const AbsenceCalendar = () => {

  const subjects = ["Date", "Subject id", "Subject title", "Attendancy"]

  const dispatch = useDispatch();
  const { allsubject_presence } = useSelector(state => state.student);

  return (
    <div className="col-9">
      <Table responsive>
        <thead>
          <tr>

            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index}>{subjects[index]}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {allsubject_presence?.map((row, index) => <tr><td>{row.updated_at?.substring(0, 10)}</td>
            <td>{row.subject._id}</td>
            <td>{row.subject.title}</td>
            <td>{row.attendancy}</td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}


export default AbsenceCalendar
