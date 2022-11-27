import { useNavigate } from 'react-router-dom';
import ContainerSection from '../components/ContainerSection';
import TitleSection from '../components/TitleSection';
import Button from '../../../components/Button';

import {
  Container, ContentSection, Photo, Text,
} from './styles';

import imageAbout from '../../../assets/images/aboutImage.jpeg';
import imageAbout2 from '../../../assets/images/aboutImage2.jpeg';
import imageTeatro1 from '../../../assets/images/teatro1.jpeg';
import imageTeatro2 from '../../../assets/images/teatro2.jpeg';

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <Container>
      <ContainerSection>
        <TitleSection
          title="Quem somos?"
          subtitle="Saiba um pouco mais sobre nossa história"
        />
        <ContentSection>
          <Text>
            <p>
              O centro Espírita Irmã Veneranda localizado na
              Rua Floriano Peixoto nº 938, Jardim Alvorada em
              Andradina, atende pessoas carentes da comunidade,
              servindo refeições todas as terças e quintas-feiras no
              período da tarde e no domingo pela manhã. A Casa da
              Sopa fica na Rua Silvio Shimizu nº 1655, Vila Botega
              (Lar Esperança).
            </p>

          </Text>
          <Photo>
            <img src={imageAbout} alt="" />
          </Photo>
        </ContentSection>
      </ContainerSection>

      <ContainerSection bg>
        <ContentSection reverse>
          <Text>
            <p>
              Doar alimentos é um ato de empatia, de
              se colocar no lugar do outro.
              Os interessados em nos ajudar podem
              trazer alimentos não perecíveis, como:
              arroz, feijão, óleo, temperos, chocolate em pó,
              leite de caixinha, etc.
              Lembrando que o que importa não é a quantidade
              ou o que se dá, mas sim o amor com que se dá.
              Sua ajuda é muito importante para nós.
            </p>
          </Text>

          <Photo>
            <img src={imageAbout2} alt="" />
          </Photo>
        </ContentSection>
      </ContainerSection>

      <ContainerSection>
        <div className="photos-area">
          <Photo className="photo">
            <img src={imageTeatro1} alt="" />
          </Photo>
          <Photo className="photo">
            <img src={imageTeatro2} alt="" />
          </Photo>
        </div>
        <div className="section-teatro">
          <p>
            Além de oferecer alimentos, oferecemos também entretenimento em forma de teatro,
            pequenas apresentações, para divertir a população.
            É uma prazer imenso ve-los com um sorriso no rosto
          </p>
        </div>
      </ContainerSection>

      <ContainerSection bg>
        <div className="section-requests">

          <p className="enfase">
            Sua doação pode salvar vidas.
          </p>
          <p>
            Conheça a história de algumas famílias que precisam da sua ajuda, clique no botão
            abaixo e escolha uma solicitação que deseja ajudar.
          </p>
          <p>
            Um gesto simples pode fazer toda diferença no presente e no futuro, trazendo mais
            esperança para muitas pessoas.
          </p>

          <Button
            onClick={() => navigate('/doacoes')}
          >
            Solicitações
          </Button>
        </div>
      </ContainerSection>
    </Container>
  );
}
