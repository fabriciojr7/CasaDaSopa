import {
  Container, Content,
} from './styles';

export default function ContainerSection({ bg = false, children }) {
  return (
    <Container bg={bg}>
      <Content>
        {children}
      </Content>
    </Container>
  );
}
