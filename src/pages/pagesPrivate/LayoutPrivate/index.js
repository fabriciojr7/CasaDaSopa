import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

import {
  Container, Menu, Content, ContentContainer,
} from './styles';

export default function Layout() {
  return (
    <Container>
      <Menu>
        <NavBar />
      </Menu>

      <Content>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Content>
    </Container>
  );
}
