import './Pages/CSS/Style.css'
import './Pages/CSS/reset.css'
import { Routes, Route } from 'react-router-dom';
import HeaderComponent from './Pages/Components/header'
import Home from './Pages/Page/Home';
import Gerenciar from './Pages/Page/Gerenciar';
import Area from './Pages/Page/Area';
import Planta from './Pages/Page/Planta';
import Cad_AreaPlantio from './Pages/Page/AreaPlantio/Cad_AreaPlantio';
import GerenciarPlantaGerminacao from './Pages/Page/Planta/GerenciarPlantaGerminacao';
import GerenciaPlantaMuda from './Pages/Page/Planta/GerenciarPlantaMuda';
import GerenciaPlantaCrescimento from './Pages/Page/Planta/GerenciarPlantaCrescimento';
import GerenciarPlantaFloracao from './Pages/Page/Planta/GerenciarPlantaFloracao';
import GerenciarPlantaFrutificacao from './Pages/Page/Planta/GerenciarPlantaFrutificacao';
import GerenciaPlantaMaturacao from './Pages/Page/Planta/GerenciarPlantaMaturacao';
import GerenciarPlantaFimCiclo from './Pages/Page/Planta/GerenciarPlantaFimCiclo';
import GerenciarLinhaseLocalizacoes from './Pages/Page/Linha/GerenciarLinhaeLocalizacoes';
import GerenciaPlanta from './Pages/Page/Planta/GerenciarPanta';


function App() {
  return (
    <>
      <div className='BackgroundGeral'>
          <div className='BoxHeader'>
            <HeaderComponent />
          </div>
          <div className='BoxBody'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gerenciar" element={<Gerenciar />} />
              <Route path="/gerenciar_linha" element={<GerenciarLinhaseLocalizacoes />} />
              <Route path="/gerenciar_planta" element={<GerenciaPlanta />} />
              <Route path="/gerenciar_planta_germinacao" element={<GerenciarPlantaGerminacao />} />
              <Route path="/gerenciar_planta_muda" element={<GerenciaPlantaMuda />} />
              <Route path="/gerenciar_planta_crecimento" element={<GerenciaPlantaCrescimento />} />
              <Route path="/gerenciar_planta_floracao" element={<GerenciarPlantaFloracao />} />
              <Route path="/gerenciar_planta_frutificacao" element={<GerenciarPlantaFrutificacao />} />
              <Route path="/gerenciar_planta_maturacao" element={<GerenciaPlantaMaturacao />} />
              <Route path="/gerenciar_planta_fim_ciclo" element={<GerenciarPlantaFimCiclo />} />
              <Route path="/area" element={<Area />} />
              <Route path="/gerenciar_planta_todos" element={<Planta />} />
              <Route path="/nova_area" element={<Cad_AreaPlantio />} />
            </Routes>
          </div>

      </div>
      

    </>
  );
}

export default App;
