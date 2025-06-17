import React from 'react';
import '../CSS/Area.css';
import Gerenciar_AreaPlantio from '../Page/AreaPlantio/Gerencia_AreaPlantio'
import { Link, Links } from 'react-router-dom';


function Area() {
    return (
        <div className='conteudoArea'>

            <div className='boxButton'>
                 <Link to="/nova_area"><button type="button" class="btn btn-outline-success">NOVO CADASTRO</button></Link>
                 <Link to="/localizacao"><button type="button" class="btn btn-outline-success">LOCALIZAÇÕES</button></Link>
            </div>
            <br/>
            <h1>Gerência de área</h1><br/>
            <div className='boxConteudo'><Gerenciar_AreaPlantio/></div>
        </div>
    );
}

export default Area;