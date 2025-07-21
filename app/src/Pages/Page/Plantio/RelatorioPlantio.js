import { useEffect, useState } from "react";
import '../../CSS/BodyStyle.css';

function RelatorioPlantio({ data }) {

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

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">EVENTOS:</h5>
        {notificacoesFormatadas.length > 0 ? (
          <ul>
            {notificacoesFormatadas.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Sem Informações no momento.</p>
        )}
      </div>
    </div>
  );
}

export default RelatorioPlantio;
