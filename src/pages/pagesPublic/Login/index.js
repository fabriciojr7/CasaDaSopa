import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import { AuthContext } from '../../../context/auth';
import toast from '../../../utils/toast';

import iconLogin from '../../../assets/images/iconLogin.png';

import {
  Areabtn, Container, Content, ImageLogin,
} from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() && !senha.trim()) {
      toast({
        type: 'danger',
        text: 'O e-mail e a senha devem ser informados!',
        duration: 3000,
      });
    } else if (!email.trim() && senha.trim()) {
      toast({
        type: 'danger',
        text: 'O e-mail deve ser informado!',
        duration: 3000,
      });
    } else if (email.trim() && !senha.trim()) {
      toast({
        type: 'danger',
        text: 'A senha deve ser informada!',
        duration: 3000,
      });
    } else {
      try {
        setIsLoadingLogin(true);
        await login(email, senha);
      } catch {
        toast({
          type: 'danger',
          text: 'Não foi possivel realizar o login!',
          duration: 3000,
        });
      } finally {
        setIsLoadingLogin(false);
      }
    }
  };

  return (
    <Container>
      <Content>
        <ImageLogin>
          <img src={iconLogin} alt="Imagem login" />
        </ImageLogin>
        <h1>Login</h1>

        <form onSubmit={handleSubmit} noValidate>
          <FormGrouping>
            <Input
              type="email"
              label="E-mail"
              value={email}
              change={(e) => setEmail(e.target.value)}
              disabled={isLoadingLogin}
              autoFocus
            />
          </FormGrouping>

          <FormGrouping>
            <Input
              type="password"
              label="Senha"
              value={senha}
              change={(e) => setSenha(e.target.value)}
              disabled={isLoadingLogin}
            />
          </FormGrouping>

          <Areabtn>
            <FormGrouping>
              <Button
                type="submit"
                disabled={isLoadingLogin}
                isLoading={isLoadingLogin}
              >
                Acessar painel
              </Button>
            </FormGrouping>

            <FormGrouping>
              <Button
                onClick={() => navigate('/')}
                disabled={isLoadingLogin}
              >
                Voltar a home
              </Button>
            </FormGrouping>
          </Areabtn>
        </form>
      </Content>
    </Container>
  );
}
