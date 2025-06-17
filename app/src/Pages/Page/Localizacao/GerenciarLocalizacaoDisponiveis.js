import React, { useState, useEffect } from 'react';

function GerenciarLocalizacaoNaoDisponiveis(){
                     
  const UrlGetList =  `${process.env.REACT_APP_BACKEND_URL}/localizacao/ListarLocalizacoesDisponiveis`
  //const UrlGetList = "http://localhost:8080/localizacao/ListarLocalizacoesDisponiveis"
  const [lista, setLista] = useState([]);
  const [pesquisaInput, setPesquisaInput] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);  
  
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
};  

const handleChange = (e) => {
    setPesquisaInput(e.target.value);
  }

    const response = pesquisaInput.length > 0 ?
    lista.filter(dados => dados.referencia.includes(pesquisaInput)) :
    []


  const getLista = async () => {
    try {
      const response = await fetch(UrlGetList);
      const data = await response.json();
      setLista(data);
    } catch (error) {
      console.error('Erro ao buscar lista de subáreas:', error);
    }
  };

  useEffect(() => {
    getLista();
  }, []);

 const [dataRequest, setDataRequest] = useState({
      'nomeIdentificador': '',
      'codigo': ''
  })

  const handleRowSelect = (data) => {
    setDataRequest({
      'nomeIdentificador': data.nomeAreaPlantio,
      'codigo': data.codigo
    });
  }

    return(<>

        <div class="input-group mb-3">
            <button class="btn btn-outline-secondary" type="button" id="button-addon1">Área Plantio</button>
            <input type="text" class="form-control" name='pesquisaInput' onChange={handleChange} placeholder="Digite a área a ser pesquisa" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
        </div> 

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Disponivel</th>
            </tr>
          </thead>

            {pesquisaInput.length > 0 ?(<>
            
                {response.map((data, i)=>{return(<>
                
                
                <tbody key={i}>
                  <tr>
                    <td>{data.referencia}</td>
                    <td>{data.disponivel ? (<>Disponivel</>) : (<>Utilizado</>)}</td>  
                  </tr>
                </tbody>
             
              
              </>)})}

            </>) : (<>
                
                {lista.map((data, i)=>{return(<>               
                <tbody key={i}>
                  <tr>
                    <td>{data.referencia}</td>
                    <td>{data.disponivel ? (<>Disponivel</>) : (<>Utilizado</>)}</td>      
                  </tr>
                </tbody>
              </>)})}    
            </>)}  
              </table>
    
    </>)
};

export default GerenciarLocalizacaoNaoDisponiveis