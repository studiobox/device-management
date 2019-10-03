import React from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/login-layout.css'
import Auth from '../Auth';
import axios from 'axios';

export default class login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            formValues: {
              email: "",
              password: ""
            },
            redirect: false,
            alert: {
                type: '',
                message: ''
            }
        };
        
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/target' />
        }
    }

    handleChange = ({ target }) => {
        const { formValues } = this.state;
        formValues[target.name] = target.value;
        this.setState({ formValues });
        //this.handleValidation(target);
    };
    
    handleSubmit = event => {
        // const { history } = this.props;
        event.preventDefault();
        const { formValues } = this.state;
        // console.log('Event: ',event,'formValues: ',formValues,'formValidity: ',formValidity);
        // if(formValues.email === 'root' && formValues.password === 'root') {
        //     this.setRedirect();
        // }
        // history.push('/');
        // console.log('event: ', this.state.formValues);

        axios.post('http://localhost:5000/api/users/login', formValues)
        .then(res => {
            // console.log('Login User: ',res)
            if ( res.data.message === 'success' ) {
                if ( Auth.login(res.data.data) ) {
                    this.props.history.push('/');
                }
            } else {
                const alert = {
                    type: res.data.data,
                    message: res.data.message
                };
                this.setState({alert: alert})

                setTimeout(this.closeAlert,5000);
            }
        })

        // Auth.login(() => {
            
        //     return this.props.history.push('/');
        // })
    };

    render() {
        const { formValues } = this.state;
        // console.log('this.state.alert: ',this.state.alert);
        let alert;
        if ( this.state.alert.type !== '' ) {
            alert = <div className={'alert ' + ((this.state.alert.message === 'failed') ? 'alert-danger' : '')} role="alert">
                <p>{this.state.alert.type}</p>
            </div>;
        } else {
            alert = null;
        }
        return(
            <div className="container login-container">
                {this.renderRedirect()}
                <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Login Form</h1>
                    </div>
                </div>
                {alert}
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    name="email"
                                    className='form-control'
                                    placeholder="Enter Email"
                                    onChange={this.handleChange}
                                    value={formValues.email}
                                />
                               
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className='form-control'
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={formValues.password}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                
            </div>
        );
    }

}