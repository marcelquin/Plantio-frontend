import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import '../../CSS/Area.css'

function Cad_AreaPlantio() {
                  
  const UrlPost = `${process.env.REACT_APP_BACKEND_URL}/area/NovaArea`
  //const UrlPost = "http://localhost:8080/area/NovaArea"
  const navigate = useNavigate();

  
  const [dataPost, serdataPost] = useState({
    nome: "",
    dimensao: "",
    gps: "",
    numeroPlantios: 0,
    numeroLinhas: 0,
    numeroLocalizacoes: 0
  });

  const handleChanage = (e) => {
    serdataPost(prev=>({...prev,[e.target.name]:e.target.value}));
  }
  
  const handleClick=async (e)=>{
    try{
      fetch(UrlPost, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
          nome: dataPost.nome,
          dimensao: dataPost.dimensao,
          gps: dataPost.gps,
          numeroPlantios: parseInt(dataPost.numeroPlantios),
          numeroLinhas: parseInt(dataPost.numeroLinhas),
          numeroLocalizacoes : parseInt(dataPost.numeroLocalizacoes)
        })
      })
      .then(navigate("/gerenciar")) 
      serdataPost({
        nome: "",
        dimensao: "",
        gps: "",
        numeroPlantios: 0,
        numeroLinhas: 0,
        numeroLocalizacoes: 0
      })
    }catch (err){
      console.log("erro")
    }
  }


  return (
    <>
      <div className='conteudoArea'>

        <div className='boxConteudo'>
        <h1>Cadastro de Nova Área</h1>
        <form>
            <table>
              <tr>
                <td>
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">Nome</button>
                  <input type="text" name="nome" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                </div>
                </td>
                <td>
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">Dimensão</button>
                  <input type="text" name="dimensao" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                </div>
                </td>
                </tr>
                <tr>
                <td>
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">GPS</button>
                  <input type="text" name="gps" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                </div>
                </td>
              </tr>
              <tr>
                <td>
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">NUmero de Plantios </button>
                  <input type="number" name="numeroPlantios" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                </div>
                </td>
                <td>
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">Numero de linhas</button>
                  <input type="number" name="numeroLinhas" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                </div>
                </td>
                <td>
                <div class="input-group mb-3">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">localizações por Linha </button>
                  <input type="number" name="numeroLocalizacoes" onChange={handleChanage} class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                </div>
                </td>
                <br/>
              </tr>
              <tr>
                <td><button type="submit" onClick={handleClick} class="btn btn-success">Salvar</button></td>
              </tr>
            </table>
          </form>

        </div>
      </div>
    </>
  );
}

export default Cad_AreaPlantio;