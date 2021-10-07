import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/userAction';


const AddModal = ({ user, role }) => {
    // const {user} = useSelector(state => state.user)
    const [newInfo, setNewInfo] = useState({
        phone: user.phone,
        adresse: user.adresse,
        email: user.email
    })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setNewInfo({ ...newInfo, [e.target.name]: e.target.value })

    }
    const handleSave = () => {
        dispatch(updateUser(user._id, newInfo, role))
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="outline-info" onClick={handleShow}>Update information</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your information!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control placeholder="phone" name="phone" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2" style={{ background: role == "admin" ? "transparent" : "none", fontSize: role == "admin" ? 0 : "none" }}>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control placeholder="adresse" name="adresse" onChange={handleChange} style={{ background: role == "admin" ? "transparent" : "none", fontSize: role == "admin" ? 0 : "none", border: role == "admin" ? "none" : "null" }} />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder="email" name="email" onChange={handleChange} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddModal