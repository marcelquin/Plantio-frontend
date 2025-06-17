import '../CSS/HeaderStyle.css'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <>
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/gerenciar">Gerenciar</Link>
        </li>
      </ul>
      <Link to="/"></Link>
      <Link to="/gerenciar"></Link>
    </>

  );
}

export default Menu;