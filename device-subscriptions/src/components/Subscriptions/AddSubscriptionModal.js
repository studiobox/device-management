import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function AddSubscriptionModal(props) {
    const [show, setShow] = useState(false);
    const subscriptionData = {
        title: ''
    };
    const handleClose = () => {
        // console.log('Modal Closed!');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const createSubscription = function() {
        // console.log('Create Subscription: ', subscriptionData);
        axios.post('http://localhost:5000/api/subscriptions', subscriptionData)
        .then(res => {
            // console.log('Subscription Created: ',res.data)
            if ( res.data.message === 'success' ) {
                props.handleSuccess({type: 'success', message: 'Subscription Created Successfully'});
                setShow(false);
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
                        <label>Subscription Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Subscription Title"
                            onChange={(e) => { subscriptionData.title = e.target.value }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={createSubscription}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSubscriptionModal;
// render (<AddUserModal />);