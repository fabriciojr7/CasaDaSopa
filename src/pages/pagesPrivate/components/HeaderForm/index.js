import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Container } from './styles';

export default function HeaderForm({ title, to }) {
  return (
    <Container>
      <Link to={to}>
        <FaArrowLeft className="ico" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}
