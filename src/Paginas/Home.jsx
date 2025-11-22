import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div class="home-container">
            <h1>SGL - SISTEMA DE GERENCIAMENTO DE LANCHONETE</h1>

            <div class="home-menu">

                <div class="menu-coluna">
                    <ul>
                        <li><a href="/pedidos">Fazer um pedido</a></li>
                        <li><a href="/lanches">Lanches</a></li>
                        <li><a href="/bebidas">Bebidas</a></li>
                        <li><a href="/funcionarios">Cadastro Funcionarios</a></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}