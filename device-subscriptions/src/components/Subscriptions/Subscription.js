import React from 'react';
import axios from "axios";
import AddSubscriptionModal from './AddSubscriptionModal';
import EditSubscriptionModal from './EditSubscriptionModal';

export default class Subscription extends React.Component {

    constructor(props){
        super(props);
        this.state={
            subscriptionData: [],
            alert: {
                type: '',
                message: ''
            },
            showEditModal: {
                show: false,
                data: {}
            }
        }

        this.getSubscriptions = this.getSubscriptions.bind(this);
        this.handleSubscriptionCreated = this.handleSubscriptionCreated.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditSubscription = this.handleEditSubscription.bind(this);
        this.handleSubscriptionUpdated = this.handleSubscriptionUpdated.bind(this);
        this.handleModalClosed = this.handleModalClosed.bind(this);
    }

    componentDidMount() {
        this.getSubscriptions();
    }

    getSubscriptions() {
        axios.get('http://localhost:5000/api/subscriptions')
        .then(ret => {
            // console.log('Subscription Data: ',ret)
            //this.userData = ret.data.data
            this.setState({subscriptionData: ret.data.data})
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

    handleEditSubscription(data) {
        const m = {
            show: true,
            data: data
        };
        this.setState({showEditModal: m});
        // console.log('State Changed', this.state.showEditModal);
    }

    handleSubscriptionCreated(data) {
        this.handleAlert(data);
        this.getSubscriptions();
    }

    handleSubscriptionUpdated(data) {
        this.handleAlert(data);
        this.getSubscriptions();
    }

    handleDelete(subscription) {
        // console.log('Delete Subscription Id: ', subscription);
        // let confirm = confirm("Are you sure you want to Delete User: ", user.name);
        if ( window.confirm(`Are you sure you want to Delete Device: ${subscription.title}`) ) {
            axios.delete(`http://localhost:5000/api/subscriptions/${subscription.id}`)
            .then(res => {
                console.log('Subscription Delete Response: ',res.data)
                if ( res.data.message === 'deleted' ) {
                    this.handleAlert({type: 'success', message: 'Subscription Deleted Successfully'});
                    this.getSubscriptions();
                } else {
                    this.handleAlert({type: 'error', message: 'Something went wrong'});
                }
            })
        }
    }

    render() {
        // console.log('Subscription Render');
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
                    <h2 className="d-inline-flex">Subscriptions</h2>
                    {/* <button className="btn btn-sm btn-primary d-inline-flex ml-2">Add New</button> */}
                    <AddSubscriptionModal handleSuccess={this.handleSubscriptionCreated} />
                </div>
                {alert}
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Created At</th>
                            <th width="100"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subscriptionData.map((obj, index) => {
                            return (
                               <tr key={obj.id}>
                                   <td>{index + 1}</td>
                                   <td>{obj.title}</td>
                                   <td>{obj.created_at}</td>
                                   <td>
                                       <button className="btn btn-sm btn-info" onClick={() => this.handleEditSubscription(obj)}><i className="fas fa-edit"></i></button>
                                       <button className="btn btn-sm btn-danger ml-2" onClick={() => this.handleDelete(obj)}><i className="fas fa-trash-alt"></i></button>
                                   </td>
                               </tr> 
                            );
                        })}
                    </tbody>
                </table>
                <EditSubscriptionModal open={this.state.showEditModal.show} data={this.state.showEditModal.data} handleSuccess={this.handleSubscriptionUpdated} modalClosed={this.handleModalClosed} />
            </div>
        );
    }

}