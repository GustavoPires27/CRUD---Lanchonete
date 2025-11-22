import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Pedidos() {

    const [IDLanche, setIDLanche] = useState("");
    const [IDBebida, setIDBebida] = useState("");
    const [IDFuncionario, setIDFuncionario] = useState("");

    const [lanches, setLanches] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/lanches").then(res => setLanches(res.data));
        axios.get("http://localhost:3001/bebidas").then(res => setBebidas(res.data));
        axios.get("http://localhost:3001/funcionarios").then(res => setFuncionarios(res.data));
        axios.get("http://localhost:3001/pedidos").then(res => setPedidos(res.data));
    }, []);

    function cadastrar(e) {
        e.preventDefault();

        if (!IDLanche || !IDBebida || !IDFuncionario) {
            alert("Preencha todos os campos!");
            return;
        }

        axios.post("http://localhost:3001/pedidos", {
            IDLanche: Number(IDLanche),
            IDBebida: Number(IDBebida),
            IDFuncionario: Number(IDFuncionario)
        }).then(() => {
            axios.get("http://localhost:3001/pedidos").then(res => setPedidos(res.data));
            setIDLanche("");
            setIDBebida("");
            setIDFuncionario("");
        });
    }

    function excluir(id) {
        axios.delete(`http://localhost:3001/pedidos/${id}`).then(() => {
            axios.get("http://localhost:3001/pedidos").then(res => setPedidos(res.data));
        });
    }

    return (
        <div>
            <h1>Cadastro de Pedidos</h1>

            <form onSubmit={cadastrar}>
                <select value={IDLanche} onChange={(e) => setIDLanche(e.target.value)}>
                    <option value="">Selecione um lanche</option>
                    {lanches.map((l) => (
                        <option key={l.ID_LANCHE} value={l.ID_LANCHE}>
                            {l.NOME}
                        </option>
                    ))}
                </select>

                <select value={IDBebida} onChange={(e) => setIDBebida(e.target.value)}>
                    <option value="">Selecione uma bebida</option>
                    {bebidas.map((b) => (
                        <option key={b.ID_BEBIDA} value={b.ID_BEBIDA}>
                            {b.NOME} - {b.TAMANHO}
                        </option>
                    ))}
                </select>

                <select value={IDFuncionario} onChange={(e) => setIDFuncionario(e.target.value)}>
                    <option value="">Selecione o funcionário</option>
                    {funcionarios.map((f) => (
                        <option key={f.ID_FUNCIONARIO} value={f.ID_FUNCIONARIO}>
                            {f.NOME}
                        </option>
                    ))}
                </select>

                <button type="submit">Cadastrar Pedido</button>
            </form>

            <h2>Pedidos Cadastrados</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lanche</th>
                        <th>Bebida</th>
                        <th>Funcionário</th>
                        <th>Data/Hora</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((p) => (
                        <tr key={p.IDPedido}>
                            <td>{p.IDPedido}</td>
                            <td>{p.Lanche}</td>
                            <td>{p.Bebida}</td>
                            <td>{p.Funcionario}</td>
                            <td>{p.DataHora}</td>
                            <td>
                                <button onClick={() => excluir(p.IDPedido)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />
            <Link to="/">Voltar ao Menu</Link>
        </div>
    );
}
