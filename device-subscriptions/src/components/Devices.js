import React from 'react';
import axios from "axios";

export default class Devices extends React.Component {

    constructor(props){
        super(props);
        this.state={
            deviceData: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/devices')
        .then(ret => {
            console.log('Device Data: ',ret)
            this.setState({deviceData: ret.data.data})
        })
    }
    

    render() {
        console.log('Devices Render');
        return(
            <div className="container-fluid">
                <div className="page-title">
                    <h2 className="d-inline-flex">Devices</h2>
                    <button className="btn btn-sm btn-primary d-inline-flex ml-2">Add New</button>
                </div>
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
                                    <button className="btn btn-sm btn-info"><i className="fas fa-edit"></i></button>
                                    <button className="btn btn-sm btn-danger ml-2"><i className="fas fa-trash-alt"></i></button>
                                </td>
                            </tr> 
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}