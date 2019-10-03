import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function EditDeviceModal(props) {
    const [show, setShow] = useState(props.open);
    const subscriptions = [
        {id: 1, title: '10 Days'},
        {id: 2, title: '20 Days'},
        {id: 3, title: '30 Days'}
    ];
    let deviceData = {
        deviceId: '',
        deviceName: '',
        deviceStatus: '',
        subscriptionId: ''
    };
    const handleData = (data) => {
        deviceData = data;
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

    const updateDevice = function() {
        // console.log('Update User: ', deviceData);
        axios.patch(`http://localhost:5000/api/devices/${props.data.id}`, deviceData)
        .then(res => {
            // console.log('Device Updated: ',res.data)
            if ( res.data.message === 'success' ) {
                props.handleSuccess({type: 'success', message: 'Device Updated Successfully'});
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
                        <label>Device ID</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Device ID"
                            defaultValue={props.data.deviceId}
                            onChange={(e) => { deviceData.deviceId = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Device Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Device Name"
                            defaultValue={props.data.deviceName}
                            onChange={(e) => { deviceData.deviceName = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Device Status</label>
                        <select className="form-control" defaultValue={props.data.deviceStatus} onChange={(e) => { deviceData.deviceStatus = e.target.value }}>
                            <option value="1">Active</option>
                            <option value="0">Deactivated</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Subscription</label>
                        <select className="form-control" defaultValue={props.data.subscriptionId} onChange={(e) => { deviceData.subscriptionId = e.target.value }}>
                            <option value="">Select Subscription</option>
                        {subscriptions.map((obj, index) => {
                            return (
                                <option value={obj.id} key={obj.id}>{obj.title}</option>
                            );
                        })}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={updateDevice}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditDeviceModal;