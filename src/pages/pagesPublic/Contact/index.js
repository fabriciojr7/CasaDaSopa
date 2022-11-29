import { useState } from 'react';

import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import ContainerSection from '../components/ContainerSection';
import TitleSection from '../components/TitleSection';

import { ButtonContainer, Form, Address } from './styles';
import maps from '../../../assets/images/maps.jpeg';
import MailService from '../../../services/MailService';

import toast from '../../../utils/toast';
import useErrors from '../../../hooks/useErrors';
import isEmailValid from '../../../utils/isEmailValid';

export default function Contact() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (nome && email && assunto && mensagem);

  const isFormValid = (isFormInicial && errors.length === 0);

  const handleNomeChange = (e) => {
    setNome(e.target.value);

    if (!e.target.value) {
      setError({ field: 'nome', message: 'O nome é obrigatório.' });
    } else {
      removeError('nome');
      if (e.target.value.length < 3) {
        setError({ field: 'nome-min', message: 'O nome deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('nome-min');
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (!e.target.value) {
      setError({ field: 'email', message: 'O email é obrigatório.' });
    } else {
      removeError('email');
      if (!isEmailValid(e.target.value)) {
        setError({ field: 'email-valid', message: 'Informe um e-mail válido.' });
      } else {
        removeError('email-valid');
      }
    }
  };

  const handleAssuntoChange = (e) => {
    setAssunto(e.target.value);

    if (!e.target.value) {
      setError({ field: 'assunto', message: 'O assunto é obrigatório.' });
    } else {
      removeError('assunto');
      if (e.target.value.length < 3) {
        setError({ field: 'assunto-min', message: 'O assunto deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('assunto-min');
      }
    }
  };

  const handleMensagemChange = (e) => {
    setMensagem(e.target.value);

    if (!e.target.value) {
      setError({ field: 'mensagem', message: 'A mensagem é obrigatória.' });
    } else {
      removeError('mensagem');
      if (e.target.value.length < 3) {
        setError({ field: 'mensagem-min', message: 'A mensagem deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('mensagem-min');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingEmail(true);
      await MailService.mailContact({
        nome,
        emailContato: email,
        assunto,
        mensagem,
      });

      setNome('');
      setEmail('');
      setAssunto('');
      setMensagem('');
      toast({
        type: 'success',
        text: 'E-mail enviado com sucesso.',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao enviar e-mail.',
      });
    } finally {
      setIsLoadingEmail(false);
    }
  };

  return (
    <>
      <ContainerSection>

        <TitleSection
          title="Entre em contato"
          subtitle="Ficaremos felizes em tirar suas dúvidas"
        />

        <Form onSubmit={handleSubmit} noValidate>
          <FormGrouping error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}>
            <Input
              error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}
              label="Informe seu nome *"
              value={nome}
              change={handleNomeChange}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <FormGrouping error={getErrorsMEssageByFieldName('email') || getErrorsMEssageByFieldName('email-valid')}>
            <Input
              error={getErrorsMEssageByFieldName('email') || getErrorsMEssageByFieldName('email-valid')}
              label="Informe seu email *"
              value={email}
              change={handleEmailChange}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <FormGrouping error={getErrorsMEssageByFieldName('assunto') || getErrorsMEssageByFieldName('assunto-min')}>
            <Input
              error={getErrorsMEssageByFieldName('assunto') || getErrorsMEssageByFieldName('assunto-min')}
              label="Informe o assunto *"
              value={assunto}
              change={handleAssuntoChange}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <FormGrouping error={getErrorsMEssageByFieldName('mensagem') || getErrorsMEssageByFieldName('mensagem-min')}>
            <TextArea
              error={getErrorsMEssageByFieldName('mensagem') || getErrorsMEssageByFieldName('mensagem-min')}
              label="Escreva sua mensagem *"
              value={mensagem}
              change={handleMensagemChange}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <ButtonContainer>
            <Button
              type="submit"
              disabled={!isFormValid}
              isLoading={isLoadingEmail}
            >
              Enviar email

            </Button>
          </ButtonContainer>
        </Form>

      </ContainerSection>

      <ContainerSection bg>
        <Address>
          <h3>Veja nossa localização e venha fazer uma visita</h3>
          <a
            href={`https://www.google.com.br/maps/place/R.+Eng.+Sylvio+Seiji+Shimizu,+1655+-+Vila+Peliciari,
        +Andradina+-+SP,+16901-040/@-20.8901115,-51.3856497,17z/data=!3m1!4b1!4m5!3m4!1s0x9490b57be15d0745:0xa977a82235fd9a15!8m2!3d-20.8901115!4d-51.383461`}
          >
            <img src={maps} alt="Mapa" />
          </a>

        </Address>
      </ContainerSection>
    </>
  );
}
