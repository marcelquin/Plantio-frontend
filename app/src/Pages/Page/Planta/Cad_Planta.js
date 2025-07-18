import React, { useState } from 'react';
import '../../CSS/Planta.css'

const Cad_Planta = ({data, onClose}) => {
  const UrlPost = `${process.env.REACT_APP_BACKEND_URL}/planta/NovaPlanta`

  const [dataPost, serdataPost] = useState({
    localizacaoId: data.localizacaoId,
    nomeCientifico: '',
    nomePopular: '',
    instrucoes: ''
  });
  console.log(data)
    console.log(dataPost)



  const handleChanage = (e) => {
    const { name, value } = e.target;
    serdataPost(prev => ({...prev, [name]: value}));
  }

  const handleClick = async (e) => {
    // Prevenir o comportamento padrão do formulário
    e.preventDefault();
    
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
      .then(() => {
        // Fechar o modal em vez de navegar
        if (onClose) onClose();
      }) 
      serdataPost({
        localizacaoId: data.localizacaoId,
        nomeCientifico: '',
        nomePopular: '',
        instrucoes: ''
      })
    } catch (err) {
      console.log("erro", err)
    }
  }



 
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
