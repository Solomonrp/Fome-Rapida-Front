import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Button from './button';
import '../style/login.css';



class Login extends Component {

  state = {
    name: '',
  }

  handleSubmit = () => {

  }

  componentDidMount() {
    // const socket = socketIOClient(this.state.endpoint);
    // this.state.socket.emit("hello", this.state.name);
    console.log(this.props.state)
  }

  log = () => {
    // this.props.state.socket.emit("log", this.state.name);
  }

  changeName = (event) => {
    console.log(event.target.value)
    this.setState({
      name: event.target.value
    })
  }




  send = () => {
    // const socket = socketIOClient(this.state.endpoint);
    console.log('clicked')
    const hello = "hello from client";
    // this.props.state.socket.emit("log", hello);
  }

  handleChange = (event) => {
    this.props.handleState(event.name, event.value);
  }

  render() {
    // const socket = socketIOClient(this.state.endpoint);
    // this.props.state.socket.on("hello", (hello) => {
    //   console.log(hello)
    // })

    // this.props.state.socket.on("up", (msg) => {
    //   console.log(msg)
    // })
    return (
      <div className="login__wrapper">
        <div className="login">
          <div className="login__box">
            <a className="login_tittle">FOME RÁPIDA</a>
            <form className="login__form">
              <div className="left">
                <label>
                  Email:
              </label>
                <input type="text" name="email" placeholder="seunome@email.com" onChange={this.handleChange} />
              </div>
              <div className="left">
                <label>
                  Password:
              </label>
                <input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} />
              </div>
              <div>
                <input
                  name="show_password"
                  type="checkbox"
                  id="showPass"
                // onClick={this.handleShowPass}
                />
                <label className="label__text">
                  Mostrar a senha
              </label>

                {/*<div>
              <form>
          <label>Email
            <input name="email" type="text" />
          </label>
          <label>Senha
            <input name="password" type="password" />
          </label>
          <div>
            <button>Entrar</button>
            <span>ou</span>
            <button>Cadastrar</button>
          </div>
        </form> */}


                {/* <button id="testeBtn1" onClick={() => this.log()}>Click to log</button>
        <input name='name' type='text' onChange={this.changeName} />
          <button id="testeBtn" onClick={() => this.send()}>Click to hello</button> */}
              </div>
            </form>
            <div className="login__problems">
              <a className="login__problems__son">Problemas para acessar sua conta?</a>
            </div>
            <div className="login_btn">
              <Button type="color" handleEvent={this.props.handleLogin} checkLogin={this.props.checkLogin}>Acessar</Button>
              <Button type="google" handleEvent={this.props.handleLogin} checkLogin={this.props.checkLogin}>Acesse com o Google</Button>
              <div className="or_wrapper">
                <hr className="or__hr" />
                <a className="or">ou</a>
                <hr className="or__hr" />
              </div>
              <Button handleEvent={this.props.handleSigning} checkLogin={this.props.checkLogin}>Cadastrar</Button>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

export default Login;