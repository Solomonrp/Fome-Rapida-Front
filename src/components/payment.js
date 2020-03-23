import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import '../style/login.css';
import axios from 'axios';
import Nav from './nav';
import '../style/payment.css';
import VMasker from 'vanilla-masker';

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
      if (payment.status === 200) {
        props.handleStage();
        history.push('/pedidos')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearCarecter = (data) => {
    let newData = data
    newData = data.replace(/[ÀÁÂÃÄÅ]/g, "A");
    newData = newData.replace(/[àáâãäå]/g, "a");
    newData = newData.replace(/[ÈÉÊË]/g, "E");
    newData = newData.replace(/[^a-z0-9]/gi, '')
    return newData;
  }

  function inputHandler(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
    switch (event.target.name) {
      case 'CPF':
        let cpf = clearCarecter(c.value)
        setCpf(cpf)
        break;
      case 'phone':
        let phone = clearCarecter(c.value)
        setTelefone(phone)
        break;
      case 'card':
        let card = clearCarecter(c.value)
        setCard(card)
        break;
      case 'cvv':
        let cvv = clearCarecter(c.value)
        setCvv(cvv)
        break;
      case 'expDate':
        let data = clearCarecter(c.value)
        setExpDate(data)
        break;
      default:
        console.log('não feito')
    }
  }

  const telefones = () => {
    var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
    var tel = document.querySelector('#phone');
    VMasker(tel).maskPattern(telMask[0]);
    tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);
  }

  const handleCpf = (event) => {
    var docMask = ['999.999.999-999', '99.999.999/9999-99'];
    var doc = document.querySelector('#doc');
    VMasker(doc).maskPattern(docMask[0]);
    doc.addEventListener('input', inputHandler.bind(undefined, docMask, 14), false);
  }

  const handleCard = () => {
    var cardMask = ['9999 9999 9999 9999'];
    var card = document.querySelector('#card');
    VMasker(card).maskPattern(cardMask[0]);
    card.addEventListener('input', inputHandler.bind(undefined, cardMask, 20), false);
  }

  const handleCvv = (e) => {
    var cvvMask = ['999'];
    var cvv = document.querySelector('#cvv');
    VMasker(cvv).maskPattern(cvvMask[0]);
    cvv.addEventListener('input', inputHandler.bind(undefined, cvvMask, 5), false);
  }
  
  const handleDate = (e) => {
    var dateMask = ['99/99'];
    var date = document.querySelector('#expDate');
    VMasker(date).maskPattern(dateMask[0]);
    date.addEventListener('input', inputHandler.bind(undefined, dateMask, 6), false);
  }

  return (
    <React.Fragment>
      <Nav />
      <React.Fragment>
        <form className="payForm">
          <div>
            <h1 className="payment__tittle">Pagamento</h1>
          </div>
          <div>
            <input className="field" type="text" name="Name" placeholder="Nome Completo" onChange={e => setNome(e.target.value)} />
          </div>
          <div>
            <input className="field" type="text" id="doc" name="CPF" placeholder="CPF" onFocus={e => handleCpf(e)} />
          </div>
          <div class="select">
            {/* <input className="field" type="text" name="PAIS" placeholder="País" onChange={e => setPais(e.target.value)} /> */}
            <select name="slct" id="slct" onChange={e => setPais(e.target.value)}>
              <option selected disabled value="pais">Pais</option>
              <option value="br">BR</option>
              <option value="us">US</option>
            </select>
          </div>

          <div>
            <input className="field" type="tel" id="phone" name="phone" placeholder="XX XXXXX-XXXX" pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}" required onFocus={() => telefones()} onChange={e => setTelefone(e.target.value)} />
          </div>
          <div>
            <input className="field" type="text" name="card" id="card" placeholder="Número do Cartão" onFocus={() => handleCard()} onChange={e => setCard(e.target.value)} />
          </div>
          <div>
            <input className="field" type="text" id="cvv" name="cvv" placeholder="CVV" onChange={e => setCvv(e.target.value)} onFocus={() => handleCvv()} />
          </div>
          <div>
            {/* <input className="field" type="date" name="date" placeholder="Data de expiração" /> */}
            {/* <input className="field" type="month" id="start" name="start" min="2018-03" value="2018-05" onChange={e => console.log(e.target.value)}/> */}
            <input className="field" type="text" id="expDate" name="expDate" placeholder="Data de Vencimento" onFocus={() => handleDate()} />
          </div>
          <input type="button" className="payment___btn" value="Pagar" onClick={handlePay} />
        </form>
      </React.Fragment>
    </React.Fragment>
  )
}

export default Payment;
