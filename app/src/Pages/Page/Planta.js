import React, { useState, useEffect } from 'react';
import '../CSS/Planta.css';
import { Link } from 'react-router-dom';
import GerenciarPlantaTodos from './Planta/GerenciarPlantaTodos';


function Planta() {

    return (<>
        <GerenciarPlantaTodos/>
   </> );
}

export default Planta;