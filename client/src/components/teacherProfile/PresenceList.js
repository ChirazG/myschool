import React, { useState } from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Edit from './Edit';
import { addStudentPresence } from '../../store/teacherAction';


const PresenceList = (userid) => {

  const studentInfo = ["id", "firstName", "lastName", "Presence"];
  const dispatch = useDispatch();
  const { allstudent_presence, subjects } = useSelector(state => state.teacher)
  const { allstudent } = useSelector(state => state.user);

  const initialPresence = {
    attendancy: "",
    student: "",
    subject: subjects
  }

  const [presence, setPresence] = useState(initialPresence)

  const handleId = (value) => {
    setPresence({
      attendancy: "",
      student: value.target.options[value.target.selectedIndex].text,
      subject: subjects
    })

    //console.log("vvv", value.target.options[value.target.selectedIndex].text)
  };

  const handleAdd = () => {
    dispatch(addStudentPresence(presence))
    window.location.reload();
  }

  const s_presenceId = allstudent_presence?.result?.map(el => el.student._id)
  var allS_id = allstudent?.filter((el) => !s_presenceId?.includes(el._id))

  return (
    <div className="col-9">

      <div className="input-group">
        <select className="custom-select" id="inputGroupSelect04" onClick={handleId}>
          {allS_id?.map((row, index) => <option value={index} > {row._id}</option>)}
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" onClick={handleAdd}>Add Presence</button>
        </div>
      </div>

      <Table responsive>
        <thead>
          <tr>

            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index}>{studentInfo[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>

          {allstudent_presence?.result?.map((row, index) => <tr><td>{row.student._id}</td>
            <td>{row.student.firstName}</td>
            <td>{row.student.lastName}</td>
            <td> <Edit el={row.attendancy} id={row._id} name="attendancy" choice="presence" index={index} /></td>
            {/* <td>
              <ButtonGroup size="sm">
                <Link to="/profile/:$`{student._id}`"><Button>See Profile</Button></Link>
              </ButtonGroup>
            </td>
            <td>
              <ButtonGroup size="sm">
                <Link><Button>Message</Button></Link>
              </ButtonGroup>
            </td> */}
          </tr>)}

        </tbody>
      </Table>
    </div>

  )
}


export default PresenceList
