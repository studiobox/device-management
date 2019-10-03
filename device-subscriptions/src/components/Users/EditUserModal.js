import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function EditUserModal(props) {
    const [show, setShow] = useState(props.open);
    let userData = {
        name: '',
        email: '',
        username: ''
    };
    const handleData = (data) => {
        userData = data;
        userData.password = '';
    }
    const handleClose = () => {
        // console.log('Modal Closed!');
        props.modalClosed();
        setShow(false);
    };
    // const handleSave = () => {
    //     props.createUser(userData);
    //     setShow(false);
    // }
    const handleShow = () => setShow(true);

    useEffect(() => {
        if( props.open ) {
            handleData(props.data);
            handleShow();
        }
    });

    const updateUser = function() {
        // console.log('Update User: ', userData);
        axios.patch(`http://localhost:5000/api/users/${props.data.id}`, userData)
        .then(res => {
            // console.log('User Updated: ',res.data)
            if ( res.data.message === 'success' ) {
                props.handleSuccess({type: 'success', message: 'User Updated Successfully'});
                props.modalClosed();
                handleClose();
            } else {
                console.log('Error occured');
            }
        })
    }    

    return (
        <>
            <button className="btn btn-sm btn-primary d-inline-flex ml-2" onClick={handleShow}>Add New</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            defaultValue={props.data.name}
                            onChange={(e) => { userData.name = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            defaultValue={props.data.email}
                            onChange={(e) => { userData.email = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            defaultValue={props.data.username}
                            onChange={(e) => { userData.username = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            defaultValue=""
                            onChange={(e) => { userData.password = e.target.value }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={updateUser}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserModal;