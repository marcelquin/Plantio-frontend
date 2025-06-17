import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../CSS/BodyStyle.css'

function AdubacaoPlantio({data})
{

    const UrlPutAdubacao = `${process.env.REACT_APP_BACKEND_URL}/plantio/NovaAdubacao`
    //const UrlPutAdubacao = "http://192.168.0.24:8080/plantio/NovaAdubacao"
    const navigate = useNavigate();

    const [idPlantio, setIdPlantio] = useState("");
    const [relatorio, setRelatorio] = useState("");

    const handleChangeId = (e) => {
    setIdPlantio(e.target.value); // seta o valor do select
    console.log("ID selecionado:", e.target.value); // só pra confirmar
    };
     
      const handleClickAdubacao=async (e)=>{
        try{
          fetch(UrlPutAdubacao, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                id: Number(idPlantio),
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
                                    <input type="text" value={data.nome} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="input-group mb-3">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Dimensão</button>
                                    <input type="text" value={data.dimensao} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select
                                    className="form-select"
                                    aria-label="Selecione o Plantio"
                                    value={idPlantio}
                                    onChange={(e) => setIdPlantio(e.target.value)}
                                    >
                                    <option value="">Selecione o Plantio</option>
                                    {data.plantios.map((plantio) => (
                                        <option key={plantio.id} value={plantio.id}>
                                        {plantio.numero}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <br/>
                            <br/>
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

