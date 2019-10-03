import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function EditSubscriptionModal(props) {
    const [show, setShow] = useState(props.open);
    let subscriptionData = {
        title: ''
    };
    const handleData = (data) => {
        subscriptionData = data;
    }
    const handleClose = () => {
        // console.log('Modal Closed!');
        props.modalClosed();
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if( props.open ) {
            handleData(props.data);
            handleShow();
        }
    });

    const updateSubscription = function() {
        // console.log('Update Subscription: ', subscriptionData);
        axios.patch(`http://localhost:5000/api/subscriptions/${props.data.id}`, subscriptionData)
        .then(res => {
            // console.log('Subscription Updated: ',res.data)
            if ( res.data.message === 'success' ) {
                props.handleSuccess({type: 'success', message: 'Subscription Updated Successfully'});
                props.modalClosed();
                handleClose();
            } else {
                console.log('Error occured');
            }
        })
    }    

    return (
        <>
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
                            defaultValue={props.data.title}
                            onChange={(e) => { subscriptionData.title = e.target.value }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={updateSubscription}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditSubscriptionModal;