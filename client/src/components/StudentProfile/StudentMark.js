import React from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap';
import '../../pages/Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentMark = () => {
  const subject = ["Subject id", "Subject title", "Mark"]
  const dispatch = useDispatch();
  const { allsubject_mark } = useSelector(state => state.student);

  return (
    <div className="col-9">
      <Table responsive>
        <thead>
          <tr>

            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index}>{subject[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>


          {allsubject_mark.result ? allsubject_mark.result.map((row, index) => <tr><td>{row.subject._id}</td>
            <td>{row.subject.title}</td>
            <td>{row.mark}</td>
          </tr>) : null}


        </tbody>
      </Table>

    </div>


  )
}


export default StudentMark