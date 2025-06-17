import '../CSS/Planta.css'
import { Link } from 'react-router-dom'

function MenuCategoriaPlanta() {
  return (
    <>
        <Link to="/planta"><button type="button" class="btn btn-outline-success">Todas</button></Link>
        <Link to="/gerenciar_planta_germinacao"><button type="button" class="btn btn-outline-success">Germinação</button></Link>
        <Link to="/gerenciar_planta_muda"><button type="button" class="btn btn-outline-success">Muda</button></Link>
        <Link to="/gerenciar_planta_crecimento"><button type="button" class="btn btn-outline-success">Crecimento</button></Link>
        <Link to="/gerenciar_planta_floracao"><button type="button" class="btn btn-outline-success">Floração</button></Link>
        <Link to="/gerenciar_planta_frutificacao"><button type="button" class="btn btn-outline-success">Frutificação</button></Link>
        <Link to="/gerenciar_planta_maturacao"><button type="button" class="btn btn-outline-success">Maturação</button></Link>
        <Link to="/gerenciar_planta_fim_ciclo"><button type="button" class="btn btn-outline-success">Fim</button></Link>
    </>

  );
}

export default MenuCategoriaPlanta;