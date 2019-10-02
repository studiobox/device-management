import React from 'react';
import axios from "axios";

export default class Users extends React.Component {

    constructor(props){
        super(props);
        this.state={
            userData: []
        }
        this.userData = []
    }

    componentDidMount() {
        axios.get('http://192.168.0.179:5000/api/users')
        .then(ret => {
            console.log('User Data: ',ret.data.data)
            //this.userData = ret.data.data
            this.setState({userData: ret.data.data})
        })
    }

    render() {
        console.log('User Render',this.userData);
        return(
            <div className="container-fluid">
                <div className="page-title d-flex">
                    <h2>Users</h2>
                    <button className="btn btn-sm btn-primary ml-auto">Add New</button>
                </div>
                <table className="table table-bordered table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th width="100"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userData.map((obj) => {
                            return (
                               <tr key={obj.id}>
                                   <td>{obj.id}</td>
                                   <td>{obj.name}</td>
                                   <td>{obj.email}</td>
                                   <td>{obj.username}</td>
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