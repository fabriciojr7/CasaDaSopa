import { Container } from './styles';

import Banner from '../components/Banner';
import HelpAreas from '../components/HelpAreas';

export default function Home() {
  return (
    <Container>
      <Banner />
      <HelpAreas />
    </Container>
  );
}
