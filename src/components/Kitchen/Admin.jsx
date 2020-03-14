import React, { Component } from 'react'

export default class Admin extends Component {
    toggleMenuLeft = (event) => {
        let menuLeft = document.querySelector("#root > div > div > main > div.menu-left");
        let mainRight = document.querySelector("#root > div > div > main > div.main-right");

        if (menuLeft.className === 'menu-left') {
            menuLeft.classList.add('menu-left-disable');
            mainRight.classList.add('main-right-full-width');
        } else {
            menuLeft.classList.remove('menu-left-disable');
            mainRight.classList.remove('main-right-full-width');
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="container-header-admin">
                        <div className="title-left">
                            <h2>RESTAURANTE</h2>
                            <a onClick={this.toggleMenuLeft}><i class="fas fa-bars"></i></a>
                        </div>
                        <div className="icons-right">
                            <a href="#"><i class="fas fa-sign-out-alt"></i></a>
                        </div>
                    </nav>
                </header>
                <main className="name-conteudo">
                    <div className="menu-left">
                        <h4>CORE</h4>
                        <ul>
                            <li><a href="#"><i class="fas fa-tachometer-alt"></i>Dashboard</a></li>
                        </ul>
                        <h4>RESTAURANTE</h4>
                        <ul>
                            <li><a href="#"><i class="fas fa-archway"></i>Geral</a><i class="fas fa-angle-right"></i></li>
                        </ul>
                        <ul>
                            <li><a href="#"><i class="fas fa-columns"></i>Categorias</a><i class="fas fa-angle-right"></i></li>
                        </ul>
                        <ul>
                            <li><a href="#"><i class="fab fa-product-hunt"></i>Produtos</a><i class="fas fa-angle-right"></i></li>
                        </ul>
                        <ul>
                            <li><a href="#"><i class="fas fa-border-all"></i>Mesas</a><i class="fas fa-angle-right"></i></li>
                        </ul>
                    </div>
                    <div className="main-right">
                        <h2>👁</h2>
                        <h2>👁</h2>
                    </div>

                </main>
            </div>
        )
    }
}
