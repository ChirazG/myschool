import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, FormControl, Spinner, Alert } from 'react-bootstrap';
import { newStudentRegister } from '../store/registerAction';

const Register = () => {
    const initialStudent = {
        firstName: "",
        lastName: "",
        gender: "",
        birthday: "",
        lastyear: {
            succeeded: false,
            failed: false
        },
        livewith: {
            mother: false,
            father: false,
            both: false,
            other: false,
        },
        phone: "",
        adresse: "",
        email: "",
        password: ""
    };
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [student, setStudent] = useState(initialStudent)

    const { isLoading, status, message } = useSelector(state => state.register)

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);
        dispatch(newStudentRegister(student))
    };


    return (
        <div className='register'>
            <div>
                <h3 className='title'>Student Information</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className='userinfo'>
                    <Row><Col>
                        {message && <Alert variant={status == "success" ? "success" : "danger"}>{message}</Alert>}
                    </Col></Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                name="firstName" value={student.firstName} onChange={handleChange}
                                type="text"
                                placeholder="First name"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                name="lastName" value={student.lastName} onChange={handleChange}
                                type="text"
                                placeholder="Last name"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" required>
                        <Form.Group as={Col} md="4" >
                            <Form.Check
                                inline
                                label="Male"
                                name="gender"
                                type="radio"
                                id='male'

                                value={student.gender}
                                onClick={() => { student.gender = "male" }}

                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Check
                                inline
                                label="Female"
                                name="gender"
                                type="radio"
                                id='female'
                                value={student.gender}
                                onClick={() => { student.gender = "female" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md="4" controlId="formGridAddress1">
                            <label className="date" for="start">Birth day</label>
                            <input className="input" type="date" id="start" name="birthday"
                                value={student.birthday} onChange={handleChange}
                                min="2000-01-01" max="2100-12-31" required />

                        </Form.Group>
                    </Row>

                    <Form.Label>Living with:</Form.Label>
                    <Form.Group as={Row} className="mb-4">

                        <Form.Group as={Col} md="3" >
                            <Form.Check
                                type="radio"
                                label="Father"
                                name="livewith" value={student.livewith}
                                onClick={() => { student.livewith = "father" }}
                                id="formHorizontalRadios1"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Check
                                type="radio"
                                label="Mother"
                                name="livewith" value={student.livewith}
                                onClick={() => { student.livewith = "mother" }}
                                id="formHorizontalRadios2"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Check
                                type="radio"
                                label="Both"
                                name="livewith" value={student.livewith}
                                onClick={() => { student.livewith = "both" }}
                                id="formHorizontalRadios3"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Check
                                type="radio"
                                label="Other"
                                name="livewith" value={student.livewith}
                                onClick={() => { student.livewith = "other" }}
                                id="formHorizontalRadios3"
                            />
                            <FormControl aria-label="Text input with radio button" />
                        </Form.Group>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group className="mb-3" as={Col} md="4" controlId="formGridAddress1">
                            <label className="date" for="start">Situation last year: </label>
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Check
                                type="radio"
                                label="Succeeded"
                                name="lastyear" value={student.lastyear}
                                onClick={() => { student.lastyear = "succeeded" }}
                                id="formHorizontalRadios1"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Check
                                type="radio"
                                label="Failed"
                                name="lastyear" value={student.lastyear}
                                onClick={() => { student.lastyear = "succeeded" }}
                                id="formHorizontalRadios1"
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3" controlId="formGridAddress2">


                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="phone" name="phone" value={student.phone} onChange={handleChange} placeholder="Phone " required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid phone number.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="adresse" value={student.adresse} onChange={handleChange} placeholder="Street/state/city/zip" required />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" value={student.email} onChange={handleChange} placeholder="user@gmail.com" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" name="password" value={student.password} onChange={handleChange} placeholder="****" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Password.
                            </Form.Control.Feedback>
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must be 8-20 characters long and must not contain spaces or emoji.
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Submit</Button>
                    {isLoading && <Spinner variant="info" animation="border"></Spinner>}

                </Form>
            </div>
        </div>
    )
}

export default Register