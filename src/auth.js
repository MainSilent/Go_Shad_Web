import React from 'react';
import axios from 'axios';

class Auth extends React.Component {
    constructor(){
        super ()
        this.state = {
            signInData: {},
            sendCode: false,
            auth: "",
            number: "",
            code: "",
            btn: "Send Number"
        }
        this.number = this.number.bind(this);
        this.code = this.code.bind(this);
        this.login = this.login.bind(this);
    }
    number(event) {
        if(/^(\s*|\d+)$/.test(event.target.value))
            this.setState({number: event.target.value})
    }
    code(event) {
        if(/^(\s*|\d+)$/.test(event.target.value))
            this.setState({code: event.target.value});
    }
    login() {
        if(!this.state.sendCode)
        {
            if(this.state.number.length === 11 && /^(\+98|0098|98|0)?9\d{9}$/.test(this.state.number)) {
                axios.post('http://localhost/login?phone_number=' + this.state.number.replace(/0/, "98"))
                .then((res) => {
                  console.log(res.data)
                    if(res.data.status === "OK" && res.data.status_det === "OK") {
                        this.setState({btn: "Send Code"})
                        this.setState({
                            signInData: res.data,
                            sendCode: true
                        })
                        document.getElementById("code").style.display = "block"
                    } else this.setState({btn: "Error: try again"})
                })
                .catch(err => console.log(err))
                this.setState({btn: "Send Number..."})
            }
            else this.setState({btn: "Wrong format"})
        }
        else {
            if(this.state.code.length === 6) {
                axios.post(`http://localhost/signIn?phone_number=${this.state.number.replace(/0/, "98")}&code=${this.state.code}&data=${JSON.stringify(this.state.signInData)}`)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.status !== "OK" && res.data.status_det !== "OK")
                        this.setState({btn: "Error: try again"})
                    else if(res.data.status !== "OK")
                        this.setState({btn: "Invalid: try again"})
                    else 
                        this.props.chAuth(res.data.data.auth)
                })
                .catch(err => console.log(err))
                this.setState({btn: "Send Code..."})
            }
            else this.setState({btn: "Wrong format"})
        }
    }
    render() {
        return (
        <div className="form">
            <div className="forceColor"></div>
            <div className="topbar">
                <img src="assets/images/icon.png" alt="گشاد"/>
                <div className="spanColor"></div>
                <input onChange={this.number} value={this.state.number} type="text" maxLength="11" className="input" id="number" placeholder="Phone Number"/>
                <input onChange={this.code} value={this.state.code} type="text" maxLength="6" className="input" id="code" placeholder="Verification Code"/>
            </div>
            <button className="submit" id="submit" onClick={this.login}>{this.state.btn}</button>
            <a href="#sdf" target="_blank">ایا این وبسایت امن هست؟</a>
        </div>
        )
    }
}

export default Auth