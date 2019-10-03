import React from 'react';
import axios from "axios";
import AddDeviceModal from './AddDeviceModal';
import EditDeviceModal from './EditDeviceModal';

export default class Devices extends React.Component {

    constructor(props){
        super(props);
        this.state={
            deviceData: [],
            alert: {
                type: '',
                message: ''
            },
            showEditModal: {
                show: false,
                data: {}
            }
        }
        this.getDevices = this.getDevices.bind(this);
        this.handleDeviceCreated = this.handleDeviceCreated.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditDevice = this.handleEditDevice.bind(this);
        this.handleDeviceUpdated = this.handleDeviceUpdated.bind(this);
        this.handleModalClosed = this.handleModalClosed.bind(this);
    }

    componentDidMount() {
        this.getDevices();
    }

    getDevices() {
        axios.get('http://localhost:5000/api/devices')
        .then(ret => {
            // console.log('Device Data: ',ret)
            this.setState({deviceData: ret.data.data})
        })
    }

    handleAlert(data) {
        const alert = {
            type: data.type,
            message: data.message
        };
        this.setState({alert: alert})

        setTimeout(this.closeAlert,5000);
    }

    closeAlert() {
        const alert = {type: '', message: ''};
        this.setState({alert: alert});
    }

    handleModalClosed() {
        this.setState({showEditModal: {show: false, data: {}}})
    }

    handleEditDevice(data) {
        const m = {
            show: true,
            data: data
        };
        this.setState({showEditModal: m});
        // console.log('State Changed', this.state.showEditModal);
    }

    handleDeviceCreated(data) {
        this.handleAlert(data);
        this.getDevices();
    }

    handleDeviceUpdated(data) {
        this.handleAlert(data);
        this.getDevices();
    }

    handleDelete(device) {
        // console.log('Delete Device Id: ', device);
        // let confirm = confirm("Are you sure you want to Delete User: ", user.name);
        if ( window.confirm(`Are you sure you want to Delete Device: ${device.deviceId}`) ) {
            axios.delete(`http://localhost:5000/api/devices/${device.id}`)
            .then(res => {
                console.log('Device Delete Response: ',res.data)
                if ( res.data.message === 'deleted' ) {
                    this.handleAlert({type: 'success', message: 'Device Deleted Successfully'});
                    this.getDevices();
                } else {
                    this.handleAlert({type: 'error', message: 'Something went wrong'});
                }
            })
        }
    }
    

    render() {
        // console.log('Devices Render');
        let alert;
        if ( this.state.alert.type !== '' ) {
            alert = <div className={'alert ' + ((this.state.alert.type === 'success') ? 'alert-success' : '')} role="alert">
                <p>{this.state.alert.message}</p>
            </div>;
        } else {
            alert = null;
        }
        return(
            <div className="container-fluid">
                <div className="page-title">
                    <h2 className="d-inline-flex">Devices</h2>
                    {/* <button className="btn btn-sm btn-primary d-inline-flex ml-2">Add New</button> */}
                    <AddDeviceModal handleSuccess={this.handleDeviceCreated} />
                </div>
                {alert}
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Device Id</th>
                            <th scope="col">Device Name</th>
                            <th scope="col">Device Satus</th>
                            <th scope="col">Registered Date</th>
                            <th scope="col">Subscription Activation</th>
                            <th scope="col">Subscription Id</th>
                            <th width="100"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deviceData.map((obj, index) => {
                            return (
                            <tr key={obj.id}>
                                <td>{index + 1}</td>
                                <td>{obj.deviceId}</td>
                                <td>{obj.deviceName ? obj.deviceName : 'N/A'}</td>
                                <td>{obj.deviceStatus ? 'Active' : 'Deactivated'}</td>
                                <td>{obj.registeredDate}</td>
                                <td>{obj.subscriptionActivation}</td>
                                <td>{obj.subscriptionTitle}</td>
                                <td>
                                    <button className="btn btn-sm btn-info" onClick={() => this.handleEditDevice(obj)}><i className="fas fa-edit"></i></button>
                                    <button className="btn btn-sm btn-danger ml-2" onClick={() => this.handleDelete(obj)}><i className="fas fa-trash-alt"></i></button>
                                </td>
                            </tr> 
                            );
                        })}
                    </tbody>
                </table>
                <EditDeviceModal open={this.state.showEditModal.show} data={this.state.showEditModal.data} handleSuccess={this.handleDeviceUpdated} modalClosed={this.handleModalClosed} />
            </div>
        );
    }

}