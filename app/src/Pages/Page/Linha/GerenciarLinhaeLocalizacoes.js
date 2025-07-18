import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './Linha.css';
import EditarAlterarLocalizacao from '../Planta/AlterarLocalizacaoPlanta';
import Cad_Planta from '../Planta/Cad_Planta';
import EditarIndoPlanta from '../Planta/EditarInfoPlanta';
import AlterarCicloPlanta from '../Planta/AlterarCicloPlanta';

function GerenciarLinhaseLocalizacoes() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id; 
  const [linhaData, setLinhaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [novaPlanta, setNovaPlanta] = useState({ localizacaoId: '' });
  const [editInfoPlanta, setEditInfoPlanta] = useState({ plantaId: '', nomeCientifico: '', nomePopular: '', instrucoes: '', localizacao: '' });
  const [plantaEditLocalizacao, setPlantaEditLocalizacao] = useState({ plantaId: '', nomeCientifico: '', nomePopular: '', instrucoes: '', localizacao: '' });
  const [plantaEditCiclo, setPlantaEditCiclo] = useState({ id: '', nomeCientifico: '', nomePopular: '', instrucoes: '', ciclo: '', localizacao: '' });
  const UrlPostLocalizacao = `${process.env.REACT_APP_BACKEND_URL}/localizacao/NovaLocalizacao`;
  const UrlDeleteLocalizacao = `${process.env.REACT_APP_BACKEND_URL}/localizacao/DeletarLocalizacaoPorId`;

 useEffect(() => {
  if (!id) {
    console.error("ID da linha não foi recebido");
    return;
  }

  carregarLinha();
}, [id]);

const carregarLinha = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/linha/BuscarLinhaPorId?id=${id}`);
    if (!response.ok) throw new Error('Erro ao buscar a linha');
    const data = await response.json();
    setLinhaData(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  if (!id) {
    return <div>Erro: Nenhum ID de linha informado.</div>;
  }

  if (loading || !linhaData) {
    return <div>Carregando dados da linha...</div>;
  }

  const { identificador, localizacoes } = linhaData;

  const handleAddPLocalizacao = async () => {
    try {
      setLoading(true);
      const response = await fetch(UrlPostLocalizacao, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ linhaId: id })
      });
      if (!response.ok) throw new Error('Erro ao adicionar Localização');
      await carregarLinha()
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLocalizacao = async (data) => {
    // Adiciona confirmação antes de excluir
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta localização? Esta ação não pode ser desfeita.');
    
    if (!confirmDelete) {
      return; // Cancela a exclusão se o usuário não confirmar
    }
    
    try {
      setLoading(true);
      const response = await fetch(UrlDeleteLocalizacao, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          localizacaoId: data.id
        })
      });

      if (!response.ok) throw new Error('Erro ao excluir localização');
      await carregarLinha();
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovaPlanta = async (data) => {
    setNovaPlanta({ localizacaoId: data.id });
    setModalContent('NovaPlanta');
    setShowModal(true);
  };
  
  // Função para fechar o modal e atualizar os dados
  const handleCloseModal = async () => {
    setShowModal(false);
    // Recarregar os dados da linha após fechar o modal
    await carregarLinha();
  };

  //redirect

  const handleInfoPlanta = async (data) => {

  navigate('/gerenciar_planta', { state: { id: data.id } });
};

  return (
    <>
      <div className='retornoLinhaInfo'>
        <div className='retornoLinhaTitulo'>
          <label>Id: {identificador}</label>
        </div>
        <div className='retornoLinhaConteudo'>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <button type="button" className="btn btn-success" onClick={handleAddPLocalizacao}>
                    + Localizacao
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {localizacoes && localizacoes.map((localizacao, i) => (
            <table className="table" key={i}>
              <tbody>
                <tr>
                  <td>{localizacao.referencia}</td>
                  {localizacao.planta ? (
                    <>
                      <td>{localizacao.planta.nomePopular}</td>
                      <td>Ciclo Atual: {localizacao.planta.ciclo.ciclo}</td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
                            Ações
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => handleInfoPlanta(localizacao.planta)}>Gerenciar</a></li>
                            <li><a className="dropdown-item" onClick={() => handleDeleteLocalizacao(localizacao)}>Excluir Localização</a></li>
                          </ul>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>Status: Disponível</td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
                            Ações
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => handleNovaPlanta(localizacao)}>+ Planta</a></li>
                            <li><a className="dropdown-item" onClick={() => handleDeleteLocalizacao(localizacao)}>Excluir Localização</a></li>
                          </ul>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button className="modal-close-button" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="modal-body">
              {modalContent === 'NovaPlanta' && <Cad_Planta data={novaPlanta} onClose={handleCloseModal} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GerenciarLinhaseLocalizacoes;
