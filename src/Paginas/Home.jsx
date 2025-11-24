import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-container">
            <h1>SGL - SISTEMA DE GERENCIAMENTO DE LANCHONETE</h1>

            <div className="home-menu">
                <div className="menu-coluna">
                    <ul>
                        <li><a href="/pedidos">Fazer um pedido</a></li>
                        <li><a href="/lanches">Lanches</a></li>
                        <li><a href="/bebidas">Bebidas</a></li>
                        <li><a href="/funcionarios">Cadastro Funcionários</a></li>
                        <li><a href="/categoriaLanches">Categoria de Lanches</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
