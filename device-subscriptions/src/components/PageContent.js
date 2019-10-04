import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Users from './Users/Users'
import Subscription from './Subscriptions/Subscription';
import Devices from './Devices/Devices'
import TestData from './TestData';
import '../styles/page-content.css'
import '../styles/sidebar-layout.css';
import { Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

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
                    <Nav className="flex-column sidebar">
                        <li className="nav-item"><NavLink className="nav-link" activeClassName='active' exact to='/'>Users</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to='/subscription'>Subscriptions</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to='/devices'>Devices</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to='/test-data'>Test Data</NavLink></li>
                    </Nav>
                </div>
                <div className="page-content">
                <Switch>
                    <Route path="/" component={Users} exact />
                    <Route path="/subscription" component={Subscription}/>
                    <Route path="/devices" component={Devices}/>
                    <Route path="/test-data" component={TestData}/>
                </Switch>
                </div>
            </div>
            </BrowserRouter>
        );
    }

}