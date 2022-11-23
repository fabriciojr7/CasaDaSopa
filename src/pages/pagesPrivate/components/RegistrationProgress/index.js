import { Container, StatusBar, Progress } from './styles';

export default function RegistrationProgress({ check }) {
  return (
    <Container>
      <StatusBar>
        <li>
          <div className="top-bar" />
          <Progress className="one active">
            <span>1</span>

          </Progress>
          <p className="text">Responsável</p>
        </li>
        <li>
          <div className="top-bar" />
          <Progress className={check === 2 ? 'active' : ''}>
            <span>2</span>
          </Progress>
          <p className="text">Endereço</p>
        </li>
      </StatusBar>
    </Container>
  );
}
