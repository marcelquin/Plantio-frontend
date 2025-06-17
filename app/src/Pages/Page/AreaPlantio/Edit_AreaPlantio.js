import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import '../../CSS/BodyStyle.css';

function Edit_AreaPlantio({data}) {

  const UrlPut = `${process.env.REACT_APP_BACKEND_URL}/area/EditarInformacoesArea` 
  const UrlPutAmpliar = `${process.env.REACT_APP_BACKEND_URL}/area/AlterarDimensaoLocalizacoes`
  //const UrlPut = "http://localhost:8080/area/EditarInformacoesArea"
  //const UrlPutAmpliar = "http://localhost:8080/area/AlterarDimensaoLocalizacoes"
  const navigate = useNavigate();
  const [opcao, setopcao] = useState("info")

  const handleChangeOpcao = (e) => {
    setopcao(e.target.value);
  }



  const [dataPost, setdataPost] = useState({
    nome: data.nome,
    dimensao: data.dimensao,
    gps: data.gps
  });

  const [dataPut, setdataPut] = useState({
    id: data.id,
    numeroPlantio: '',
    numeroLinhas: '',
    numeroLocalizacoes: ''
  });

  const handleChanage = (e) => {
    setdataPost(e.target.value);
  }

  const handleChanagePut = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
    setdataPut(prev=>({...prev,[e.target.name]:value}));
  }

  //const handleChanageAlterarDimencao = (e) => {
  //  const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
  //  setDataPutAlterarDimencao(prev=>({...prev,[e.target.name]:value}));
  // }

  const handleClick=async (e)=>{
    try{
      fetch(UrlPut, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          id: data.id,
          nome: dataPost.nome,
          dimensao: dataPost.dimensao,
          gps: dataPost.gps
    })})
    .then(navigate("/gerenciar")) 
    .then({
      nome: data.nome,
      dimensao: data.dimensao,
      gps: data.gps
    })
    }catch (err){
      console.log("erro")
    }
  }

  const handleClickAmpliar=async (e)=>{
    try{
      fetch(UrlPutAmpliar, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          id: data.id,
          numeroPlantio: dataPut.numeroPlantio,
          numeroLinhas: dataPut.numeroLinhas,
          numeroLocalizacoes: dataPut.numeroLocalizacoes
    })})
    .then(navigate("/gerenciar")) 
    .then({
      nome: data.nome,
      dimensao: data.dimensao,
      gps: data.gps
    })
    }catch (err){
      console.log("erro")
    }
  }

  const handleClickreduzir=async (e)=>{
    try{
      fetch(UrlPutAmpliar, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          id: data.id,
          numeroPlantio: dataPut.numeroPlantio,
    })})
    .then(navigate("/gerenciar")) 
    .then({
      nome: data.nome,
      dimensao: data.dimensao,
      gps: data.gps
    })
    }catch (err){
      console.log("erro")
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
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
                value="ampliar"
                checked={opcao === "ampliar"}
                onChange={handleChangeOpcao}
              />
              <label className="form-check-label" htmlFor="radioFloracao">
                Ampliar Locais
              </label>
            </div>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="opcao" 
                id="radioFloracao" 
                value="reduzir"
                checked={opcao === "reduzir"}
                onChange={handleChangeOpcao}
              />
              <label className="form-check-label" htmlFor="radioFloracao">
                Reduzir Locais
              </label>
            </div>
        </div>

          {opcao === "info" ? (<>
            
            <form>
                    <table>
                      <tr>
                        <td>
                          <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">Nome:</button>
                            <input type="text" name="nome" value={dataPost.nome} onChange={handleChanage} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">Dimensão:</button>
                            <input type="text" name="dimensao" value={dataPost.dimensao} onChange={handleChanage} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">GPS:</button>
                            <input type="text" name="gps" value={dataPost.gps} onChange={handleChanage} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td><button type="submit" onClick={handleClick} className="btn btn-success">Salvar</button></td>
                      </tr>
                    </table>
            </form>
          
          </>)  :(<></>)}

          {opcao === "ampliar" ? (<>

              <form>
                <table>
                  <tr>

                    <td>
                      <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary" type="button" id="button-addon1">Nome:</button>
                          <input type="text" name="nome" value={dataPost.nome} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                      </div>
                    </td>
                    <td>
                      <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary" type="button" id="button-addon1">Dimensão:</button>
                          <input type="text" value={dataPost.dimensao} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                      </div>
                    </td>
                    <td>
                      <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary" type="button" id="button-addon1">GPS:</button>
                          <input type="text" value={dataPost.gps} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    {data.plantios.map((plantio, i) => (
                      <div key={i}>
                        <br/>
                        NUMERO DE PLANTIO: <span>{plantio.numero}</span><br/>
                        NUMERO DE LINHAS: <span>{plantio.linhas.length}</span><br/>
                        LOCALIZAÇÕES POR LINHA:<br/>
                        {plantio.linhas.map((linha, j) => (
                          <div key={j}>
                            Linha {j + 1}: {linha.localizacoes.length} localizações, {linha.localizacoes.filter(loc => loc.disponivel).length} disponíveis neste momento.
                          </div>
                        ))}
                        <br/>
                      </div>
                    ))}
                    </td>
                    <br/>
                  </tr>
                  <tr>
                    <td>
                      <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary" type="button" id="button-addon1">Plantio:</button>
                          <input type="number" name='numeroPlantio' onChange={handleChanagePut} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary" type="button" id="button-addon1">Linhas:</button>
                          <input type="number" name='numeroLinhas' onChange={handleChanagePut} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary" type="button" id="button-addon1">Localizações:</button>
                          <input type="number" name='numeroLocalizacoes' onChange={handleChanagePut} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><button type="submit" onClick={handleClickAmpliar} className="btn btn-success">Salvar</button></td>
                  </tr>
                </table>
              </form>

          </>) : (<></>)}
          
          {opcao === "reduzir" ? (<>

                <form>
                  <table>
                    <tr>

                      <td>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">Nome:</button>
                            <input type="text" name="nome" value={dataPost.nome} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">Dimensão:</button>
                            <input type="text" value={dataPost.dimensao} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                      </td>
                      <td>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">GPS:</button>
                            <input type="text" value={dataPost.gps} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      {data.plantios.map((plantio, i) => (
                          <div key={i}>
                            <br/>
                            NUMERO DE PLANTIO: <span>{plantio.numero}</span><br/>
                            NUMERO DE LINHAS: <span>{plantio.linhas.length}</span><br/>
                            LOCALIZAÇÕES POR LINHA:<br/>
                            {plantio.linhas.map((linha, j) => (
                              <div key={j}>
                                Linha {j + 1}: {linha.localizacoes.length} localizações, {linha.localizacoes.filter(loc => loc.disponivel).length} disponíveis neste momento.
                              </div>
                            ))}
                            <br/>
                          </div>
                        ))}
                      </td>
                      <br/>
                    </tr>
                    <tr>
                      <td>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">Plantio:</button>
                            <input type="number" name='numeroPlantio' onChange={handleChanagePut} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><button type="submit" onClick={handleClickreduzir} className="btn btn-success">Salvar</button></td>
                    </tr>
                  </table>
                </form>

</>) : (<></>)}


        </div>
      </div>
    </>
  );
}

export default Edit_AreaPlantio;