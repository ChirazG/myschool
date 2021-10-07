import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import '../../pages/Profile.css';
import userSlice from '../../store/userSlice';

const TimeTable = () => {
    const subjects = [
        { day: "8h->10h", monday: "Maths", tuesday: "Maths", wednesday: "Arabic", thursday: "English", friday: "French" },
        { day: "10h->12h", monday: "Arabic", tuesday: "English", wednesday: "Science", thursday: "Science", friday: "Sport" },
        { day: "13h->14h", monday: "French", tuesday: "French", wednesday: "Sport", thursday: "Sport", friday: "Option" },
        { day: "14h->16h", monday: "Theater", tuesday: "Drawing", wednesday: "Music", thursday: "Theater", friday: "Option" },

    ]
    const renderSubject = (subject, index) => {
        return (
            <tr key={index}>
                <td>{subject.day}</td>
                <td >{subject.monday}</td>
                <td>{subject.tuesday}</td>
                <td>{subject.wednesday}</td>
                <td>{subject.thursday}</td>
                <td>{subject.friday}</td>
            </tr>
        )
    }
    return (
        <div className="col-9">
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Day</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(renderSubject)}
                </tbody>
            </ReactBootStrap.Table>

        </div>
    )
}

export default TimeTable
