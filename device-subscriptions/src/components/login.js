import React from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/login-layout.css'
import Header from './Header'

export default class login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            formValues: {
              username: "",
              password: ""
            },
            redirect: false
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
        const { history } = this.props;
        event.preventDefault();
        const { formValues, formValidity } = this.state;
        console.log('Event: ',event,'formValues: ',formValues,'formValidity: ',formValidity);
        if(formValues.email === 'root' && formValues.password === 'root') {
            this.setRedirect();
        }
        history.push('/');
    };

    render() {
        const { formValues } = this.state;
        return(
            <div className="container login-container">
                {this.renderRedirect()}
                <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Login Form</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input
                                    name="email"
                                    className='form-control'
                                    placeholder="Enter User name"
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