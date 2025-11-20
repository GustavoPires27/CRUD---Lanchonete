import { Link } from "react-router-dom";
export default function Home() 
{
    return (
        <div>

            <h1>SGL - SISTEMA DE GERENCIAMENTO DE LANCHONETE</h1>

            <div className="conteudo">

    

                <h3>Pedidos</h3>

                <ul>
                    <li><Link to="/Pedidos">Fazer um pedido</Link></li>
                </ul>

                <h3>Lanches</h3>

                <ul>
                    <li><Link to="/Lanches">Lanches</Link></li>
                </ul>

                 <h3>Bebidas</h3>

                <ul>
                    <li><Link to="/Bebidas">Bebidas</Link></li>
                </ul>

                <h3>Cadastro de Funcionario</h3>

                <ul>
                    <li><Link to="/Funcionarios">Cadastro Funcionarios</Link></li>
                </ul>
                
            </div>  


        </div>
    )
}