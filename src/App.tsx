import { Routes, Route } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/Home";
import { Competicoes } from "@/pages/Competicoes";
import { TimePerfil } from "@/pages/TimePerfil";
import { Estatisticas } from "@/pages/Estatisticas";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/competicoes" element={<Competicoes />} />
        <Route path="/time/:id" element={<TimePerfil />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
