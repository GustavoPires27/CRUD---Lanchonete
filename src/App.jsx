import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css";
import Home from "./Paginas/Home";
import Pedidos from "./Paginas/Pedidos";
import Lanches from "./Paginas/Lanches";
import Bebidas from "./Paginas/Bebidas";
import Funcionarios from "./Paginas/Funcionarios";


export default function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Pedidos" element={<Pedidos/>}/>
                <Route path="/Lanches" element={<Lanches/>}/>
                <Route path="/Bebidas" element={<Bebidas/>}/>
                <Route path="/Funcionarios" element={<Funcionarios/>}/>
            </Routes>
        </BrowserRouter>
    );
}