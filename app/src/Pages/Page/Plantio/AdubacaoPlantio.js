import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../CSS/BodyStyle.css'

function AdubacaoPlantio({data})
{

    const UrlPutAdubacao = `${process.env.REACT_APP_BACKEND_URL}/plantio/NovaAdubacao`
    //const UrlPutAdubacao = "http://192.168.0.24:8080/plantio/NovaAdubacao"
    const navigate = useNavigate();

    const [relatorio, setRelatorio] = useState("");

    const handleClickAdubacao=async (e)=>{
        try{
          fetch(UrlPutAdubacao, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                id: Number(data.id),
                relatorio: relatorio
            })
          })
          .then(navigate("/gerenciar"))   
        }catch (err){
          console.log("erro")
        }
    }  


    return(<>
    
        <div className="card">
            <div className="card-body">
                <form>
                    <table>
                        <tr>
                            <td>
                                <div class="input-group mb-3">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome</button>
                                    <input type="text" value={data.identificador} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="input-group mb-3">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Numero</button>
                                    <input type="text" value={data.numero} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-floating">
                                    <textarea class="form-control" name='relatorio' onChange={(e) => setRelatorio(e.target.value)} placeholder="Descreva a Adubação Aqui" id="floatingTextarea"></textarea>
                                    <label for="floatingTextarea">Descreva o Resumo da Adubação Aqui </label>
                                </div>
                            </td>
                            <br/>
                            <br/>
                        </tr>
                        <br/>
                        <tr>
                            <td><button type="submit" onClick={handleClickAdubacao} class="btn btn-success">Salvar</button></td>
                        </tr>
                    </table>
                </form>

            </div>
        </div>
    
    </>)
}

export default AdubacaoPlantio;

