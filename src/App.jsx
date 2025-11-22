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
                <Route path="/pedidos" element={<Pedidos/>}/>
                <Route path="/lanches" element={<Lanches/>}/>
                <Route path="/bebidas" element={<Bebidas/>}/>
                <Route path="/funcionarios" element={<Funcionarios/>}/>
            </Routes>
        </BrowserRouter>
    );
}