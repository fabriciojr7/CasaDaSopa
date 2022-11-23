import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Container } from './styles';

export default function Pagination({ pages, setCurrentPage, currentPage }) {
  const pageBack = () => {
    const page = currentPage;
    if (page > 0) {
      setCurrentPage(page - 1);
    }
  };

  const pageNext = () => {
    const page = currentPage;
    if (page + 1 < pages) {
      setCurrentPage(page + 1);
    }
  };

  return (
    <Container>
      <FaAngleLeft
        className={currentPage === 0 ? 'block' : ''}
        onClick={() => pageBack()}
      />
      {currentPage + 1}
      {' '}
      /
      {' '}
      {pages}
      <FaAngleRight
        className={currentPage + 1 === pages ? 'block' : ''}
        onClick={() => pageNext()}
      />
    </Container>
  );
}
