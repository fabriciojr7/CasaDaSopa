import { Container } from './styles';

export default function FormGrouping({ children, error }) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}
