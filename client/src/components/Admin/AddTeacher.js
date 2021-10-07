import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Row, Col, InputGroup, Button, FormControl, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newTeacherRegister } from '../../store/registerAction';

const AddTeacher = () => {
    const initialTeacher = {
        firstName: "",
        lastName: "",
        CIN: "",
        subject: "",
        phone: "",
        adresse: "",
        email: "",
        password: ""
    };
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [teacher, setTeacher] = useState(initialTeacher)

    const { isLoading, status, message } = useSelector(state => state.register)

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setTeacher({ ...teacher, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);
        dispatch(newTeacherRegister(teacher))
    };


    return (
        <div style={{ padding: "5%" }}>
            <div>
                <h3 className='title'>Teacher Information</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className='userinfo'>
                    <Row><Col>
                        {message && <Alert variant={status == "success" ? "success" : "danger"}>{message}</Alert>}
                    </Col></Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                name="firstName" value={teacher.firstName} onChange={handleChange}
                                type="text"
                                placeholder="First name"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                name="lastName" value={teacher.lastName} onChange={handleChange}
                                type="text"
                                placeholder="Last name"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>CIN</Form.Label>
                            <Form.Control
                                name="CIN" value={teacher.CIN} onChange={handleChange}
                                type="text"
                                placeholder="00000000"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                name="subject" value={teacher.subject} onChange={handleChange}
                                type="text"
                                placeholder="Subject"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Row className="mb-3" controlId="formGridAddress2">


                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="phone" name="phone" value={teacher.phone} onChange={handleChange} placeholder="Phone " required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid phone number.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="adresse" value={teacher.adresse} onChange={handleChange} placeholder="Street/state/city/zip" required />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" value={teacher.email} onChange={handleChange} placeholder="user@gmail.com" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" name="password" value={teacher.password} onChange={handleChange} placeholder="****" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Password.
                            </Form.Control.Feedback>
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must be 8-20 characters long and must not contain spaces or emoji.
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Add</Button>
                    {isLoading && <Spinner variant="info" animation="border"></Spinner>}

                </Form>


            </div>



        </div>
    )
};

export default AddTeacher;