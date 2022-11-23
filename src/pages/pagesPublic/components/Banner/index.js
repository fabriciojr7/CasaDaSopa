import {
  BannerContainer, Container,
} from './styles';

export default function Banner() {
  return (
    <BannerContainer>
      <Container>
        <h1>
          Ajudar faz bem
          <br />
          <span>Venha contribuir para um mundo melhor!</span>
        </h1>
      </Container>
    </BannerContainer>
  );
}
