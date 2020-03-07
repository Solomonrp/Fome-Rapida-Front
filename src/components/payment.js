import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Button from './button';
import '../style/login.css';
import axios from 'axios';
import querySearch from 'stringquery';

export const Payment = (props) => {


  return (
    <React.Fragment>
      <form>
        <div>
          <label>
            Name:
          </label>
          <input type="text" name="Name" placeholder="seunome@email.com" />
        </div>
        <div>
          <label>
            CPF:
          </label>
          <input type="text" name="CPF" placeholder="seunome@email.com" />
        </div>
        <div>
          <label>
            PAIS:
          </label>
          <input type="text" name="PAIS" placeholder="seunome@email.com" />
        </div>
        <div>
          <label>
            TELEFONE:
          </label>
          <input type="text" name="TELEFONE" placeholder="seunome@email.com" />
        </div>
        <div>
          <label>
            Número do cartao:
          </label>
          <input type="text" name="email" placeholder="seunome@email.com" />
        </div>
        <div>
          <label>
            CVV:
          </label>
          <input type="text" name="email" placeholder="seunome@email.com" />
        </div>
        <div>
          <label>
            Data de expiração:
          </label>
          <input type="text" name="email" placeholder="seunome@email.com" />
        </div>
      </form>
    </React.Fragment>
  )
}

export default Payment;
