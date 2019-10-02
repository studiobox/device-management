import React from 'react';
import '../styles/header-layout.css'

export default class Header extends React.Component {

    constructor(props){
        super(props);
        this.state={}
    }

    render() {
        return(
            // <nav className="navbar navbar-light bg-light header-container">
            //      <span className="mb-0 h2">Name</span>
            // </nav>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark app-navbar">
                <a className="navbar-brand" href="/">Device Subscription App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Welcome Admin!
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}