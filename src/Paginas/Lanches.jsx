import { useState } from "react";
import { Link } from "react-router-dom";

export default function Lanches() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [lista, setLista] = useState([]);
    const [resultado, setResultado] = useState("");
    const [idConsulta, setIdConsulta] = useState("");
    const [editando, setEditando] = useState(false);

    async function consultarTodos() {
        try {
            const resposta = await fetch("http://localhost:3001/lanches");
            const data = await resposta.json();
            setLista(data);
            setResultado("Consulta geral realizada.");
        }
        catch {
            setResultado("Erro ao consultar lanches.");
        }
    }

    async function cadastrar() {
        try {
            const resposta = await fetch("http://localhost:3001/lanches", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, descricao, preco })
            });

            const data = await resposta.json();
            setResultado(data.message || "Cadastrado!");

            setNome("");
            setDescricao("");
            setPreco("");

            consultarTodos();
        }
        catch {
            setResultado("Erro ao cadastrar lanche.");
        }
    }

    async function consultarPorID() {
        try {
            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`);
            const data = await resposta.json();
            setLista([data]);
            setResultado("Consulta realizada.");
        }
        catch {
            setResultado("Erro ao consultar lanche.");
        }
    }

    async function alterar() {
        try {
            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`);
            const data = await resposta.json();

            setNome(data.NOME);
            setDescricao(data.DESCRICAO);
            setPreco(data.PRECO);

            setEditando(true);
            setResultado("Dados carregados.");
        }
        catch {
            setResultado("Erro ao carregar lanche.");
        }
    }

    async function salvarAlteracao() {
        try {
            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, descricao, preco })
            });

            const data = await resposta.json();
            setResultado(data.message || "Alterado!");
        }
        catch {
            setResultado("Erro ao salvar alteração.");
        }
        setNome("");
        setDescricao("");
        setPreco("");
        setIdConsulta("");
        setEditando(false);
        consultarTodos();
    }

    async function excluir() {
        try {
            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`, {
                method: "DELETE"
            });

            const data = await resposta.json();
            setResultado(data.message || "Excluído!");
        }
        catch {
            setResultado("Erro ao excluir lanche.");
        }
        setIdConsulta("");
        consultarTodos();
    }

    return (
        <div className="container">

            <h1>Cadastro de Lanches</h1>

            <div className="div1">

                <form onSubmit={(e) => e.preventDefault()}>
                    <p>
                        Nome:
                        <input value={nome} onChange={(e) => setNome(e.target.value)} />
                    </p>

                    <p>
                        Descrição:
                        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </p>

                    <p>
                        Preço:
                        <input value={preco} onChange={(e) => setPreco(e.target.value)} type="number" step="0.01" />
                    </p>

                    {!editando ? (
                        <button type="button" onClick={cadastrar}>Cadastrar</button>
                    ) : (
                        <button type="button" onClick={salvarAlteracao}>Salvar Alteração</button>
                    )}

                    <p>{resultado}</p>
                </form>

            </div>

            <div className="div2">

                <h1>Gerenciar Lanches</h1>

                <input
                    value={idConsulta}
                    onChange={(e) => setIdConsulta(e.target.value)}
                    placeholder="ID do lanche"
                />

                <div className="centro">
                    <button onClick={consultarPorID}>Consultar Lanche</button>
                    <button onClick={consultarTodos}>Pesquisa Geral</button>
                    <button onClick={alterar}>Alterar Lanche</button>
                    <button onClick={excluir}>Excluir Lanche</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lista.map(item => (
                            <tr key={item.ID_LANCHE}>
                                <td>{item.ID_LANCHE}</td>
                                <td>{item.NOME}</td>
                                <td>{item.DESCRICAO}</td>
                                <td>R$ {Number(item.PRECO).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <p><Link to="/">Página Inicial</Link></p>

        </div>
    );
}
