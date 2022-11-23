/* eslint-disable react/jsx-one-expression-per-line */
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ term }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier question" />

      <span>
        Nenhum resultado foi encontrado para
        <strong> ”{term}”</strong>
      </span>
    </Container>
  );
}
