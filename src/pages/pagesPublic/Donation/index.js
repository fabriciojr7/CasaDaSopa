import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form, Text, TextForm, ButtonContainer,
} from './styles';

import TitleSection from '../components/TitleSection';
//   import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import ContainerSection from '../components/ContainerSection';

import formatPhone from '../../../utils/formatPhone';
import TextArea from '../../../components/TextArea';
import toast from '../../../utils/toast';
import MailService from '../../../services/MailService';
import FamilyRequestService from '../../../services/FamilyDonationService';

export default function Donation() {
  const [familyRequest, setFamilyRequest] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadResquest = async () => {
      try {
        const { data } = await FamilyRequestService.getDonation(id);
        setFamilyRequest(data);
      } catch {
        //
      }
    };

    loadResquest();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingEmail(true);
      await MailService.mailSolicitacao({
        nome,
        emailContato: email,
        solicitacaoId: id,
        telefone,
        mensagem,
      });

      setNome('');
      setEmail('');
      setTelefone('');
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
    <ContainerSection>

      <TitleSection
        title="Contribua com a solicitação:"
        subtitle={familyRequest?.titulo}
      />

      <Text>
        <p>{familyRequest?.descricao}</p>

      </Text>

      <Form onSubmit={handleSubmit} noValidate>
        <TextForm>
          <h2>Envie seus dados que entraremos em contato em breve</h2>
        </TextForm>

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
            label="Informe seu Telefone *"
            value={telefone}
            change={(e) => setTelefone(formatPhone(e.target.value))}
            max={14}
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
          <button
            type="button"
            className="cancel"
            onClick={() => navigate('/doacoes')}
          >
            Cancelar
          </button>
          <Button
            type="submit"
            isLoading={isLoadingEmail}
          >
            Confirmar
          </Button>
        </ButtonContainer>

      </Form>
    </ContainerSection>
  );
}
