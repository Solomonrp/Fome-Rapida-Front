import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

const Auth = ({ component: Component, state,sendOrder, handlePay,handleStage,checkStatus, handleClearCart, isAuthenticated, ...rest }) => {

  const [load, setLoad] = useState(true)
  const [logged, setLogged] = useState(false)

  const handle = async () => {
    const a = await isAuthenticated();
    if (a) {
      setLogged(true)
      setLoad(false)
    } else {
      setLoad(false)
    }
  }

  useEffect(() => {
    console.log('effet')
    handle()
  }, [])

  return (
    <Route
      {...rest}
      render={props =>
        load === true ?
          <div>Loading</div>
          :
          logged === true ?
            <Component state={state} sendOrder={sendOrder} handlePay={handlePay} handleStage={handleStage} checkStatus={checkStatus} handleClearCart={handleClearCart} {...props} />
            : <Redirect to="/" />
      }
    />
  );
}
export default Auth