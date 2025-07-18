import React from 'react';
import '../CSS/Area.css';
import Gerenciar_AreaPlantio from '../Page/AreaPlantio/Gerencia_AreaPlantio'
import { Link, Links } from 'react-router-dom';


function Area() {
    return (
        <div className='conteudoArea'>

            <div className='boxButton'>
                 <h1>Gerência de área</h1><br/>
                 <Link to="/nova_area"><button type="button" class="btn btn-outline-success">NOVO CADASTRO</button></Link>
                 <Link to="/gerenciar_planta_todos"><button type="button" class="btn btn-outline-success">GERENCIAR PLANTAS</button></Link>

            </div>
            <br/>
           
            <div className='boxConteudo'><Gerenciar_AreaPlantio/></div>
        </div>
    );
}

export default Area;