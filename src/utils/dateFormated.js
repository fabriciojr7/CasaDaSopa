export default function dateFormated(d) {
  const data = new Date(d);

  let dia = data.getDate().toString();
  dia = (dia.length === 1) ? `0${dia}` : dia;
  let mes = (data.getMonth() + 1).toString();
  mes = (mes.length === 1) ? `0${mes}` : mes;
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
