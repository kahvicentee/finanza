import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Movimentacoes from "./pages/movimentacoes";
import Historico from "./pages/historico";
import Graficos from "./pages/graficos";
import Planilhas from "./pages/planilhas";
import Usuario from "./pages/usuario";

export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio /> } />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/movimentacoes" element={<Movimentacoes />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/graficos" element={<Graficos />} />
                <Route path="/planilhas" element={<Planilhas />} />
                <Route path="/usuario" element={<Usuario />} />
            </Routes>
        </BrowserRouter>
    )
}