/* eslint-disable react/jsx-one-expression-per-line */
import emptyBox from '../../../../assets/images/empty-box.svg';

import { Container } from './styles';

export default function EmptyList({ term, visbleStrong }) {
  return (
    <Container>
      <img src={emptyBox} alt="Empty box" />
      <p>
        {term}! <br />
        {!visbleStrong && (
        <>
          Clique no botão <strong>”+”</strong> à cima para cadastrar o primeiro!
        </>
        )}
      </p>
    </Container>
  );
}
