import '../CSS/reset.css'
import '../CSS/BodyStyle.css'
import '../CSS/Home.css'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {

  const UrlGetList = `${process.env.REACT_APP_BACKEND_URL}/planta/ListarPlantas`
  //const UrlGetList = "http://192.168.0.24:8080/planta/ListarPlantas"

  const [listAll, setlistAll] = useState([]);
  const [pesquisaInput, setPesquisaInput] = useState('')

  const getListaAll = async () => {
    try {
      const response = await fetch(UrlGetList);
      const data = await response.json();
      setlistAll(data);
    } catch (error) {
      console.error('Erro ao buscar lista de subáreas:', error);
    }
  };

  const handleChange = (e) => {
    setPesquisaInput(e.target.value);
  }

  const response = pesquisaInput.length > 0 ?
  listAll.filter(dados => dados.nomePopular.includes(pesquisaInput)) :
  []

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    getListaAll();
  }, []);




return (
    <>
        <div className="conteudoBox">
            <h1>GERENCIAMENTO DE PLANTAS</h1> <br/>
            <div class="input-group mb-3">
              <button class="btn btn-outline-secondary" type="button" id="button-addon1"></button>
              <input type="text" class="form-control" name='pesquisaInput' onChange={handleChange} placeholder="Digite o nome para pesquisa" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
            </div>

            <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Nome Popular</th>
                      <th scope="col">Localização</th>
                      <th scope="col">Ciclo Atual</th>
                      <th scope="col">Data de Plantio</th>
                      <th scope="col">Ciclo Anterior</th>                 
                    </tr>
                  </thead> 

                  {pesquisaInput.length > 0 ?(<>
                    {response.map((data, i)=>{return(<>
                    <tbody key={i}>
                      <tr>
                        <td scope="row">{data.nomePopular}</td>
                        <td>{data.localizacao ? (<>{data.localizacao.referencia}</>) : (<></>)}</td>
                        <td>{data.ciclo.ciclo}</td>
                        <td>{data.ciclo.dataUltimoCiclo}</td>
                        <td>{data.ciclo.dataCicloAtual}</td>
                      </tr>
                    </tbody>
                  </>)})}
                  
                  </>) : (<>
                  
                    {listAll.map((data, i)=>{return(<>
                    <tbody key={i}>
                    <tr>
                        <td scope="row">{data.nomePopular}</td>
                        <td>{data.localizacao ? (<>{data.localizacao.referencia}</>) : (<></>)}</td>
                        <td>{data.ciclo.ciclo}</td>
                        <td>{data.ciclo.dataUltimoCiclo}</td>
                        <td>{data.ciclo.dataCicloAtual}</td>
                      </tr>
                    </tbody>
                  </>)})}

                  </>)}

                  
                  </table>    
            </div>
    </>
  );
}

export default Home;