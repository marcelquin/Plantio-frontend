import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/BodyStyle.css'

function EditarInfo({data}){
    
    const UrlPutEdit = `${process.env.REACT_APP_BACKEND_URL}/planta/EditarPlanta`
    const UrlPutLocalizacao = `${process.env.REACT_APP_BACKEND_URL}/planta/AlterarLocalizacao`
    const UrlPutCilco = `${process.env.REACT_APP_BACKEND_URL}/planta/AlterarCiclo`
    const UrlGetList = `${process.env.REACT_APP_BACKEND_URL}/planta/ListarLocalizacoesDisponiveis` 
    //const UrlPutEdit = "http://localhost:8080/planta/EditarPlanta"
    //const UrlPutLocalizacao = "http://localhost:8080/planta/AlterarLocalizacao"
    //const UrlPutCilco = "http://localhost:8080/planta/AlterarCiclo"
    //const UrlGetList = "http://localhost8080/localizacao/ListarLocalizacoesDisponiveis"
    const navigate = useNavigate();

    const [opcao, setopcao] = useState("info")
    const [dadosGetLocalizacoes, setDadosGetLocalizacoes] = useState([])
    const getListaAreaAll = async () => {
        try {
          const response = await fetch(UrlGetList);
          const data = await response.json();
          setDadosGetLocalizacoes(data);
        } catch (error) {
          console.error('Erro ao buscar lista de áreas:', error);
        }
      };

    const [dataPutEdit, setDataPutEdit] = useState({
        plantaId: data.idPlanta,
        nomeCientifico: data.nomeCientifico,
        nomePopular: data.nomePopular,
        instrucoes: data.instrucoes,
    });
     
    const [dataPutLocalizacao, setDataPutLocalizacao] = useState({
        plantaId: data.idPlanta,
        localizacaoId: 0,
    })

    const [dataPutCiclo, setdataPutCiclo] = useState({
        localizacao: data.localizacao,
        ciclo: '',
        id: Number(data.idPlanta),
      })

      const handleChangeOpcao = (e) => {
        setopcao(e.target.value);
      }
  
      const handleChanagePutEdit = (e) => {
          setDataPutEdit(prev => ({...prev, [e.target.name]: e.target.value}));
      }
      
      const handleChanagePutLocalizacao = (e) => {
          const { name, value } = e.target;
          setDataPutLocalizacao(prev => ({...prev, [name]: value}));
      }

      const handleChanageCiclo = (e) => {
        setdataPutCiclo(prev=>({...prev,[e.target.name]:e.target.value}));
      }

    const handleClickPutEdit=async (e)=>{
        try{
          fetch(UrlPutEdit, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
              plantaId: Number(data.idPlanta),
              nomeCientifico: dataPutEdit.nomeCientifico,
              nomePopular: dataPutEdit.nomePopular,
              instrucoes: dataPutEdit.instrucoes
            })
          })
          .then(navigate("/gerenciar")) 
          setDataPutEdit({
              id: data.idPlanta,
              nomeCientifico: data.nomeCientifico,
              nomePopular: data.nomePopular,
              instrucoes: data.instrucoes
          })
        }catch (err){
          console.log("erro")
        }
    }
    
    const handleClickPutLocalizacao=async (e)=>{
        try{
          fetch(UrlPutLocalizacao, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                plantaId: Number(dataPutLocalizacao.plantaId),
                localizacaoId: dataPutLocalizacao.localizacaoId,
            })
          })
          .then(navigate("/gerenciar")) 
          setDataPutLocalizacao({
            plantaId: data.idPlanta,
            localizacaoId: 0
          })
        }catch (err){
          console.log("erro")
        }
    }

    const handleClickCiclo=async (e)=>{
        try{
          fetch(UrlPutCilco, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
              id: dataPutCiclo.id,
              ciclo: dataPutCiclo.ciclo
            })
          })
          .then(navigate("/gerenciar")) 
          setdataPutCiclo({
            localizacao: data.localizacao,
            ciclo: '',
            id: Number(data.idPlanta),
          })
        }catch (err){
          console.log("erro")
        }
      }
  

    useEffect(() => {
        getListaAreaAll();
    }, []);  

    return(<>
        <div class="card">
            <div class="card-body">
                <div className='boxSelecaoEdit'>
                    <div className="form-check">
                        <input 
                        className="form-check-input" 
                        type="radio" 
                        name="opcao" 
                        id="radioFloracao" 
                        value="info"
                        checked={opcao === "info"}
                        onChange={handleChangeOpcao}
                        />
                        <label className="form-check-label" htmlFor="radioFloracao">
                        Editar Informações
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                        className="form-check-input" 
                        type="radio" 
                        name="opcao" 
                        id="radioFloracao" 
                        value="localizacao"
                        checked={opcao === "localizacao"}
                        onChange={handleChangeOpcao}
                        />
                        <label className="form-check-label" htmlFor="radioFloracao">
                        Editar Localização
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                        className="form-check-input" 
                        type="radio" 
                        name="opcao" 
                        id="radioFloracao" 
                        value="ciclo"
                        checked={opcao === "ciclo"}
                        onChange={handleChangeOpcao}
                        />
                        <label className="form-check-label" htmlFor="radioFloracao">
                        Editar Ciclo
                        </label>
                    </div>
                </div>
                <br/>
                {opcao === "info" ? (<>
                
                    <form>
                        <table>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Cientifico</button>
                                        <input type="text" name="nomeCientifico" value={dataPutEdit.nomeCientifico} onChange={handleChanagePutEdit} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Popular</button>
                                        <input type="text" name="nomePopular" value={dataPutEdit.nomePopular} onChange={handleChanagePutEdit} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Orientações</button>
                                        <input type="text" name="instrucoes" value={dataPutEdit.instrucoes} onChange={handleChanagePutEdit} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><button type="submit" onClick={handleClickPutEdit} class="btn btn-success">Salvar</button></td>
                            </tr>
                        </table>
                    </form>
                
                </>): (<></>)}

                {opcao === "localizacao" ? (<>
                
                    <form>
                        <table>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Cientifico</button>
                                        <input type="text"  value={dataPutEdit.nomeCientifico}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Popular</button>
                                        <input type="text"  value={dataPutEdit.nomePopular}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Orientações</button>
                                        <input type="text" value={dataPutEdit.instrucoes}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Localização Atual</button>
                                        <input type="text" value={data.localizacao}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <select 
                                        class="form-select" 
                                        aria-label="Default select example"
                                        name="localizacaoId"
                                        value={dataPutLocalizacao.localizacaoId || ''}
                                        onChange={handleChanagePutLocalizacao}
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
                                <td><button type="submit" onClick={handleClickPutLocalizacao} class="btn btn-success">Salvar</button></td>
                            </tr>
                        </table>
                    </form>

                </>) :(<></>)}

                {opcao === "ciclo" ? (<>
                
                    <form>
                        <table>
                        <tr>
                            <td>
                                <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Cientifico</button>
                                <input type="text" name="nomePopular" value={data.nomeCientifico} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                            </td>
                            <td>
                                <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Popular</button>
                                <input type="text" name="nomePopular" value={data.nomePopular} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="input-group mb-3">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Localização Atual</button>
                                    <input type="text" value={data.localizacao}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                                </td>
                            <td>
                                <div class="input-group mb-3">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Ciclo Atual</button>
                                    <input type="text" value={data.ciclo} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                            </td> 
                        </tr>
                        <tr>
                            <td>
                            <select 
                                class="form-select" 
                                aria-label="Default select example"
                                name="ciclo"
                                value={dataPutCiclo.ciclo}
                                onChange={handleChanageCiclo}
                            >
                                <option value="">Selecione a opção desejada</option>
                                <option value="GERMINACAO">Germinação</option>
                                <option value="MUDA">Muda</option>
                                <option value="CRESCIMENTO">Crescimento</option>
                                <option value="FLORACAO">Floração</option>
                                <option value="FRUTIFICACAO">Frutificação</option>
                                <option value="MATURACAO">Maturação</option>
                                <option value="FIM">Fim de Ciclo</option>
                            </select>
                            <br/>
                            </td>
                        </tr>
                        <tr>
                            <td><button type="submit" onClick={handleClickCiclo} class="btn btn-success">Salvar</button></td>
                        </tr>
                        </table>
                    </form>
                
                </>) : (<></>)}

            </div>
        </div>
    </>)
}

export default EditarInfo