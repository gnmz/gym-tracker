import React, { Component } from 'react'
import LoginPage from '../pages/LoginPage/LoginPage'

class SignUp extends Component{
    state = {
        isLogged: false,
        isReg: false,
    }
    isLogged = () => {
        if (!this.state.isLogged) {
            this.setState({isLogged: true});
        }
    }
    logout = () => {
        if (this.state.isLogged) {
            this.setState({isLogged: false});
        }
    }
    isReg = () => {
        if (!this.state.isReg || !this.state.isLogged){
            this.setState({isReg: true});
        }
    }
    render(){
        const { isLogged, isReg } = this.state;
        return(
            <div>
            <div className="sign-up">
                {!isLogged?
                    <button className="sign-up__btn btn-login" onClick={this.isLogged}>Вход</button>
                :
                    <button className="sign-up__btn btn-logout" onClick={this.logout}>Выход</button>
                }
                {/* <button className="sign-up__btn btn-reg" onClick={this.isReg}>Регистрация</button> */}
            </div>
            {isLogged ? <LoginPage isLogged={isLogged} /> : null}
            
            </div>
        );
    }
}

export default SignUp;