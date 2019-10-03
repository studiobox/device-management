import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function AddDeviceModal(props) {
    const [show, setShow] = useState(false);
    const subscriptions = [
        {id: 1, title: '10 Days'},
        {id: 2, title: '20 Days'},
        {id: 3, title: '30 Days'}
    ];
    const deviceData = {
        deviceId: '',
        deviceName: '',
        deviceStatus: '',
        subscriptionId: ''
    };
    const handleClose = () => {
        // console.log('Modal Closed!');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const createDevice = function() {
        // console.log('Create Device: ', deviceData);
        axios.post('http://localhost:5000/api/devices', deviceData)
        .then(res => {
            // console.log('Device Created: ',res.data)
            if ( res.data.message === 'success' ) {
                props.handleSuccess({type: 'success', message: 'Device Created Successfully'});
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
                        <label>Device ID</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Device ID"
                            onChange={(e) => { deviceData.deviceId = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Device Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Device Name"
                            onChange={(e) => { deviceData.deviceName = e.target.value }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Device Status</label>
                        <select className="form-control" defaultValue="0" onChange={(e) => { deviceData.deviceStatus = e.target.value }}>
                            <option value="1">Active</option>
                            <option value="0">Deactivated</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Subscription</label>
                        <select className="form-control" defaultValue="" onChange={(e) => { deviceData.subscriptionId = e.target.value }}>
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
                    <Button variant="primary" onClick={createDevice}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddDeviceModal;
// render (<AddUserModal />);