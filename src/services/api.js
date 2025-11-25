import express from "express";
import cors from "cors";
import mysql2 from "mysql2";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const banco = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123Mudar",
    database: "SGL"
});

banco.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar no banco:", erro);
    } else {
        console.log("Banco conectado!");
    }
});

app.get("/bebidas", (req, res) => {
    banco.query("SELECT * FROM BEBIDAS", (erro, resultados) => {
        if (erro) return res.status(500).send("Erro ao consultar bebidas");
        res.json(resultados);
    });
});

app.get("/bebidas/:ID", (req, res) => {
    banco.query(
        "SELECT * FROM BEBIDAS WHERE ID_BEBIDA = ?",
        [req.params.ID],
        (erro, resultados) => {
            if (erro) return res.status(500).send("Erro ao buscar bebida");
            if (resultados.length === 0) return res.status(404).send("Não encontrada");
            res.json(resultados[0]);
        }
    );
});

app.post("/bebidas", (req, res) => {
    const { nome, tamanho, preco } = req.body;
    banco.query(
        "INSERT INTO BEBIDAS (NOME, TAMANHO, PRECO) VALUES (?, ?, ?)",
        [nome, tamanho, preco],
        (erro, resultados) => {
            if (erro) return res.status(500).send("Erro ao cadastrar bebida");
            res.status(201).json({ id: resultados.insertId });
        }
    );
});

app.put("/bebidas/:ID", (req, res) => {
    const { nome, tamanho, preco } = req.body;
    banco.query(
        "UPDATE BEBIDAS SET NOME=?, TAMANHO=?, PRECO=? WHERE ID_BEBIDA=?",
        [nome, tamanho, preco, req.params.ID],
        (erro) => {
            if (erro) return res.status(500).send("Erro ao atualizar bebida");
            res.send("Bebida atualizada");
        }
    );
});

app.delete("/bebidas/:ID", (req, res) => {
    banco.query(
        "DELETE FROM BEBIDAS WHERE ID_BEBIDA=?",
        [req.params.ID],
        (erro) => {
            if (erro) return res.status(500).send("Erro ao excluir bebida");
            res.send("Bebida excluída");
        }
    );
});

app.get("/lanches", (req, res) => {
    banco.query("SELECT * FROM LANCHES", (erro, resultados) => {
        if (erro) return res.status(500).send("Erro ao consultar lanches");
        res.json(resultados);
    });
});

app.get("/lanches/:ID", (req, res) => {
    banco.query(
        "SELECT * FROM LANCHES WHERE ID_LANCHE = ?",
        [req.params.ID],
        (erro, resultados) => {
            if (erro) return res.status(500).send("Erro ao buscar lanche");
            if (resultados.length === 0) return res.status(404).send("Não encontrada");
            res.json(resultados[0]);
        }
    );
});


app.post("/lanches", (req, res) => {
    const { nome, descricao, preco } = req.body;
    banco.query(
        "INSERT INTO LANCHES (NOME, DESCRICAO, PRECO) VALUES (?, ?, ?)",
        [nome, descricao, preco],
        (erro, resultados) => {
            if (erro) return res.status(500).send("Erro ao cadastrar lanche");
            res.json({ id: resultados.insertId });
        }
    );
});

app.put("/lanches/:ID", (req, res) => {
    const { nome, descricao, preco } = req.body;
    banco.query(
        "UPDATE LANCHES SET NOME=?, DESCRICAO=?, PRECO=? WHERE ID_LANCHE=?",
        [nome, descricao, preco, req.params.ID],
        (erro) => {
            if (erro) return res.status(500).send("Erro ao atualizar lanche");
            res.send("Lanche atualizado");
        }
    );
});

app.delete("/lanches/:ID", (req, res) => {
    banco.query(
        "DELETE FROM LANCHES WHERE ID_LANCHE=?",
        [req.params.ID],
        (erro) => {
            if (erro) return res.status(500).send("Erro ao excluir lanche");
            res.send("Lanche excluído");
        }
    );
});



app.get("/funcionarios", (req, res) => {
    banco.query("SELECT * FROM FUNCIONARIOS", (erro, resultados) => {
        if (erro) return res.status(500).send("Erro ao consultar funcionários");
        res.json(resultados);
    });
});

app.get("/funcionarios/:ID", (req, res) => {
    banco.query(
        "SELECT * FROM FUNCIONARIOS WHERE ID_FUNCIONARIO = ?",
        [req.params.ID],
        (erro, resultados) => {
            if (erro) return res.status(500).send("Erro ao buscar lanche");
            if (resultados.length === 0) return res.status(404).send("Não encontrada");
            res.json(resultados[0]);
        }
    );
});

app.post("/funcionarios", (req, res) => {
    const { nome, cargo, telefone } = req.body;
    banco.query(
        "INSERT INTO FUNCIONARIOS (NOME, CARGO, TELEFONE) VALUES (?, ?, ?)",
        [nome, cargo, telefone],
        (erro, resultados) => {
            if (erro) return res.status(500).send("Erro ao cadastrar funcionário");
            res.json({ id: resultados.insertId });
        }
    );
});

app.put("/funcionarios/:ID", (req, res) => {
    const { nome, cargo, telefone } = req.body;
    banco.query(
        "UPDATE FUNCIONARIOS SET NOME=?, CARGO=?, TELEFONE=? WHERE ID_FUNCIONARIO=?",
        [nome, cargo, telefone, req.params.ID],
        (erro) => {
            if (erro) return res.status(500).send("Erro ao atualizar funcionário");
            res.send("Funcionário atualizado");
        }
    );
});

app.delete("/funcionarios/:ID", (req, res) => {
    banco.query(
        "DELETE FROM FUNCIONARIOS WHERE ID_FUNCIONARIO = ?",
        [req.params.ID],
        (erro) => {
            if (erro) return res.status(500).send("Erro ao excluir funcionário");
            res.send("Funcionário excluído");
        }
    );
});

app.get("/pedidos", (req, res) => {
    const sql = `
        SELECT 
            p.ID_PEDIDO,
            p.DATA_HORA,
            l.NOME AS LANCHE,
            b.NOME AS BEBIDA,
            f.NOME AS FUNCIONARIO
        FROM PEDIDOS p
        LEFT JOIN LANCHES l ON p.ID_LANCHE = l.ID_LANCHE
        LEFT JOIN BEBIDAS b ON p.ID_BEBIDA = b.ID_BEBIDA
        LEFT JOIN FUNCIONARIOS f ON p.ID_FUNCIONARIO = f.ID_FUNCIONARIO
        ORDER BY p.ID_PEDIDO DESC
    `;

    banco.query(sql, (erro, resultados) => {
        if (erro) return res.status(500).send("Erro ao listar pedidos");
        res.json(resultados);
    });
});

app.get("/pedidos/:ID", (req, res) => {
    const sql = `
        SELECT 
            p.ID_PEDIDO,
            p.DATA_HORA,
            f.NOME AS FUNCIONARIO,
            l.NOME AS LANCHE,
            b.NOME AS BEBIDA
        FROM PEDIDOS p
        LEFT JOIN FUNCIONARIOS f ON p.ID_FUNCIONARIO = f.ID_FUNCIONARIO
        LEFT JOIN LANCHES l ON p.ID_LANCHE = l.ID_LANCHE
        LEFT JOIN BEBIDAS b ON p.ID_BEBIDA = b.ID_BEBIDA
        WHERE p.ID_PEDIDO = ?
    `;

    banco.query(sql, [req.params.ID], (erro, resultados) => {
        if (erro) return res.status(500).send("Erro ao consultar pedido");
        res.json(resultados[0]);
    });
});



app.post("/pedidos", (req, res) => {
    let { id_lanche, id_bebida, id_funcionario } = req.body;

    id_lanche = Number(id_lanche);
    id_bebida = Number(id_bebida);
    id_funcionario = Number(id_funcionario);

    const sql = `
        INSERT INTO pedidos (ID_LANCHE, ID_BEBIDA, ID_FUNCIONARIO, DATA_HORA)
        VALUES (?, ?, ?, NOW())
    `;

    banco.query(sql, [id_lanche, id_bebida, id_funcionario], (erro) => {
        if (erro) {
            console.error("Erro ao cadastrar pedido:", erro);
            return res.status(500).json({ message: "Erro ao cadastrar pedido" });
        }
        res.json({ message: "Pedido cadastrado com sucesso!" });
    });
});


app.put("/pedidos/:ID", (req, res) => {
    const { id_funcionario, id_lanche, id_bebida } = req.body;

    const sql = `
        UPDATE PEDIDOS 
        SET ID_FUNCIONARIO=?, ID_LANCHE=?, ID_BEBIDA=? 
        WHERE ID_PEDIDO=?
    `;

    banco.query(sql, [id_funcionario, id_lanche, id_bebida, req.params.ID], (erro) => {
        if (erro) return res.status(500).send("Erro ao atualizar pedido");
        res.json({ message: "Pedido atualizado!" });
    });
});


app.delete("/pedidos/:ID", (req, res) => {
    banco.query(
        "DELETE FROM pedidos WHERE ID_PEDIDO = ?",
        [req.params.id],
        (erro) => {
            if (erro) return res.status(500).send("Erro ao excluir pedido");
            res.send("Pedido excluído");
        }
    );
});

app.listen(PORT, () => {
    console.log("Servidor rodando em: http://localhost:" + PORT);
});