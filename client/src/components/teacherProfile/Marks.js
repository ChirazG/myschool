import React, { useState } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../pages/Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import Edit from './Edit';
import { addMark } from '../../api/markapi';
import { addStudentMark, getStudentMark } from '../../store/teacherAction';


const Marks = (userid) => {

  const studentInfo = ["id", "firstName", "lastName", "mark"];
  const dispatch = useDispatch();
  const { allstudent_mark, subjects } = useSelector(state => state.teacher);
  const { allstudent } = useSelector(state => state.user);
  const initialMark = {
    mark: -1,
    student: "",
    subject: subjects
  }

  const [mark, setMark] = useState(initialMark)

  const handleId = (value) => {
    setMark({
      mark: -1,
      student: value.target.options[value.target.selectedIndex].text,
      subject: subjects
    })
  };

  const handleAdd = () => {
    dispatch(addStudentMark(mark))
    window.location.reload();
  }

  const s_markId = allstudent_mark?.result?.map(el => el.student?._id)
  var allS_id = allstudent?.filter((el) => !s_markId?.includes(el._id))

  return (
    <div className="col-9">

      <div className="input-group">
        <select className="custom-select" id="inputGroupSelect04" onClick={handleId}>
          {allS_id?.map((row, index) => <option value={index} > {row._id}</option>)}
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" onClick={handleAdd}>Add Mark</button>
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


          {allstudent_mark?.result?.map((row, index) => <tr><td>{row.student?._id}</td>
            <td>{row.student?.firstName}</td>
            <td>{row.student?.lastName}</td>
            <td> <Edit el={row.mark} id={row._id} name="mark" choice="marks" index={index} /></td>

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



export default Marks
