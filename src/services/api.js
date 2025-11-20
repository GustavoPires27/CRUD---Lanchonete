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
        console.log("Erro ao conectar no banco de dados:", erro);
    } else {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    }
});

app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:" + PORT);
});

// LISTAR TODAS AS BEBIDAS
app.get("/bebidas", (req, res) => {
    const sql = "SELECT * FROM BEBIDAS";

    banco.query(sql, (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).send("Erro ao consultar bebidas");
        }
        return res.status(200).json(resultados);
    });
});

// CONSULTAR POR ID
app.get("/bebidas/:ID", (req, res) => {
    const { ID } = req.params;
    const sql = "SELECT * FROM BEBIDAS WHERE ID_BEBIDA = ?";

    banco.query(sql, [ID], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json("Erro ao consultar bebida");
        }

        if (resultados.length === 0) {
            return res.status(404).send("Bebida não encontrada");
        }

        return res.status(200).json(resultados[0]);
    });
});

// CADASTRAR BEBIDA
app.post("/bebidas", (req, res) => {
    const { nome, tamanho, preco } = req.body;
    const sql = "INSERT INTO BEBIDAS (NOME, TAMANHO, PRECO) VALUES (?, ?, ?)";

    banco.query(sql, [nome, tamanho, preco], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json("Erro ao cadastrar bebida");
        }

        return res.status(201).json({
            message: "Bebida cadastrada com sucesso",
            id: resultados.insertId
        });
    });
});

// ATUALIZAR BEBIDA
app.put("/bebidas/:ID", (req, res) => {
    const { ID } = req.params;
    const { nome, tamanho, preco } = req.body;

    const sql = "UPDATE BEBIDAS SET NOME = ?, TAMANHO = ?, PRECO = ? WHERE ID_BEBIDA = ?";

    banco.query(sql, [nome, tamanho, preco, ID], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ error: "Erro ao atualizar bebida" });
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({ message: "Bebida não encontrada" });
        }

        return res.status(200).json({ message: `Bebida com o ID ${ID} atualizada com sucesso` });
    });
});

// DELETAR BEBIDA
app.delete("/bebidas/:ID", (req, res) => {
    const { ID } = req.params;

    const sql = "DELETE FROM BEBIDAS WHERE ID_BEBIDA = ?";

    banco.query(sql, [ID], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ error: "Erro ao deletar bebida" });
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({ message: "Bebida não encontrada" });
        }

        return res.status(200).json({ message: `Bebida com o ID ${ID} deletada com sucesso` });
    });
});
