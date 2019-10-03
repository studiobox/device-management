import React from 'react';
import '../styles/header-layout.css';
import Auth from '../Auth';
import {Redirect, withRouter} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export class Header extends React.Component {

    constructor(props){
        super(props);
        this.state={
            user: Auth.getUser()
        }
    }

    render() {
        return(
            // <nav className="navbar navbar-light bg-light header-container">
            //      <span className="mb-0 h2">Name</span>
            // </nav>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top app-navbar">
                <a className="navbar-brand" href="/">Device Subscription App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item"><a className="nav-link" onClick={() => {
                            Auth.logout(() => {
                                this.props.history.push('/login');
                            })
                        }}>Logout</a></li> */}
                        <NavDropdown title={this.state.user.name} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => {
                                Auth.logout(() => {
                                    this.props.history.push('/login');
                                })
                            }}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Welcome {this.state.user.name}!
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/">Logout</a>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    }

}

export default withRouter(Header);