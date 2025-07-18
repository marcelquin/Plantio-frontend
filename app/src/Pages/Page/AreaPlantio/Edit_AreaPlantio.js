import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import '../../CSS/BodyStyle.css';

function Edit_AreaPlantio({data}) {
  console.log(data);
  const UrlPut = `${process.env.REACT_APP_BACKEND_URL}/area/EditarInformacoesArea` 

  const [dataPost, setdataPost] = useState({
    nome: data.nome,
    dimensao: data.dimensao,
    gps: data.gps
  });
  console.log(dataPost);
  const handleChanage = (e) => {
    setdataPost(prev => ({...prev, [e.target.name]: e.target.value}));
  }

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
    .then(window.location.reload());
    }catch (err){
      console.log("erro")
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className='boxSelecaoEdit'>
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
        </div>
        </div>
      </div>
    </>
  );
}

export default Edit_AreaPlantio;