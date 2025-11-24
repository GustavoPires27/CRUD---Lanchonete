import { useState } from "react";
import { Link } from "react-router-dom";

export default function Categorias() {
    const [nome, setNome] = useState("");
    const [lista, setLista] = useState([]);
    const [resultado, setResultado] = useState("");
    const [idConsulta, setIdConsulta] = useState("");
    const [editando, setEditando] = useState(false);

    async function consultarTodasCategorias() {
        try {
            const resposta = await fetch("http://localhost:3001/categorias");
            const data = await resposta.json();
            setLista(data);
            setResultado("Consulta geral realizada.");
        } catch {
            setResultado("Erro ao consultar categorias.");
        }
    }

    async function cadastrarCategoria() {
        try {
            setResultado("Aguarde...");
            const resposta = await fetch("http://localhost:3001/categorias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome })
            });
            const data = await resposta.json();
            setResultado(data.message || "Categoria cadastrada!");
            setNome("");
            consultarTodasCategorias();
        } catch {
            setResultado("Erro ao cadastrar categoria.");
        }
    }

    async function consultarPorID() {
        if (!idConsulta) {
            setResultado("Digite o ID.");
            return;
        }
        try {
            const resposta = await fetch(`http://localhost:3001/categorias/${idConsulta}`);
            if (resposta.status === 404) {
                setResultado("Categoria não encontrada.");
                return;
            }
            const data = await resposta.json();
            setLista([data]);
            setResultado("Consulta realizada.");
        } catch {
            setResultado("Erro ao consultar categoria.");
        }
    }

    async function alterarCategoria() {
        if (!idConsulta) {
            setResultado("Informe o ID.");
            return;
        }
        try {
            const resposta = await fetch(`http://localhost:3001/categorias/${idConsulta}`);
            if (resposta.status === 404) {
                setResultado("Categoria não encontrada.");
                return;
            }
            const data = await resposta.json();
            setNome(data.NOME);
            setResultado("Dados carregados. Clique em SALVAR.");
            setEditando(true);
        } catch {
            setResultado("Erro ao carregar categoria.");
        }
    }

    async function salvarAlteracao() {
        if (!idConsulta) {
            setResultado("Informe o ID.");
            return;
        }
        try {
            setResultado("Salvando...");
            const resposta = await fetch(`http://localhost:3001/categorias/${idConsulta}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome })
            });
            const data = await resposta.json();
            setResultado(data.message || "Alterado com sucesso!");
            setEditando(false);
            setNome("");
            setIdConsulta("");
            consultarTodasCategorias();
        } catch {
            setResultado("Erro ao salvar alteração.");
        }
    }

    async function excluirCategoria() {
        if (!idConsulta) {
            setResultado("Informe o ID.");
            return;
        }
        try {
            const resposta = await fetch(`http://localhost:3001/categorias/${idConsulta}`, {
                method: "DELETE"
            });
            const data = await resposta.json();
            setResultado(data.message || "Excluído com sucesso!");
            setIdConsulta("");
            consultarTodasCategorias();
        } catch {
            setResultado("Erro ao excluir categoria.");
        }
    }

    return (
        <div className="container">
            <h1>Cadastro de Categorias</h1>

            <div className="div1">
                <form onSubmit={(e) => e.preventDefault()}>
                    <p>
                        Nome da Categoria:
                        <input value={nome} onChange={(e) => setNome(e.target.value)} />
                    </p>

                    <p>
                        {!editando ? (
                            <button type="button" onClick={cadastrarCategoria}>Cadastrar Categoria</button>
                        ) : (
                            <button type="button" onClick={salvarAlteracao}>Salvar Alteração</button>
                        )}
                    </p>

                    <p>{resultado}</p>
                </form>
            </div>

            <div className="div2">
                <h1>Gerenciar Categorias</h1>

                <p>Digite o ID da Categoria:</p>

                <input
                    value={idConsulta}
                    onChange={(e) => setIdConsulta(e.target.value)}
                    placeholder="ID"
                />

                <div className="centro">
                    <button onClick={consultarPorID}>Consultar Categoria</button>
                    <button onClick={consultarTodasCategorias}>Pesquisa Geral</button>
                    <button onClick={alterarCategoria}>Alterar Categoria</button>
                    <button onClick={excluirCategoria}>Excluir Categoria</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lista.map(item => (
                            <tr key={item.ID_CATEGORIA}>
                                <td>{item.ID_CATEGORIA}</td>
                                <td>{item.NOME}</td>
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
