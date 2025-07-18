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
            {data.plantios.map((plantio, i) => (
              <div key={i}>
                <br/>
                <p>PLANTIO {plantio.numero}, contendo {plantio.linhas.length} linhas com {plantio.linhas.reduce((acc, cur) => acc + cur.localizacoes.length, 0)} localizações.</p>
                <h1 className='infoTitulo'>EVENTOS:</h1>
                {data.plantios.map((plantio,i)=>{return(<>
                    <div key={i}>
                      <ul>
                        {plantio.notificacoes.map((notificacao,k)=>{return(<>
                            <li>{notificacao}</li>
                        </>)})}
                      </ul>
                    </div>
                </>)})}
              </div>
            ))}
            </p>
            

          </div>
        </div> 
    </>)
};

export default RelatorioArea;