export default function formatNascimento(nasc) {
  return nasc
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
}
