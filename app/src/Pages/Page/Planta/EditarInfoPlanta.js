import '../../CSS/BodyStyle.css'
import React, { useState} from 'react';

function EditarInfoPlanta({data, onClose}){

    console.log(data)
    const Url = `${process.env.REACT_APP_BACKEND_URL}/planta/EditarPlanta`


    const [body, setBody] = useState({
        nomeCientifico: data.nomeCientifico,
        nomePopular: data.nomePopular,
        instrucoes: data.instrucoes,
    });

    const handleChanagePutEditInfo = (e) => {
          setBody(prev => ({...prev, [e.target.name]: e.target.value}));
      }

    const handleClickPutEditInfo=async (e)=>{
        e.preventDefault();
        try{
          fetch(Url, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
              plantaId: data.plantaId,
              nomeCientifico: body.nomeCientifico,
              nomePopular: body.nomePopular,
              instrucoes: body.instrucoes
            })
          })
          .then(() => {
            // Fechar o modal em vez de recarregar a página
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
                                        <input type="text" name="nomeCientifico" value={body.nomeCientifico} onChange={handleChanagePutEditInfo} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome Popular</button>
                                        <input type="text" name="nomePopular" value={body.nomePopular} onChange={handleChanagePutEditInfo} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group mb-3">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Orientações</button>
                                        <input type="text" name="instrucoes" value={body.instrucoes} onChange={handleChanagePutEditInfo} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><button type="submit" onClick={handleClickPutEditInfo} class="btn btn-success">Salvar</button></td>
                            </tr>
                        </table>
                    </form>
            </div>
        </div>
    </>)
}

export default EditarInfoPlanta;