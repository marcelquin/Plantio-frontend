import '../CSS/reset.css'
import '../CSS/BodyStyle.css'
import '../CSS/Gerenciar.css'
import { Link } from 'react-router-dom';
import React from 'react';


function Gerenciar() {

  return (
    <>
    <div className='conteudoGerenciar'>

      <Link to="/area"><div className='menuArea'>
        <h1>Área</h1>
        </div>
      </Link>
      <Link to="/gerenciar_planta_todos"><div className='menuPlanta'>
        <h1>Plantas</h1>
        </div>
      </Link>
    </div>
    </>

  );
}

export default Gerenciar; 