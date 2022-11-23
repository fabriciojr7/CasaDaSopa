import { FaSearch } from 'react-icons/fa';
// import Input2 from '../../../../components/Input2';
import { Container, IconSearch } from './styles';
//
export default function InputSearch({ value, change, place }) {
  return (
    <Container>
      <input
        value={value}
        onChange={change}
        placeholder={place}
        // autoFocus
      />
      <IconSearch>
        <FaSearch />
      </IconSearch>
    </Container>
  );
}
