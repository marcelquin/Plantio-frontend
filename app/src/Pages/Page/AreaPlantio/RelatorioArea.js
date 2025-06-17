import '../../CSS/BodyStyle.css'

function RelatorioArea({data})
{
    return(<>
        <div class="card">
          <div class="card-body">
            <h1 className='infoTitulo'>NOME: {data.nome}</h1>
            <br/>
            <p className='infoItem'>
              DIMENSÃO: <span className='infoTexto'>{data.dimensao}</span><br/>
              GPS: <span className='infoTexto'>{data.gps}</span><br/>
              PLANTIOS: <span> {data.plantios ? (<>
              {data.plantios.length}
              </>) : (<></>)}</span><br/>
            </p>
            <h1 className='infoTitulo'>INFORMAÇÕES ADICIONAIS:</h1>
            <p>
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
                <h1 className='infoTitulo'>RELATÓRIOS DE ADUBAÇÃO</h1>
                {data.plantios.map((plantio,i)=>{return(<>
                    Numero da linha: {plantio.numero}<br/>
                    {plantio.notificacoes.map((notificacao,k)=>{return(<>
                        <span>{notificacao}</span><br/>
                    </>)})}
                </>)})}
              </div>
            ))}
            </p>
            

          </div>
        </div> 
    </>)
};

export default RelatorioArea;