import '../../CSS/BodyStyle.css'
import React, { useState, useEffect } from 'react';
import RelatorioArea from './RelatorioArea'
import Edit_AreaPlantio from './Edit_AreaPlantio'
import AdubacaoPlantio from './AdubacaoPlantio';
import { useNavigate } from 'react-router-dom';

function Gerencia_AreaPlantio() {

  //<td><a className='opcaoExtra' onClick={() => { handleRowSelect(data); handleOpenModal('editar'); }}>Editar</a></td>

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (content) => {
      setModalContent(content);
      setShowModal(true);
  };
      
  const UrlGetList = `${process.env.REACT_APP_BACKEND_URL}/area/ListarAreas` 
  //const UrlGetList = "http://localhost:8080/area/ListarAreas"
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
  listAll.filter(dados => dados.nome.includes(pesquisaInput)) :
  []

  useEffect(() => {
    getListaAll();
  }, []);
  //<td><a className='opcaoExtra' onClick={() => handleOpenModal('Adubacao')} >Adubação</a></td>
  const navigate = useNavigate();

  const [dataRequest, setDataRequest] = useState({
      'id': '',
      'nome': '',
      'dataCadastro': '',
      'dimensao': '',
      'gps': '',
      'notificacoes': '',
      'plantios': '',
  })

  const handleRowSelect = (data) => {
    setDataRequest({
      'id': data.id,
      'nome': data.nome,
      'dataCadastro': data.dataCadastro,
      'plantios': data.plantios,
      'dimensao': data.dimensao,
      'gps': data.gps
    });
  }

  return (
    <>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary" type="button" id="button-addon1"></button>
        <input type="text" class="form-control" name="pesquisaInput" onChange={handleChange} placeholder="Digite o nome da área para pesquisa" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
      </div>
       <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Nome </th>
                          <th scope="col">Data de Cadastro</th>
                          <th scope="col">Dimensão</th>
                        </tr>
                      </thead>
       {pesquisaInput.length > 0 ?(<>
       
        {response.map((data, i)=>{return(<>
                  
                  <tbody>
                  <tr>
                    <th scope="row">{data.nome}</th>
                    <td>{data.dataCadastro}</td>
                    <td>{data.dimensao}</td>
                    <td><a className='opcaoExtra' onClick={() => { handleRowSelect(data); handleOpenModal('adubacao'); }}>Adicionar Adubação</a></td>
                    <td><a className='opcaoExtra' onClick={() => { handleRowSelect(data); handleOpenModal('relatorio'); }}>Relatório</a></td>
                    <td><a className='opcaoExtra' onClick={() => { handleRowSelect(data); handleOpenModal('editar'); }}>Editar Informações</a></td>
                  </tr>
                  </tbody>
          </>)})}

       </>) : (<>

        {listAll.map((data, i)=>{return(<>
                  
                  <tbody>
                  <tr>
                    <th scope="row">{data.nome}</th>
                    <td>{data.dataCadastro}</td>
                    <td>{data.dimensao}</td>
                    <td><a className='opcaoExtra' onClick={() => { handleRowSelect(data); handleOpenModal('adubacao'); }}>Adicionar Adubação</a></td>
                    <td><a className='opcaoExtra' onClick={() => { handleRowSelect(data); handleOpenModal('relatorio'); }}>Relatório</a></td>
                    <td><a className='opcaoExtra' onClick={() => { handleRowSelect(data); handleOpenModal('editar'); }}>Editar Informações</a></td>
                  </tr>
                  </tbody>
          </>)})}
       
       </>)}
              </table>
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
                            {modalContent === 'adubacao' && <AdubacaoPlantio data={dataRequest}/>}
                            {modalContent === 'relatorio' && <RelatorioArea data={dataRequest}/>}
                            {modalContent === 'editar' && <Edit_AreaPlantio data={dataRequest}/>}
                        </div>
                    </div>
                </div>
                )} 
    </>
  );
}

export default Gerencia_AreaPlantio;