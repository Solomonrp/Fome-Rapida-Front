import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Button from './button';
import '../style/login.css';
import axios from 'axios';
import querySearch from 'stringquery';



export const Login2 = (props) => {

  useEffect(() => {
    getTable();
  }, [])

  useEffect(() => {
    // const socket = props.state.socket;
    // socket.on('table', data => {
    //   console.log('table', data.mesa)
    //   if(data.mesa){
    //     localStorage.setItem("table", data.mesa)
    //   }
    //   else {
    //     localStorage.setItem("table", 'bancada')
    //   }
    // }
    // );
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [table, setTable] = useState(0);

  const getTable = () => {
    let query = querySearch(window.location.search)
    console.log('table',query)
    if(query){
      localStorage.setItem("table", query.mesa)
    }
    else {
      localStorage.setItem("table", 'bancada')
    }
    setTable(query)
    console.log('localstorate',localStorage.getItem("table"));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }



  const subscribe = async () => {
    console.log('subs click');
    const data = {
      email: email,
      password: password
    }
    try {
      const result = await axios.post('http://localhost:5000/createUser/aplication', data)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const login = async () => {
    console.log('login click');
    const data = {
      email: email,
      password: password
    }
    try {
      const result = await axios.post('http://localhost:5000/user-authentication', data)
      console.log(result);
      const socket = this.props.state.socket;
      socket.emit('log', email);
      // log
    } catch (error) {
      console.log(error);
    }
  }

  const changeName = (event) => {
    console.log(event.target.value)
    this.setState({
      name: event.target.value
    })
  }

  // const handleChange = (event) => {
  //   this.props.handleState(event.name, event.value);
  // }

  const handleChange = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
    else {
      setPassword(event.target.value)
    }
  }

  const googleLogin = () => {
    axios.get('http://localhost:5000/auth/google')
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log('error', error)
      })
  }


  return (
    <div className="login__wrapper">
      <div className="login">
        <div className="login__box">
          <a className="login_tittle">FOME RÁPIDA</a>
          <form onSubmit={handleSubmit} className="login__form">
            <div className="left">
              <label>
                Email:
              </label>
              <input type="text" name="email" placeholder="seunome@email.com" onChange={handleChange} />
            </div>
            <div className="left">
              <label>
                Password:
              </label>
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <div className="showPassword__wrapper">
              <input
                name="show_password"
                type="checkbox"
                id="showPass"
              // onClick={this.handleShowPass}
              />
              <label className="label__text">
                Mostrar a senhaauthHandler
              </label>
            </div>
            <Button type="color" handleEvent={login}>Acessar</Button>
          </form>
          <div className="login_btn">
            {/* <Button type="color" handleEvent={props.handleLogin} checkLogin={props.checkLogin}>Acessar</Button> */}
            <Button type="google" onClick={googleLogin}>Acesse com o Google</Button>
            <div className="or_wrapper">
              <hr className="or__hr" />
              <a className="or">ou</a>
              <hr className="or__hr" />
            </div>
            <Button handleEvent={subscribe}>Cadastrar</Button>
          </div>
          <div className="login__problems">
            <a className="login__problems__son">Problemas para acessar sua conta?</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login2;