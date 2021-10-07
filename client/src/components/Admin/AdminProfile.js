import React from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminProfile = (props) => {
  const studentInfo = ["id", "First Name", "Last Name", "Gender", "Birthday", "Last year", "Live with", "Phone", "Adresse", "Email"];
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Admin Profile</h3>
      <div className="mb-3">
        <div className="row">
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search" value="" onChange="{handelchange}" />
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch}>Search</button>
            </form>
          </nav>
        </div>

      </div>

    </div>
  )
}

export default AdminProfile