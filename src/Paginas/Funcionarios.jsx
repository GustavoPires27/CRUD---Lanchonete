import { useState } from "react";
import { Link } from "react-router-dom";

export default function Funcionarios() {

    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState("");
    const [telefone, setTelefone] = useState("");
    const [lista, setLista] = useState([]);
    const [resultado, setResultado] = useState("");
    const [idConsulta, setIdConsulta] = useState("");
    const [editando, setEditando] = useState(false);

    async function consultarTodos() {
        try {
            const resposta = await fetch("http://localhost:3001/funcionarios");
            const data = await resposta.json();
            setLista(data);
            setResultado("Consulta geral realizada.");
        }
        catch {
            setResultado("Erro ao consultar funcionários.");
        }
    }

    async function cadastrar() {
        try {
            setResultado("Aguarde...");

            const resposta = await fetch("http://localhost:3001/funcionarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, cargo, telefone })
            });

            const data = await resposta.json();
            setResultado(data.message || "Cadastro Realizado!");

            setNome("");
            setCargo("");
            setTelefone("");
            consultarTodos();
        }
        catch {
            setResultado("Erro ao cadastrar funcionário.");
        }
    }

    async function consultarPorID() {
        try {
            const resposta = await fetch(`http://localhost:3001/funcionarios/${idConsulta}`);
            const data = await resposta.json();
            setLista([data]);
            setResultado("Consulta realizada.");
        }
        catch {
            setResultado("Erro ao consultar funcionário.");
        }
    }

    async function alterar() {
        if (!idConsulta) {
            setResultado("Informe o ID para alterar.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:3001/funcionarios/${idConsulta}`);
            const data = await resposta.json();

            setNome(data.NOME);
            setCargo(data.CARGO);
            setTelefone(data.TELEFONE);

            setEditando(true);
            setResultado("Dados carregados. Edite e clique em SALVAR.");
        }
        catch {
            setResultado("Erro ao carregar funcionário.");
        }
    }

    async function salvarAlteracao() {
        try {
            const resposta = await fetch(`http://localhost:3001/funcionarios/${idConsulta}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, cargo, telefone })
            });

            const data = await resposta.json();
            setResultado(data.message || "Alterado com sucesso!");
        }
        catch {
            setResultado("Erro ao salvar alteração.");
        }
        setNome("");
        setCargo("");
        setTelefone("");
        setIdConsulta("");
        setEditando(false);

        consultarTodos();
    }

    async function excluir() {
        if (!idConsulta) {
            setResultado("Informe o ID para excluir.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:3001/funcionarios/${idConsulta}`, {
                method: "DELETE"
            });

            const data = await resposta.json();
            setResultado(data.message || "Excluído!");
        }
        catch {
            setResultado("Erro ao excluir funcionário.");
        }
        setIdConsulta("");
        consultarTodos();
    }

    return (
        <div className="container">
            <h1>Cadastro de Funcionários</h1>

            <div className="div1">
                <form onSubmit={(e) => e.preventDefault()}>

                    <p>
                        Nome:
                        <input value={nome} onChange={(e) => setNome(e.target.value)} />
                    </p>

                    <p>
                        Cargo:
                        <input value={cargo} onChange={(e) => setCargo(e.target.value)} />
                    </p>

                    <p>
                        Telefone:
                        <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
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
                <h1>Gerenciar Funcionários</h1>

                <input
                    value={idConsulta}
                    onChange={(e) => setIdConsulta(e.target.value)}
                    placeholder="ID"
                />

                <div className="centro">
                    <button onClick={consultarPorID}>Consultar</button>
                    <button onClick={consultarTodos}>Pesquisa Geral</button>
                    <button onClick={alterar}>Alterar</button>
                    <button onClick={excluir}>Excluir</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((item) => (
                            <tr key={item.ID_FUNCIONARIO}>
                                <td>{item.ID_FUNCIONARIO}</td>
                                <td>{item.NOME}</td>
                                <td>{item.CARGO}</td>
                                <td>{item.TELEFONE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <p><Link to="/">Página Inicial</Link></p>
        </div>
    );
}
