import { useState } from "react";
import { Link } from "react-router-dom";

export default function Bebidas() {

    const [nome, setNome] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [lista, setLista] = useState([]);
    const [preco, setPreco] = useState("");
    const [resultado, setResultado] = useState("");
    const [idConsulta, setIdConsulta] = useState("");

    async function consultarTodasBebidas() {
        try {
            const resposta = await fetch("http://localhost:3001/bebidas");
            const data = await resposta.json();

            setLista(data);   // ← agora lista recebe TODAS AS BEBIDAS
            setResultado("Consulta geral realizada.");
        }
        catch (error) {
            setResultado("Erro ao consultar bebidas.");
        }
    }

    async function cadastrarBebida() {
        try {
            setResultado("Aguarde...");

            const resposta = await fetch("http://localhost:3001/bebidas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, tamanho, preco })
            });

            const data = await resposta.json();
            setResultado(data.message || "Cadastro Realizado com Sucesso!");

            setNome("");
            setTamanho("");
            setPreco("");
            consultarTodasBebidas();
        }
        catch (error) {
            setResultado("Erro ao cadastrar bebida.");
        }
    }

    // ---- CONSULTAR POR ID ----
    async function consultarBebidaPorID() {

        try {
            const resposta = await fetch(`http://localhost:3001/bebidas/${idConsulta}`);
            const data = await resposta.json();

            // Coloca o objeto dentro de array para funcionar com map()
            setLista([data]);

            // Mensagem simples
            setResultado("Consulta realizada.");

            setNome("");
            setTamanho("");
            setPreco("");
        }
        catch (error) {
            setResultado("Erro ao consultar bebida.");
        }
    }

    function alterarBebida() {
        setResultado("Função de alterar ainda não implementada.");
    }

    function excluirBebida() {
        setResultado("Função de excluir ainda não implementada.");
    }

    return (
        <div className="container">

            <h1>Cadastro de Bebidas</h1>

            {/* FORMULÁRIO */}
            <div className="div1">
                <form onSubmit={(e) => e.preventDefault()}>

                    <p>
                        Nome da bebida:
                        <input
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                        />
                    </p>

                    <p>
                        Tamanho/Capacidade:
                        <input
                            name="tamanho"
                            value={tamanho}
                            onChange={(e) => setTamanho(e.target.value)}
                            type="text"
                        />
                    </p>

                    <p>
                        Preço da bebida:
                        <input
                            name="preco"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            type="number"
                            step="0.01"
                        />
                    </p>

                    <p>
                        <button type="button" onClick={cadastrarBebida}>
                            Cadastrar Bebida
                        </button>
                    </p>

                    <p>{resultado}</p>
                </form>
            </div>

            {/* CONSULTAR POR ID */}
            <div className="div2">
                <h1>Gerenciar Bebidas</h1>

                <p>Digite o ID da Bebida:</p>

                <input
                    type="text"
                    name="inpConsultar"
                    value={idConsulta}
                    onChange={(e) => setIdConsulta(e.target.value)}
                    placeholder="ID da bebida"
                />
                <div className="centro">

                <button type="button" onClick={consultarBebidaPorID}>
                    Consultar Bebida
                </button>

                <button type="button" onClick={consultarTodasBebidas}>
                    Pesquisa Geral
                </button>


                <button type="button" onClick={excluirBebida}>
                    Excluir Bebida
                </button>

                <button type="button" onClick={alterarBebida}>
                    Alterar Bebida
                </button>

                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tamanho</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(item => (
                            <tr key={item.ID_BEBIDA}>
                                <td>{item.ID_BEBIDA}</td>
                                <td>{item.NOME}</td>
                                <td>{item.TAMANHO}</td>
                                <td>R$ {Number(item.PRECO).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div>
                <p><Link to="/">Pagina Inicial</Link></p>
            </div>
        </div>
    );
}
