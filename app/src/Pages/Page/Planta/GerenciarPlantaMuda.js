import { useNavigate } from 'react-router-dom';
import '../../CSS/Planta.css';
import React, { useState, useEffect } from 'react';
import MenuCategoriaPlanta from '../../Components/Menu_Categoria_Planta';

function GerenciarPlantaMuda(){

  const UrlGetList = `${process.env.REACT_APP_BACKEND_URL}/planta/ListarPlantasMuda`
  const navigate = useNavigate();
  const [listAll, setListAll] = useState([]);
  const [pesquisaInput, setPesquisaInput] = useState('')


  const response = pesquisaInput.length > 0 ?
  listAll.filter(dados => dados.nomePopular.includes(pesquisaInput)) :
  []

  const handleChange = (e) => {
    setPesquisaInput(e.target.value);
  }

    const getLista = async () => {
        try {
          const response = await fetch(UrlGetList);
          const data = await response.json();
          setListAll(data);
        } catch (error) {
          console.error('Erro ao buscar lista de subáreas:', error);
        }
      };
      
      useEffect(() => {
        getLista();
      }, []);

    const handleInfoPlanta = async (data) => {

    navigate('/gerenciar_planta', { state: { id: data.id } });
};


    return (<>
      <div className='retornoInfoPlanta'>
            <div className='retornoInfoTituloPlanta'>
                <label>Gerência de Plantas</label>
            </div>
            <MenuCategoriaPlanta/>
            {listAll.length === 0 ?(<>   
              <div className="alert alert-warning mt-3">
                    Nenhuma planta encontrada neste Ciclo. 
              </div>
            </>):(<>
            <div clssName='retornoInfoConteudoPlanta'>
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1"></button>
                  <input type="text" class="form-control" name='pesquisaInput' onChange={handleChange} placeholder="Digite o nome popular para pesquisa" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                </div> 
            </div>
            </>)}
            <table class="table">
        <thead>
            <tr>
              <th scope="col">Nome Popular</th>
              <th scope="col">Ciclo Atual</th>
              <th scope="col">Data Último Ciclo</th>
              <th scope="col">Localização</th>
              <th scope="col">Orientações</th>
            </tr>
        </thead>
        
            {pesquisaInput.length > 0 ?(<>
            
                {response.map((data, i)=>{return(<>
                  <tbody key={i}>
                  <tr>
                    <td scope="row">{data.nomePopular}</td>
                    <td>{data.ciclo.ciclo}</td>
                    <td>{data.ciclo.dataUltimoCiclo}</td>
                    <td>{data.localizacao ? (<>{data.localizacao}</>) : (<></>)}</td>
                    <td>{data.instrucoes}</td>
                    <td>
                      <button type="button" class="btn btn-warning" onClick={() => handleInfoPlanta(data)}>Gerenciar</button>                 
                    </td>                  
                  </tr>
                </tbody>
                </>)})}
            
            </>) : (<>
            
                {listAll.map((data, i)=>{return(<>
                  <tbody key={i}>
                  <tr>
                    <td scope="row">{data.nomePopular}</td>
                    <td>{data.ciclo.ciclo}</td>
                    <td>{data.ciclo.dataUltimoCiclo}</td>
                    <td>{data.localizacao ? (<>{data.localizacao}</>) : (<></>)}</td>
                    <td>{data.instrucoes}</td>
                    <td>
                      <button type="button" class="btn btn-warning" onClick={() => handleInfoPlanta(data)}>Gerenciar</button>                 
                    </td>                  
                  </tr>
                </tbody>
                </>)})}
            
            </>)}              
              </table>
        </div>
            <br/><br/><br/>
   </>);
};
export default GerenciarPlantaMuda;