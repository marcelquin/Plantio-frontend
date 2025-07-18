import '../../CSS/BodyStyle.css'

function RelatorioPlantio({data}) {
    return (<>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">EVENTOS:</h5>
                {data.notificacoes?(<>
                <ul>
                    {data.notificacoes.map((data,i)=>{return(<>
                    <li key={i}>{data}</li>
                    </>)})}
                </ul>
                </>):(<><p>Sem Informações no momento.</p></>)}
            </div>
        </div>
    </>)}

export default RelatorioPlantio;