import '../../CSS/BodyStyle.css'
import React, { useState} from 'react';

function AlterarCicloPlanta({data, onClose}){
    
    const Url = `${process.env.REACT_APP_BACKEND_URL}/planta/AlterarCiclo`

    const [body, setBody] = useState({
        ciclo: ''
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
                id: data.id,
                ciclo: body.ciclo
            })
          })
          .then(() => {
            if (onClose) onClose();
          });
        }catch (err){
          console.log("erro")
        }
    } 

    return(<>
        <div class="card">
            <div class="card-body">
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
                                value={body.ciclo}
                                onChange={handleChanagePutEdit}
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
                            <td><button type="submit" onClick={handleClickPutEdit} class="btn btn-success">Salvar</button></td>
                        </tr>
                        </table>
                    </form>
            </div>
        </div>
    </>)
}

export default AlterarCicloPlanta;