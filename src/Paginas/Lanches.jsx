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

    async function consultarTodosLanches() {
        try {
            const resposta = await fetch("http://localhost:3001/lanches");
            const data = await resposta.json();
            setLista(data);
            setResultado("Consulta geral realizada.");
        } catch {
            setResultado("Erro ao consultar lanches.");
        }
    }

    async function cadastrarLanche() {
        try {
            setResultado("Aguarde...");

            const resposta = await fetch("http://localhost:3001/lanches", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, descricao, preco })
            });

            const data = await resposta.json();
            setResultado(data.message || "Cadastro realizado!");

            setNome("");
            setDescricao("");
            setPreco("");

            consultarTodosLanches();
        } catch {
            setResultado("Erro ao cadastrar lanche.");
        }
    }

    async function consultarLanchePorID() {
        if (!idConsulta) {
            setResultado("Digite o ID.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`);

            if (resposta.status === 404) {
                setResultado("Lanche não encontrado.");
                return;
            }

            const data = await resposta.json();
            setLista([data]);
            setResultado("Consulta realizada.");
        } catch {
            setResultado("Erro ao consultar lanche.");
        }
    }

    async function alterarLanche() {
        if (!idConsulta) {
            setResultado("Digite o ID para alterar.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`);

            if (resposta.status === 404) {
                setResultado("Lanche não encontrado.");
                return;
            }

            const data = await resposta.json();

            setNome(data.NOME);
            setDescricao(data.DESCRICAO);
            setPreco(data.PRECO);

            setResultado("Dados carregados. Clique em SALVAR.");
            setEditando(true);
        } catch {
            setResultado("Erro ao carregar lanche.");
        }
    }

    async function salvarAlteracao() {
        if (!idConsulta) {
            setResultado("Informe o ID.");
            return;
        }

        try {
            setResultado("Salvando...");

            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, descricao, preco })
            });

            const data = await resposta.json();

            setResultado(data.message || "Alterado com sucesso!");
            setEditando(false);

            setNome("");
            setDescricao("");
            setPreco("");
            setIdConsulta("");

            consultarTodosLanches();
        } catch {
            setResultado("Erro ao salvar alteração.");
        }
    }

    async function excluirLanche() {
        if (!idConsulta) {
            setResultado("Informe o ID.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:3001/lanches/${idConsulta}`, {
                method: "DELETE"
            });

            const data = await resposta.json();
            setResultado(data.message || "Excluído com sucesso!");

            setIdConsulta("");
            consultarTodosLanches();
        } catch {
            setResultado("Erro ao excluir lanche.");
        }
    }

    return (
        <div className="container">

            <h1>Cadastro de Lanches</h1>

            <div className="div1">
                <form onSubmit={(e) => e.preventDefault()}>

                    <p>
                        Nome do Lanche:
                        <input value={nome} onChange={(e) => setNome(e.target.value)} />
                    </p>

                    <p>
                        Descrição:
                        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </p>

                    <p>
                        Preço:
                        <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />
                    </p>

                    <p>
                        {!editando ? (
                            <button type="button" onClick={cadastrarLanche}>Cadastrar Lanche</button>
                        ) : (
                            <button type="button" onClick={salvarAlteracao}>Salvar Alteração</button>
                        )}
                    </p>

                    <p>{resultado}</p>
                </form>
            </div>

            <div className="div2">

                <h1>Gerenciar Lanches</h1>

                <p>Digite o ID do Lanche:</p>

                <input
                    value={idConsulta}
                    onChange={(e) => setIdConsulta(e.target.value)}
                    placeholder="ID"
                />

                <div className="centro">
                    <button onClick={consultarLanchePorID}>Consultar Lanche</button>
                    <button onClick={consultarTodosLanches}>Pesquisa Geral</button>
                    <button onClick={alterarLanche}>Alterar Lanche</button>
                    <button onClick={excluirLanche}>Excluir Lanche</button>
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

            <div>
                <p><Link to="/">Página Inicial</Link></p>
            </div>
        </div>
    );
}
