import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import GLOBALS from "../Globals";


class PrivateRoute extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            loading: true,
            isAuthenticated: false,
            email: '',
            name: '',
            role:''
        };
    }

    componentDidMount() {
        this.authenticate();
    }

    render() {
        if (this.state.loading) {
            return null;
        }
        if (!this.state.isAuthenticated) {
            return <Redirect exact to="/login" />;
        }
        if(this.props.role!==undefined && this.props.role!==this.state.role)
        {
            if(this.state.role==="student")
                return <Redirect exact to="/student_home" />; //restricted per role
            return <Redirect exact to="/instructor_home" />;
        }
        const Component = this.props.component;
        return <Component {...this.props} name={this.state.name} role={this.state.role} email={this.state.email} />;
    }

    authenticate() {
        if (!localStorage.hasOwnProperty('token')) {
            this.setState({
                loading: false,
            });
        }
        axios
            .post(GLOBALS.BASE_URL + 'verify',
                localStorage.getItem('token')
            )
            .then(
                (res) => {
                    // alert("in private route"+res.data["role"]+" "+res.data["email"]);
                    //role=false
                    this.setState({
                        loading: false,
                        isAuthenticated: true,
                        email: res.data["email"],
                        name: res.data["name"],
                        role : res.data["role"]
                    });
                },
                (err) => {
                    alert("private route failed");
                    this.setState({
                        loading: false
                    });
                }
            );
    }
}

export default PrivateRoute;