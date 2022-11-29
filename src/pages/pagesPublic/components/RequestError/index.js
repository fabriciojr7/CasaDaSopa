import sad from '../../../../assets/images/icons/sad.svg';

import { Container } from './styles';

export default function RequestError() {
  return (
    <Container>
      <img src={sad} alt="Sad" />

      <span>
        Houve um erro ao carregar os dados, tente novamente mais tarde!
      </span>
    </Container>
  );
}
