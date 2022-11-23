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

export default function Contact() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

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
          <FormGrouping>
            <Input
              label="Informe seu nome *"
              value={nome}
              change={(e) => setNome(e.target.value)}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <FormGrouping>
            <Input
              label="Informe seu email *"
              value={email}
              change={(e) => setEmail(e.target.value)}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <FormGrouping>
            <Input
              label="Informe o assunto *"
              value={assunto}
              change={(e) => setAssunto(e.target.value)}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <FormGrouping>
            <TextArea
              label="Escreva sua mensagem *"
              value={mensagem}
              change={(e) => setMensagem(e.target.value)}
              disabled={isLoadingEmail}
            />
          </FormGrouping>

          <ButtonContainer>
            <Button
              type="submit"
            //   disabled={!isFormValid}
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
