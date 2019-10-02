import React from 'react';
import axios from "axios";

export default class Subscription extends React.Component {

    constructor(props){
        super(props);
        this.state={
            subscriptionData: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/subscriptions')
        .then(ret => {
            console.log('Subscription Data: ',ret)
            //this.userData = ret.data.data
            this.setState({subscriptionData: ret.data.data})
        })
    }

    render() {
        console.log('Subscription Render');
        return(
            <div className="container-fluid">
                <div className="page-title">
                    <h2 className="d-inline-flex">Subscriptions</h2>
                    <button className="btn btn-sm btn-primary d-inline-flex ml-2">Add New</button>
                </div>
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