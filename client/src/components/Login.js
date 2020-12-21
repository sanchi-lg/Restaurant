import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginid: "", password: ""
        }
    }

    submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/login", this.state)

            .then(res => {
                console.log(res.data);
                if (res.data.err == 0) {
                    localStorage.setItem('name', res.data.uid.name)
                    localStorage.setItem("loginid", res.data.uid.loginid)
                    this.props.history.replace("/")

                }
                else {
                    alert(res.data.mssg)

                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    handle = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })

    }

    componentDidMount() {
        if (localStorage.getItem('loginid')) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div style={{ width: "70%", margin: "auto", marginTop: "80px" }}>
                <form className="new" onSubmit={this.submit}>
                    <fieldset style={{ padding: "5px", borderWidth: "0.1px", borderRadius: "3px" }}>
                        <legend style={{ marginTop: "10px", marginBottom: "17px", color: "blue", fontSize: "large" }}>Login</legend>                   <div>
                            <label>Login ID</label>
                            <input type="text" name="loginid" onChange={this.handle} required />
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" name="password" onChange={this.handle} required />
                        </div>

                        <button>Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Login
