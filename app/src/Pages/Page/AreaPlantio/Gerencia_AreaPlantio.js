import '../../CSS/BodyStyle.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Edit_AreaPlantio from './Edit_AreaPlantio';
import RelatorioPlantio from '../Plantio/RelatorioPlantio';
import AdubacaoPlantio from '../Plantio/AdubacaoPlantio';
import RelatorioArea from './RelatorioArea';
import GerenciarLinhaseLocalizacoes from '../Linha/GerenciarLinhaeLocalizacoes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Gerencia_AreaPlantio() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);     
  const UrlGetList = `${process.env.REACT_APP_BACKEND_URL}/area/ListarAreas` 
  const UrlPost = `${process.env.REACT_APP_BACKEND_URL}/plantio/NovoPlantio`
  const UrlPostLinha = `${process.env.REACT_APP_BACKEND_URL}/linha/NovaLinha`
  const UrlDeletePlantio = `${process.env.REACT_APP_BACKEND_URL}/plantio/DeletarPlantioPorId`
  const UrlDeleteLinha = `${process.env.REACT_APP_BACKEND_URL}/linha/DeletarLinhaPorId`
  const UrlDeleteArea = `${process.env.REACT_APP_BACKEND_URL}/area/DeletarAreaPorId`
  const [listAll, setlistAll] = useState([]);
  const [pesquisaInput, setPesquisaInput] = useState('');
  const [loading, setLoading] = useState(false);

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
  listAll.filter(dados => dados.nome.includes(pesquisaInput)) :
  []
//AREA
//AREA BODY
  const [dataPutArea, setDataPutArea] = useState({
    id: '',
    nome: '',
    dimensao: '',
    gps: ''
  });

  const[relatorioArea, setRelatorioArea]=useState({
    nome: '',
    dimensao: '',
    gps: '',
    plantios:'',
  })
//AREA REQUEST
const handlePutArea = async (data) => {
  const newData = {
  id: data.id,
  nome: data.nome,
  dimensao: data.dimensao,
  gps: data.gps
  };
  
  await setDataPutArea(newData);
  
  setModalContent('putArea');
  setShowModal(true);
  };

  const handleRelatorioArea = async (data) => {
  const newData = {
    nome: data.nome,
    dimensao: data.dimensao,
    gps: data.gps,
    plantios: data.plantios
  };
  
  await setRelatorioArea(newData);
  
  setModalContent('relatorioArea');
  setShowModal(true);
  };

const handleDeleteArea = async (areaId) => {
  // Adiciona confirmação antes de excluir
  const confirmDelete = window.confirm('Tem certeza que deseja excluir esta área? Esta ação não pode ser desfeita.');
  
  if (!confirmDelete) {
    return; // Cancela a exclusão se o usuário não confirmar
  }
  
  try {
    setLoading(true);
    const response = await fetch(UrlDeleteArea, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          areaId: areaId
        })
      })
      .then(window.location.reload());
    
    if (!response.ok) throw new Error('Erro ao excluir área');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    setLoading(false);
  }
};

//PLANTIO
//PLANTIO BODY
  const[relatorioPlantio, setRelatorioPlantio]=useState({
    notificacoes: ''
  })

    const[adubacaoPlantio, setAdubacaoPlantio]=useState({
    id: '',
    identificador: '',
    numero: '',
  })

//PLANTIO REQUEST
const handleAddPlantio = async (areaId) => {
  try {
    const response = await fetch(UrlPost, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          areaId: areaId
        })
      })
      .then(window.location.reload());
    
    if (!response.ok) throw new Error('Erro ao adicionar plantio');
  } catch (error) {
    console.error('Erro:', error);
  }
};

const handleDeletePlantio = async (areaId, plantioId) => {
  // Adiciona confirmação antes de excluir
  const confirmDelete = window.confirm('Tem certeza que deseja excluir este plantio? Esta ação não pode ser desfeita.');
  
  if (!confirmDelete) {
    return; // Cancela a exclusão se o usuário não confirmar
  }
  
  try {
    setLoading(true);
    const response = await fetch(UrlDeletePlantio, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          areaId: areaId,
          plantioId: plantioId
        })
      })
      .then(window.location.reload());
    
    if (!response.ok) throw new Error('Erro ao excluir plantio');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    setLoading(false);
  }
};

const handleAdubacaoPlantio = async (data) => {
  const newData = {
    id: data.id,
    identificador: data.identificador,
    numero: data.numero,
  };
  
  await setAdubacaoPlantio(newData);
  
  setModalContent('AdubacaoPlantio');
  setShowModal(true);
  };

const handlerelatorioPlantio = async (data) => {
  const newData = {
  notificacoes: data.notificacoes
  };
  
  
  await setRelatorioPlantio(newData);
  
  setModalContent('relatorioPlantio');
  setShowModal(true);
  };

//LINHAS
const[infoLinha, setInfoLinha]=useState({
    id: '',
  })

//LINHA REQUEST
const handleAddPLinha = async (plantioId) => {
  try {
    const response = await fetch(UrlPostLinha, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          plantioId: plantioId
        })
      })
      .then(window.location.reload());
    
    if (!response.ok) throw new Error('Erro ao adicionar plantio');
  } catch (error) {
    console.error('Erro:', error);
  }
};

const handleDeleteLinha = async (plantioId, linhaId) => {
  // Adiciona confirmação antes de excluir
  const confirmDelete = window.confirm('Tem certeza que deseja excluir esta linha? Esta ação não pode ser desfeita.');
  
  if (!confirmDelete) {
    return; // Cancela a exclusão se o usuário não confirmar
  }
  
  try {
    setLoading(true);
    const response = await fetch(UrlDeleteLinha, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          plantioId: plantioId,
          linhaId: linhaId
        })
      })
      .then(window.location.reload());
    
    if (!response.ok) throw new Error('Erro ao excluir linha');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    setLoading(false);
  }
};

const handleInfoLinha = async (data) => {
  const newData = {
    id: data.id
  };
  
  await setInfoLinha(newData);
  navigate('/gerenciar_linha', { state: { id: data.id } });
};


  useEffect(() => {
    getListaAll();
  }, []);

  return (<>
  
       {listAll.length === 0 ? (
        <div className="alert alert-warning mt-3">
          Nenhuma área encontrada. Por favor, adicione uma nova área.
        </div>
       ) : pesquisaInput.length > 0 ?(<>
       
        {response.map((area, i)=>{return(<>
          <div className="input-group mb-3">
              <button class="btn btn-outline-secondary" type="button" id="button-addon1"></button>
              <input type="text" class="form-control" name="pesquisaInput" onChange={handleChange} placeholder="Digite o nome da área para pesquisa" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
            </div>
          <div className='areaRetornoInfo'>
            <details>
              <summary>{area.nome}</summary>
              <div className='areaRetornoBlocoButton'>
                    <table>
                        <tbody>
                          <tr>
                            <td>
                              <button type="button" class="btn btn-success" onClick={() => {handleAddPlantio(area.id);}}>+ Plantio</button>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                      Ações
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li><a className="dropdown-item" onClick={() => {handlePutArea(area);}}>Editar Informações</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleRelatorioArea(area);}}>Relatorio</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleDeleteArea(area.id);}}>Excluir</a></li>
                                    </ul>
                                </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
              </div>
              {area.plantios?(<>
              <div className='areaRetornoBlocoPlantio'>
                
                {area.plantios.map((plantio,i)=>{return(<>
                  <div className='areaRetornoBlocobox'>
                   <details key={i}>
                    <summary>{plantio.identificador}</summary>
                    <div className='areaRetornoBlocoPlantio'>
                      <table>
                        <tbody>
                          <tr>
                            <td>                                  
                              <button type="button" class="btn btn-success" onClick={() => {handleAddPLinha(plantio.id);}}>+ Linha</button>   
                            </td>
                            <td>
                              <div className="btn-group">
                                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                      Ações
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li><a className="dropdown-item" onClick={() => {handlerelatorioPlantio(plantio);}}>Eventos</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleAdubacaoPlantio(plantio);}}>Adubação</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleDeletePlantio(area.id,plantio.id);}}>Excluir</a></li>
                                    </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {plantio.linhas?(<>
                      <div className='areaRetornoBlocolinha'>
                        {plantio.linhas.map((linha,i)=>{return(<>
                          <div className='areaRetornoBlocolinhabox' key={i}>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <a className="dropdown-item" onClick={() => {handleInfoLinha(linha);}}>{linha.identificador}</a>   
                                  </td>
                                  <td>
                                    <a className="dropdown-item" onClick={() => {handleDeleteLinha(plantio.id, linha.id);}}>Excluir</a> 
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>          
                        </>)})}
                        </div>
                      </>):(<></>)}
                      
                    </div>
                   </details>
                  </div>
              </>)})}
              </div>
           
              </>):(<></>)}
              
            </details>
          </div>
          
          </>)})}

       </>) : (<>

          {listAll.map((area, i)=>{return(<>
          <div className="input-group mb-3">
              <button class="btn btn-outline-secondary" type="button" id="button-addon1"></button>
              <input type="text" class="form-control" name="pesquisaInput" onChange={handleChange} placeholder="Digite o nome da área para pesquisa" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
            </div>
          <div className='areaRetornoInfo'>
            <details open>
              <summary>{area.nome}</summary>
              <div className='areaRetornoBlocoButton'>
                    <table>
                        <tbody>
                          <tr>
                            <td>
                              <button type="button" class="btn btn-success" onClick={() => {handleAddPlantio(area.id);}}>+ Plantio</button>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                      Ações
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li><a className="dropdown-item" onClick={() => {handlePutArea(area);}}>Editar Informações</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleRelatorioArea(area);}}>Relatorio</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleDeleteArea(area.id);}}>Excluir</a></li>
                                    </ul>
                                </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
              </div>
              {area.plantios?(<>
              <div className='areaRetornoBlocoPlantio'>
                
                {area.plantios.map((plantio,i)=>{return(<>
                  <div className='areaRetornoBlocobox'>
                   <details key={i} open>
                    <summary>{plantio.identificador}</summary>
                    <div className='areaRetornoBlocoPlantio'>
                      <table>
                        <tbody>
                          <tr>
                            <td>                                  
                              <button type="button" class="btn btn-success" onClick={() => {handleAddPLinha(plantio.id);}}>+ Linha</button>   
                            </td>
                            <td>
                              <div className="btn-group">
                                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                      Ações
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li><a className="dropdown-item" onClick={() => {handlerelatorioPlantio(plantio);}}>Eventos</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleAdubacaoPlantio(plantio);}}>Adubação</a></li>
                                      <li><a className="dropdown-item" onClick={() => {handleDeletePlantio(area.id,plantio.id);}}>Excluir</a></li>
                                    </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {plantio.linhas?(<>
                      <div className='areaRetornoBlocolinha'>
                        {plantio.linhas.map((linha,i)=>{return(<>
                          <div className='areaRetornoBlocolinhabox' key={i}>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <a className="dropdown-item" onClick={() => {handleInfoLinha(linha);}}>{linha.identificador}</a>   
                                  </td>
                                  <td>
                                    <a className="dropdown-item" onClick={() => {handleDeleteLinha(plantio.id, linha.id);}}>Excluir</a> 
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>          
                        </>)})}
                        </div>
                      </>):(<></>)}
                      
                    </div>
                   </details>
                  </div>
              </>)})}
              </div>
           
              </>):(<></>)}
              
            </details>
          </div>
          
          </>)})}

          

            </>)} 
              
                    
                                

       {showModal && (
                    <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button 
                                className="modal-close-button"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            {modalContent === 'relatorioArea' && <RelatorioArea data={relatorioArea}/>}
                            {modalContent === 'putArea' && <Edit_AreaPlantio data={dataPutArea}/>}
                            {modalContent === 'relatorioPlantio' && <RelatorioPlantio data={relatorioPlantio}/>}
                            {modalContent === 'AdubacaoPlantio' && <AdubacaoPlantio data={adubacaoPlantio}/>}
                            {modalContent === 'InfoLinha' && <GerenciarLinhaseLocalizacoes data={infoLinha}/>}                   
                        </div>
                    </div>
                </div>
                )} 
  </>);
}

export default Gerencia_AreaPlantio;
