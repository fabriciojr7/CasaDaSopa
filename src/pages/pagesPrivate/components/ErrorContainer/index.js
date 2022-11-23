import { MdErrorOutline } from 'react-icons/md';
import Button from '../../../../components/Button';

import { Container } from './styles';

export default function ErrorContainer({ msgErro, click }) {
  return (
    <Container>
      <MdErrorOutline className="ico" />
      <div className="details">
        <strong>
          {msgErro}
        </strong>
        <Button type="button" onClick={click}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}
