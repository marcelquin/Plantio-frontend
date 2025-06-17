import React, { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import '../../CSS/Planta.css'

function Cad_Planta() {

  const UrlPost = `${process.env.REACT_APP_BACKEND_URL}/planta/NovaPlanta`
  const UrlGetList = `${process.env.REACT_APP_BACKEND_URL}/localizacao/ListarLocalizacoesDisponiveis`
  //const UrlPost = "http://localhost:8080/planta/NovaPlanta"
  //const UrlGetList = "http://localhost:8080/localizacao/ListarLocalizacoesDisponiveis"
  const navigate = useNavigate();

  const getListaAreaAll = async () => {
    try {
      const response = await fetch(UrlGetList);
      const data = await response.json();
      setdadosGetLocalizacoes(data);
    } catch (error) {
      console.error('Erro ao buscar lista de áreas:', error);
    }
  };

  const [dadosGetLocalizacoes, setdadosGetLocalizacoes] = useState([])

  const [dataPost, serdataPost] = useState({
    localizacaoId: '',
    nomeCientifico: '',
    nomePopular: '',
    instrucoes: ''
  });


  const handleChanage = (e) => {
    const { name, value } = e.target;
    serdataPost(prev => ({...prev, [name]: value}));
  }

  const handleClick = async (e) => {

    try {
      fetch(UrlPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          localizacaoId: Number(dataPost.localizacaoId),
          nomeCientifico: dataPost.nomeCientifico,
          nomePopular: dataPost.nomePopular,
          instrucoes: dataPost.instrucoes,
        })
      })
      .then(() => navigate("/gerenciar")) 
      serdataPost({
        localizacaoId: '',
        nomeCientifico: '',
        nomePopular: '',
        instrucoes: ''
      })
    } catch (err) {
      console.log("erro", err)
    }
  }

  useEffect(() => {
    getListaAreaAll();
  }, []);

 
  return (
    <>
        <div className="conteudoPlanta">
            <div className="boxConteudo">
              <h1>Cadastro de Nova Planta</h1><br/>
              <form onSubmit={handleClick}>
                  <table>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Cientifico</button>
                          <input type="text" name="nomeCientifico" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                      </td>
                      <td>
                        <div class="input-group mb-3">
                          <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Popular</button>
                          <input type="text" name="nomePopular" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <button class="btn btn-outline-secondary" type="button" id="button-addon1">Instruções</button>
                          <input type="text" name="instrucoes" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                            <select 
                              class="form-select" 
                              aria-label="Default select example"
                              name="localizacaoId"
                              value={dataPost.localizacaoId || ''}
                              onChange={handleChanage}
                            >
                              <option value="">Localizações disponíveis</option>
                            {dadosGetLocalizacoes.map((loc, i)=>{return(<>       
                              <option key={loc.id} value={loc.id}>{loc.referencia}</option>
                          </>)})}
                          </select>
                      </td>
                    </tr>
                    <br/>
                    <tr>  
                      <td><button type="submit" class="btn btn-success">Salvar</button></td>
                    </tr>
                  </table>
                </form>

            </div>
        </div>  
    </>
  );
}

export default Cad_Planta;