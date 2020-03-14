import React, { Component } from 'react';
import AddCategoria from '../Kitchen/AddCategoria';

export default class Admin extends Component {

    state = {
        Dashboard: false,
        Geral: false,
        Categorias: false,
        Produtos: false,
        Mesas: false,
    }

    toggleMenuLeft = (event) => {
        let menuLeft = document.querySelector("#root > div > div > main > div.menu-left");
        let mainRight = document.querySelector("#root > div > div > main > div.main-right");
        let buttonMenu = document.querySelector("#root > div > div > header > nav > div.title-left > button");

        if (menuLeft.className === 'menu-left') {
            menuLeft.classList.add('menu-left-disable');
            mainRight.classList.add('main-right-full-width');
            buttonMenu.classList.add('icon-active-menu');
        } else {
            menuLeft.classList.remove('menu-left-disable');
            mainRight.classList.remove('main-right-full-width');
            buttonMenu.classList.remove('icon-active-menu');
        }
    }

    toggleMenu = (menu) => {
        let state = {...this.state};
        var keys = Object.keys(state);
        keys.map((key)=>{
            state[key] = false;
        })
        state[menu] = true;
        this.setState(state);
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="container-header-admin">
                        <div className="title-left">
                            <h2>RESTAURANTE</h2>
                            <button onClick={this.toggleMenuLeft} className="icon-menu"><i className="fas fa-bars"></i></ button>
                        </div>
                        <div className="icons-right">
                            <button href="#"><i className="fas fa-sign-out-alt"></i></button>
                        </div>
                    </nav>
                </header>
                <main className="name-conteudo">
                    <div className="menu-left">
                        <h4>CORE</h4>
                        <ul>
                            <li><button onClick={() => this.toggleMenu('Dashboard')}><i className="fas fa-tachometer-alt"></i>Dashboard</button></li>
                        </ul>
                        <h4>RESTAURANTE</h4>
                        <ul>
                            <li><button onClick={() => this.toggleMenu('Geral')}><i className="fas fa-archway"></i>Geral</button><i className="fas fa-angle-right"></i></li>
                        </ul>
                        <ul>
                            <li><button onClick={() => this.toggleMenu('Categorias')}><i className="fas fa-columns"></i>Categorias</button><i className="fas fa-angle-right"></i></li>
                        </ul>
                        <ul>
                            <li><button onClick={() => this.toggleMenu('Produtos')}><i className="fab fa-product-hunt"></i>Produtos</button><i className="fas fa-angle-right"></i></li>
                        </ul>
                        <ul>
                            <li><button onClick={() => this.toggleMenu('Mesas')}><i className="fas fa-border-all"></i>Mesas</button><i className="fas fa-angle-right"></i></li>
                        </ul>
                    </div>
                    <div className="main-right">
                        {
                            this.state.Dashboard && <img className="img-full" src={window.location.origin + '/imagens/site-em-construcao.jpg'}  alt="site em construcao"/> 
                        }

                        {
                            this.state.Geral && <img className="img-full" src={window.location.origin + '/imagens/site-em-construcao.jpg'}  alt="site em construcao"/> 
                        }

                        {
                            this.state.Categorias && <AddCategoria/>
                        }

                    </div>

                </main>
            </div>
        )
    }
}
