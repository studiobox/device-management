import React from 'react';
import Header from '../components/Header'
import PageContent from '../components/PageContent'
import '../styles/landing-page-layout.css'

export default class LandingPage extends React.Component {

    constructor(props){
        super(props);
        this.state={}
    }

    render() {
        return(
            <div className='landing-page-container'>
                <Header/>
                <PageContent/>
            </div>
        );
    }

}