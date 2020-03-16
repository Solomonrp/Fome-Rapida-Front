import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import '../style/login.css';
import axios from 'axios';
import Nav from './nav';
import '../style/payment.css';


export const Payment = (props) => {
  let history = useHistory()

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [pais, setPais] = useState('');
  const [telefone, setTelefone] = useState('');
  const [card, setCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [expDate, setExpDate] = useState('');
  const [email, setEmail] = useState('');
  const [cart, setCart] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [orderId, setOrderId] = useState(`${localStorage.getItem("table")}`);

  useEffect(() => {
    handleCartPay();
    props.sendOrder();
  }, [])

  const handleCartPay = () => {
    let cart;
    cart = props.state.cart.map(item => {
      return {
        "id": `${item.id}`,
        "title": item.name,
        "unit_price": item.price,
        "quantity": item.quantity,
        "tangible": true
      }
    })
    setCart(cart)
  }

  const handlePay = async () => {
    const data = {
      id: localStorage.getItem("id"),
      orderId: localStorage.getItem("orderId"),
      card: card,
      cvv: cvv,
      nome: nome,
      cpf: cpf,
      pais: pais,
      telefone: telefone,
      expDate: expDate,
      cart: cart,
      email: email,
      preco: props.state.price
    }
    try {
      const payment = await axios.post(`${process.env.REACT_APP_BACK_END}/payment`, data);
      console.log(payment);
      if(payment.status === 200){
        props.handleStage();
        history.push('/pedidos')
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <React.Fragment>
      <Nav />
      <React.Fragment>
        <form className="payForm">
          <div>
            <label>
              Name:
          </label> <br />
            <input className="field" type="text" name="Name" placeholder="Nome Completo" onChange={e => setNome(e.target.value)} />
          </div>
          <div>
            <label>
              CPF:
          </label><br />
            <input className="field" type="text" name="CPF" placeholder="CPF" onChange={e => setCpf(e.target.value)} />
          </div>
          <div>
            <label>
              PAIS:
          </label><br />
            {/* <input className="field" type="text" name="PAIS" placeholder="País" onChange={e => setPais(e.target.value)} /> */}
            <select id="cars" name="cars" onChange={e => setPais(e.target.value)}>
              <option value="pais">Pais</option>
              <option value="br">BR</option>
              <option value="us">US</option>
            </select>
          </div>
          <div>
            <label>
              TELEFONE:
          </label><br />
            <input className="field" type="tel" id="phone" name="phone" placeholder="XX XXXXX-XXXX " pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}" required onChange={e => setTelefone(e.target.value)} />
          </div>
          <div>
            <label>
              Número do cartao:
          </label><br />
            <input className="field" type="text" name="card" placeholder="Número do Cartão" onChange={e => setCard(e.target.value)} />
          </div>
          <div>
            <label>
              CVV:
          </label><br />
            <input className="field" type="text" name="cvv" placeholder="CVV" onChange={e => setCvv(e.target.value)} />
          </div>
          <div>
            <label>
              Data de expiração:
          </label><br />
            {/* <input className="field" type="date" name="date" placeholder="Data de expiração" /> */}
            {/* <input className="field" type="month" id="start" name="start" min="2018-03" value="2018-05" onChange={e => console.log(e.target.value)}/> */}
            <input className="field" type="text" name="expDate" placeholder="MMAA" onChange={e => setExpDate(e.target.value)} />
          </div>
          <input type="button" value="Pagar" onClick={handlePay} />
        </form>
      </React.Fragment>
    </React.Fragment>
  )
}

export default Payment;
