import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function AddUserModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        // console.log('Modal Closed!');
        setShow(false);
    };
    // const handleSave = () => {
    //     props.createUser(userData);
    //     setShow(false);
    // }
    const handleShow = () => setShow(true);

    const createUser = function() {
        // console.log('Create User: ', userData);
        axios.post('http://localhost:5000/api/users', userData)
        .then(res => {
            // console.log('User Created: ',res.data)
            if ( res.data.message === 'success' ) {
                props.handleSuccess({type: 'success', message: 'User Created Successfully'});
                setShow(false);
            } else {
                console.log('Error occured');
            }
        })
    }
    const userData = {
        name: '',
        email: '',
        username: '',
        password: ''
    };

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
                            onChange={(e) => { userData.name = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) => { userData.email = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            onChange={(e) => { userData.username = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) => { userData.password = e.target.value }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={createUser}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUserModal;
// render (<AddUserModal />);