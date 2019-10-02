import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Users from './Users'
import Subscription from './Subscription'
import Devices from './Devices'
import '../styles/page-content.css'
import '../styles/sidebar-layout.css'

export default class PageContent extends React.Component {

    constructor(props){
        super(props);
        this.state={}
    }

    

    render() {
        return(
            <BrowserRouter>
            <div className='page-container'>
                <div className='sidebar-container'>
                    <ul className='sidebar-list'>
                        <Link to='/'><li>Users</li></Link>
                        <Link to='subscription'><li>Subscription</li></Link>
                        <Link to='devices'><li>Devices</li></Link>
                    </ul> 
                </div>
                <div className="page-content">
                <Switch>
                    <Route path="/" component={Users} exact />
                    <Route path="/subscription" component={Subscription}/>
                    <Route path="/devices" component={Devices}/>
                </Switch>
                </div>
            </div>
            </BrowserRouter>
        );
    }

}