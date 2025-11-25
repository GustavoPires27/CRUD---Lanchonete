import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pedidos() {

    const [funcionario, setFuncionario] = useState("");
    const [lanche, setLanche] = useState("");
    const [bebida, setBebida] = useState("");
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [listaLanches, setListaLanches] = useState([]);
    const [listaBebidas, setListaBebidas] = useState([]);
    const [listaPedidos, setListaPedidos] = useState([]);
    const [idConsulta, setIdConsulta] = useState("");
    const [resultado, setResultado] = useState("");
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        carregarCombos();
    }, []);

    async function carregarCombos() {
        const f = await fetch("http://localhost:3001/funcionarios");
        const l = await fetch("http://localhost:3001/lanches");
        const b = await fetch("http://localhost:3001/bebidas");

        setListaFuncionarios(await f.json());
        setListaLanches(await l.json());
        setListaBebidas(await b.json());
    }

    async function consultarTodos() {
        const resposta = await fetch("http://localhost:3001/pedidos");
        const data = await resposta.json();
        setListaPedidos(data);
        setResultado("Consulta geral realizada.");
    }

    async function cadastrar() {
        if (!funcionario) {
            setResultado("Selecione um funcionário.");
            return;
        }

        const body = {
            id_funcionario: funcionario,
            id_lanche: lanche || null,
            id_bebida: bebida || null
        };

        const resposta = await fetch("http://localhost:3001/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await resposta.json();
        setResultado(data.message || "Pedido cadastrado!");

        setFuncionario("");
        setLanche("");
        setBebida("");

        consultarTodos();
    }

    async function consultarPorID() {
        const resposta = await fetch(`http://localhost:3001/pedidos/${idConsulta}`);
        const data = await resposta.json();
        setListaPedidos([data]);
        setResultado("Consulta realizada.");
    }

    async function alterar() {
        const resposta = await fetch(`http://localhost:3001/pedidos/${idConsulta}`);
        const data = await resposta.json();

        setFuncionario(data.ID_FUNCIONARIO);
        setLanche(data.ID_LANCHE || "");
        setBebida(data.ID_BEBIDA || "");

        setEditando(true);
        setResultado("Dados carregados.");
    }

    async function salvarAlteracao() {
        const body = {
            id_funcionario: funcionario,
            id_lanche: lanche || null,
            id_bebida: bebida || null
        };

        const resposta = await fetch(`http://localhost:3001/pedidos/${idConsulta}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await resposta.json();

        setResultado(data.message || "Alterado!");

        setFuncionario("");
        setLanche("");
        setBebida("");
        setIdConsulta("");
        setEditando(false);

        consultarTodos();
    }

    async function excluir() {
        const resposta = await fetch(`http://localhost:3001/pedidos/${idConsulta}`, {
            method: "DELETE"
        });

        const data = await resposta.text();
        setResultado(data.message || "Excluído!");

        setIdConsulta("");
        consultarTodos();
    }

    return (
        <div className="container">

            <h1>Cadastro de Pedidos</h1>

            <div className="div1">

                <p>
                    Funcionário:
                    <select value={funcionario} onChange={(e) => setFuncionario(e.target.value)}>
                        <option value="">Selecione</option>
                        {listaFuncionarios.map(f => (
                            <option key={f.ID_FUNCIONARIO} value={f.ID_FUNCIONARIO}>
                                {f.NOME}
                            </option>
                        ))}
                    </select>
                </p>

                <p>
                    Lanche (opcional):
                    <select value={lanche} onChange={(e) => setLanche(e.target.value)}>
                        <option value="">Nenhum</option>
                        {listaLanches.map(l => (
                            <option key={l.ID_LANCHE} value={l.ID_LANCHE}>{l.NOME}</option>
                        ))}
                    </select>
                </p>

                <p>
                    Bebida (opcional):
                    <select value={bebida} onChange={(e) => setBebida(e.target.value)}>
                        <option value="">Nenhuma</option>
                        {listaBebidas.map(b => (
                            <option key={b.ID_BEBIDA} value={b.ID_BEBIDA}>{b.NOME}</option>
                        ))}
                    </select>
                </p>

                {!editando ? (
                    <button onClick={cadastrar}>Cadastrar Pedido</button>
                ) : (
                    <button onClick={salvarAlteracao}>Salvar Alteração</button>
                )}

                <p>{resultado}</p>

            </div>

            <div className="div2">

                <h1>Gerenciar Pedidos</h1>

                <input
                    value={idConsulta}
                    onChange={(e) => setIdConsulta(e.target.value)}
                    placeholder="ID do pedido"
                />

                <div className="centro">
                    <button onClick={consultarPorID}>Consultar Pedido</button>
                    <button onClick={consultarTodos}>Pesquisa Geral</button>
                    <button onClick={alterar}>Alterar Pedido</button>
                    <button onClick={excluir}>Excluir Pedido</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Funcionário</th>
                            <th>Lanche</th>
                            <th>Bebida</th>
                            <th>Data/Hora</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaPedidos.map(item => (
                            <tr key={item.ID_PEDIDO}>
                                <td>{item.ID_PEDIDO}</td>
                                <td>{item.FUNCIONARIO}</td>
                                <td>{item.LANCHE || "—"}</td>
                                <td>{item.BEBIDA || "—"}</td>
                                <td>{item.DATA_HORA}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <p><Link to="/">Página Inicial</Link></p>

        </div>
    );
}
