import './Planta.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cad_Planta from './Cad_Planta'
import AlterarCicloPlanta from './AlterarCicloPlanta'
import AlterarLocalizacaoPlanta from './AlterarLocalizacaoPlanta'
import EditarInfoPlanta from './EditarInfoPlanta';

function GerenciaPlanta() {

  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id; 
  const [plantaData, setPlantaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
 
  //body request
  const [editInfoPlanta, setEditInfoPlanta] = useState({ plantaId: '', nomeCientifico: '', nomePopular: '', instrucoes: '', localizacao: '' });
  const [plantaEditLocalizacao, setPlantaEditLocalizacao] = useState({ plantaId: '', nomeCientifico: '', nomePopular: '', instrucoes: '', localizacao: '' });
  const [plantaEditCiclo, setPlantaEditCiclo] = useState({ id: '', nomeCientifico: '', nomePopular: '', instrucoes: '', ciclo: '', localizacao: '' });
  
  //request
  const handleEditarInfoPlanta = async (data) => {
    setEditInfoPlanta({
      plantaId: plantaData.id,
      nomeCientifico: data.nomeCientifico,
      nomePopular: data.nomePopular,
      instrucoes: data.instrucoes
    });
    setModalContent('editarInfoPlanta');
    setShowModal(true);
  };

  const handleEditarLocalizacao = async (data) => {
    setPlantaEditLocalizacao({
      id: data.id,
      nomeCientifico: data.nomeCientifico,
      nomePopular: data.nomePopular,
      instrucoes: data.instrucoes,
      localizacao: data.localizacao
    });
    setModalContent('editarLocalizacao');
    setShowModal(true);
  };

  const handleEditarCiclo = async (data) => {
    setPlantaEditCiclo({
      id: plantaData.id,
      nomeCientifico: data.nomeCientifico,
      nomePopular: data.nomePopular,
      instrucoes: data.instrucoes,
      ciclo: data.ciclo.ciclo,
      localizacao: data.localizacao
    });
    setModalContent('editarCiclo');
    setShowModal(true);
  };

  //get information 
   useEffect(() => {
  if (!id) {
    console.error("ID da linha não foi recebido");
    return;
  }

  carregarLinha();
}, [id]);

const carregarLinha = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/planta/BuscarPlantaPorId?id=${id}`);
    if (!response.ok) throw new Error('Erro ao buscar a linha');
    const data = await response.json();
    setPlantaData(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  if (!id) {
    return <div>Erro: Nenhum ID de linha informado.</div>;
  }

  if (loading || !plantaData) {
    return <div>Carregando dados da linha...</div>;
  }

  const handleCloseModal = async () => {
    setShowModal(false);
    // Recarregar os dados da linha após fechar o modal
    await carregarLinha();
  };

    return(<>

        <div class="card">
            <div class="card-body">
                <div className='retornoPlantaInfo'>
                    <div className='retornoPlantaTitulo'>
                    {plantaData.nomePopular}
                    </div>
                    <div className='retornoPlantaTabela'>
                        <button type="button" class="btn btn-warning" onClick={() => handleEditarInfoPlanta(plantaData)}>Ediar Informações</button>
                        <button type="button" class="btn btn-warning" onClick={() => handleEditarCiclo(plantaData)}>Alterar Ciclo</button>
                        <button type="button" class="btn btn-warning" onClick={() => handleEditarLocalizacao(plantaData)}>Alterar Localização</button>
                    </div>
                    <div className='retornoPlantaConteudo'>
                   <p className='infoItem'>Nome Cientifico:  <span className='infoTexto'>{plantaData.nomeCientifico}</span></p>
                   <p className='infoItem'>Nome Cientifico:  <span className='infoTexto'>{plantaData.nomePopular}</span></p>
                   <p className='infoItem'>Nome Popular:  <span className='infoTexto'>{plantaData.nomePopular}</span></p>
                   {plantaData.localizacao?(<>
                   <p className='infoItem'> Localização: {plantaData.localizacao}</p>
                   </>):(<></>)}
                   <p className='infoItem'>Fase Atual:  <span className='infoTexto'>{plantaData.ciclo.ciclo}</span></p>
                   <p className='infoItem'>Data de Plantio:  <span className='infoTexto'>{plantaData.DataPlantio}</span></p>
                   <p className='infoItem'>Ciclo atual:  <span className='infoTexto'>{plantaData.ciclo.dataCicloAtual}</span></p>            
                   <p className='infoItem'>Ultimo Ciclo:  <span className='infoTexto'>{plantaData.ciclo.dataUltimoCiclo}</span></p>
                    </div>
                </div>
            </div>
        </div>    
          {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button className="modal-close-button" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="modal-body">
              {modalContent === 'editarLocalizacao' && <AlterarLocalizacaoPlanta data={plantaEditLocalizacao} onClose={handleCloseModal} />}
              {modalContent === 'editarInfoPlanta' && <EditarInfoPlanta data={editInfoPlanta} onClose={handleCloseModal} />}
              {modalContent === 'editarCiclo' && <AlterarCicloPlanta data={plantaEditCiclo} onClose={handleCloseModal} />}
            </div>
          </div>
        </div>
      )}
    </>)

    
}

export default GerenciaPlanta