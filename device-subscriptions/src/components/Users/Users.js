import React from 'react';
import axios from "axios";
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

export default class Users extends React.Component {

    constructor(props){
        super(props);
        this.state={
            userData: [],
            alert: {
                type: '',
                message: ''
            },
            showEditModal: {
                show: false,
                data: {}
            }
        }
        this.userData = []
        this.getUsers = this.getUsers.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.handleUserCreated = this.handleUserCreated.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleUserUpdated = this.handleUserUpdated.bind(this);
        this.handleModalClosed = this.handleModalClosed.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios.get('http://localhost:5000/api/users')
        .then(ret => {
            // console.log('User Data: ',ret.data.data)
            //this.userData = ret.data.data
            this.setState({userData: ret.data.data})
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

    handleEditUser(data) {
        const m = {
            show: true,
            data: data
        };
        this.setState({showEditModal: m});
        // console.log('State Changed', this.state.showEditModal);
    }

    handleUserCreated(data) {
        this.handleAlert(data);
        this.getUsers();
    }

    handleUserUpdated(data) {
        this.handleAlert(data);
        this.getUsers();
    }

    handleDelete(user) {
        // console.log('Delete User Id: ', user);
        // let confirm = confirm("Are you sure you want to Delete User: ", user.name);
        if ( window.confirm(`Are you sure you want to Delete User: ${user.name}`) ) {
            axios.delete(`http://localhost:5000/api/users/${user.id}`)
            .then(res => {
                // console.log('User Delete Response: ',res.data)
                if ( res.data.message === 'deleted' ) {
                    this.handleAlert({type: 'success', message: 'User Deleted Successfully'});
                    this.getUsers();
                } else {
                    this.handleAlert({type: 'error', message: 'Something went wrong'});
                }
            })
        }
    }

    render() {
        // console.log('User Render',this.userData);
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
                    <h2 className="d-inline-flex">Users</h2>
                    {/* <button className="btn btn-sm btn-primary d-inline-flex ml-2" onClick={handleShow}>Add New</button> */}
                    {/* <Button variant="primary" size="sm" onClick={handleShow}>Add New</Button> */}
                    <AddUserModal handleSuccess={this.handleUserCreated} />
                </div>
                {alert}
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th width="100"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userData.map((obj, index) => {
                            return (
                               <tr key={obj.id}>
                                   <td>{index + 1}</td>
                                   <td>{obj.name}</td>
                                   <td>{obj.email}</td>
                                   <td>{obj.username}</td>
                                   <td>
                                       <button className="btn btn-sm btn-info" onClick={() => this.handleEditUser(obj)}><i className="fas fa-edit"></i></button>
                                       <button className="btn btn-sm btn-danger ml-2" onClick={() => this.handleDelete(obj)}><i className="fas fa-trash-alt"></i></button>
                                   </td>
                               </tr> 
                            );
                        })}
                    </tbody>
                </table>
                <EditUserModal open={this.state.showEditModal.show} data={this.state.showEditModal.data} handleSuccess={this.handleUserUpdated} modalClosed={this.handleModalClosed} />
            </div>
        );
    }

}