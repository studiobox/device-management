import axios from 'axios';
class Auth {
    constructor() {
        if ( this.getUser() ) {
            this.loggedInUser = this.getUser();
            this.authenticated = true;
        } else {
            this.loggedInUser = null;
            this.authenticated = false;
        }
    }

    setUser(user) {
        if ( !localStorage.getItem('DSUSER') ) {
            localStorage.setItem('DSUSER', JSON.stringify(user))
            this.loggedInUser = user;
            return true;
        }
        this.loggedInUser = null;
        return false;
    }

    getUser() {
        if ( !localStorage.getItem('DSUSER') ) {
            return false;
        }
        return JSON.parse(localStorage.getItem('DSUSER'));
    }

    removeUser() {
        if ( localStorage.getItem('DSUSER') ) {
            localStorage.removeItem('DSUSER');
            this.loggedInUser = null;
            return true;
        }
        return false;
    }
    
    login(user) {
        if ( this.setUser(user) ) {
            this.authenticated = true;
            return this.authenticated;
        } else {
            this.authenticated = false;
            return this.authenticated;
        }
    }

    // login(cb) {
    //     axios.post('http://localhost:5000/api/users/login')
    //     .then(res => {
    //         console.log('Login User: ',res)
    //         if ( res.data.message === 'success' ) {
    //             if ( this.setUser(res.data.data) ) {
    //                 this.authenticated = true;
    //                 return true;
    //             } else {
    //                 this.authenticated = false;
    //                 return false;
    //             }
    //         }
    //     })
    //     cb();
    // }

    logout(cb) {
        if ( this.removeUser() ) {
            this.authenticated = false;
        }
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();