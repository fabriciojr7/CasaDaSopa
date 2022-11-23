import {
  Outlet,
} from 'react-router-dom';
import Header from '../components/Header';

import {
  Container,
  Content, Footer,
} from './styles';

export default function LayoutPublic() {
  return (
    <Container>
      <Header />

      <Content>
        <Outlet />
      </Content>

      <Footer>
        <strong>Casa da sopa © 2022</strong>
        <small>Desenvolvido por Fabrício e Felipe</small>
      </Footer>
    </Container>
  );
}
