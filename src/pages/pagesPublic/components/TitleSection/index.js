import {
  Container,
} from './styles';

export default function TitleSection({ title, subtitle }) {
  return (
    <Container>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>

      <div className="line" />
    </Container>
  );
}
