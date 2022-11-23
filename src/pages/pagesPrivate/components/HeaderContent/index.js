/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FaFilePdf } from 'react-icons/fa';

import { Container } from './styles';
import Button from '../../../../components/Button';

export default function HeaderContent({
  hasError, filteredArray, array, textSing,
  textPlu, to, print, textButtom, dontAdd,
}) {
  return (
    <Container
      justfyContent={
        hasError
          ? 'flex-end'
          : (array?.length > 0 ? 'space-between' : 'center')
    }
    >
      {(!hasError && array?.length > 0) && (
      <strong>
        {filteredArray.length}
        {filteredArray.length === 1 ? textSing : textPlu}
      </strong>
      )}

      <div className="actions">
        {print && (
        <abbr title="Relatório">
          <Button onClick={() => print()}>
            <FaFilePdf className="pdf" />
          </Button>
        </abbr>
        )}

        {!dontAdd && (
        <abbr title={textButtom}>
          <Link to={to}>
            <MdAdd />
          </Link>
        </abbr>
        )}
      </div>
    </Container>
  );
}
