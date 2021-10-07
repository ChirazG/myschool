import React, { useEffect, useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../store/userAction';
import { Col, Row } from 'react-bootstrap';

function Projectsearch({ allusers, handleSearch }) {

  const dispatch = useDispatch()
  const [search, setSearch] = useState()
  const handlechange = (e) => {
    const usersearch = allusers.filter((el) => (el.firstName).toLowerCase().includes((e.target.value).toLowerCase())

      || (el.lastName).toLowerCase().includes((e.target.value).toLowerCase())

    )

    setSearch(usersearch)
  }

  useEffect(() => {


  }, [])
  const handelClick = (event) => {
    event.preventDefault();
    handleSearch(search)
  }

  return (
    <div>
      <Row >
        <Col xs lg="2">
          {/* 1 of 3 */}
        </Col>
        <Col >
          <form className="form-inline" style={{ alignContent: "center", margin_bottom: "2%" }}>
            <input
              className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search"
              onChange={handlechange}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={handelClick}>Search</button>
          </form>
        </Col>
        <Col xs lg="2">
          {/* 3 of 3 */}
        </Col>
      </Row>
    </div>
  )
}

export default Projectsearch