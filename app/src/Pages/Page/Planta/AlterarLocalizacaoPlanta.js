import '../../CSS/BodyStyle.css'
import React, { useState, useEffect} from 'react';

function EditarAlterarLocalizacao({data, onClose}){
    const Url = `${process.env.REACT_APP_BACKEND_URL}/planta/AlterarLocalizacao`
    const UrlGetLocalizacaoList = `${process.env.REACT_APP_BACKEND_URL}/localizacao/ListarLocalizacoesDisponiveis` 
    const [dadosGetLocalizacoes, setDadosGetLocalizacoes] = useState([])
    const getListaAreaAll = async () => {
        try {
          const response = await fetch(UrlGetLocalizacaoList);
          const data = await response.json();
          setDadosGetLocalizacoes(data);
        } catch (error) {
          console.error('Erro ao buscar lista de áreas:', error);
        }
      };

    const [body, setBody] = useState({
        id: data.id,
        localizacaoId: 0,
    });

    const handleChanagePutEdit = (e) => {
          setBody(prev => ({...prev, [e.target.name]: e.target.value}));
      }

    const handleClickPutEdit=async (e)=>{
        e.preventDefault();
        try{
          fetch(Url, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                plantaId: body.id,
                localizacaoId: body.localizacaoId,
            })
          })
          .then(() => {
            if (onClose) onClose();
          });
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
                <form>
                        <table>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Cientifico</button>
                                        <input type="text"  value={data.nomeCientifico}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Popular</button>
                                        <input type="text"  value={data.nomePopular}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Orientações</button>
                                        <input type="text" value={data.instrucoes}  class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
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
                                        onChange={handleChanagePutEdit}>
                                        <option value="">Localizações disponíveis</option>
                                        {dadosGetLocalizacoes.map((loc, i)=>{return(<>       
                                        <option key={loc.id} value={loc.id}>{loc.referencia}</option>
                                    </>)})}
                                    </select>
                                </td>
                            </tr>
                            <br/>
                            <tr>
                                <td><button type="submit" onClick={handleClickPutEdit} class="btn btn-success">Salvar</button></td>
                            </tr>
                        </table>
                    </form>
            </div>
        </div>
    </>)
}

export default EditarAlterarLocalizacao;