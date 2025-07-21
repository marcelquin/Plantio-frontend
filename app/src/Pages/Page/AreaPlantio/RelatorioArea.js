import '../../CSS/BodyStyle.css'
import { useEffect, useState } from "react";

function RelatorioArea({data})
{

    const [notificacoesFormatadas, setNotificacoesFormatadas] = useState([]);

  function formatarDataCompleta(isoString) {
    const date = new Date(isoString.split('.')[0]);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    const hora = String(date.getHours()).padStart(2, '0');
    const minuto = String(date.getMinutes()).padStart(2, '0');
    const segundo = String(date.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}:${segundo}`;
  }

  useEffect(() => {
    if (data?.notificacoes && Array.isArray(data.notificacoes)) {
      const regexData = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?/;

      const formatadas = data.notificacoes.map((texto) => {
        const match = texto.match(regexData);
        if (match) {
          const dataFormatada = formatarDataCompleta(match[0]);
          return texto.replace(match[0], dataFormatada);
        }
        return texto;
      });

      setNotificacoesFormatadas(formatadas);
    }
  }, [data]);

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
                {data.plantios.map((plantio, i) => {
                  return (
                    <div key={i}>
                      <ul>
                        {plantio.notificacoes.map((notificacao, k) => {
                          const regexData = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?/;
                          const match = notificacao.match(regexData);

                          const textoFormatado = match
                            ? notificacao.replace(match[0], formatarDataCompleta(match[0]))
                            : notificacao;

                          return <li key={k}>{textoFormatado}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ))}
            </p>
            

          </div>
        </div> 
    </>)
};

export default RelatorioArea;