import '../CSS/Planta.css'
import { Link } from 'react-router-dom'

function MenuLocalizacao() {
  return (
    <>
        <Link to="/localizacao"><button type="button" class="btn btn-outline-success">Disponiveis</button></Link>
        <Link to="/localizacao_todos"><button type="button" class="btn btn-outline-success">Todas</button></Link>
    </>

  );
}

export default MenuLocalizacao;