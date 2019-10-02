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
        axios.get('http://192.168.0.179:5000/api/subscriptions')
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subscriptionData.map((obj) => {
                            return (
                               <tr key={obj.id}>
                                   <td>{obj.id}</td>
                                   <td>{obj.title}</td>
                                   <td>{obj.created_at}</td>
                               </tr> 
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}