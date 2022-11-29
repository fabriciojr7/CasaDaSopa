import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form, Text, TextForm, ButtonContainer,
} from './styles';

import TitleSection from '../components/TitleSection';
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import ContainerSection from '../components/ContainerSection';

import formatPhone from '../../../utils/formatPhone';
import TextArea from '../../../components/TextArea';
import toast from '../../../utils/toast';
import MailService from '../../../services/MailService';
import FamilyRequestService from '../../../services/FamilyDonationService';
import isEmailValid from '../../../utils/isEmailValid';
import useErrors from '../../../hooks/useErrors';

export default function Donation() {
  const [familyRequest, setFamilyRequest] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadResquest = async () => {
      try {
        const { data } = await FamilyRequestService.getDonation(id);
        if (data.length === 0) {
          toast({
            text: 'Nenhuma doação encontrada!',
            duration: 5000,
          });
          navigate('/doacoes');
        }

        setFamilyRequest(data[0]);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados da doação!',
          duration: 5000,
        });
        navigate('/doacoes');
      }
    };

    loadResquest();
  }, [id, navigate]);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (nome && email && telefone && mensagem);

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

  const handlePhoneChange = (e) => {
    setTelefone(formatPhone(e.target.value));

    if (!e.target.value) {
      setError({ field: 'phone', message: 'O telefone é obrigatório.' });
    } else {
      removeError('phone');
      if (e.target.value.replace(/\D/g, '').length < 10) {
        setError({ field: 'phone-min', message: 'O telefone é inválido.' });
      } else {
        removeError('phone-min');
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
        title="Contribue com a doação:"
        subtitle={familyRequest?.categorias?.descricao || 'Tipo de doação'}
      />

      <Loader isLoading={isLoading} />

      <Text>
        <p>{familyRequest?.descricao}</p>
      </Text>

      <Form onSubmit={handleSubmit} noValidate>
        <TextForm>
          <h2>Envie seus dados que entraremos em contato em breve</h2>
        </TextForm>

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

        <FormGrouping error={getErrorsMEssageByFieldName('phone') || getErrorsMEssageByFieldName('phone-min')}>
          <Input
            error={getErrorsMEssageByFieldName('phone') || getErrorsMEssageByFieldName('phone-min')}
            label="Informe seu Telefone *"
            max={14}
            value={telefone}
            change={handlePhoneChange}
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
          <button
            type="button"
            className="cancel"
            onClick={() => navigate('/doacoes')}
            disabled={isLoadingEmail}
          >
            Cancelar
          </button>
          <Button
            type="submit"
            disabled={!isFormValid}
            isLoading={isLoadingEmail}
          >
            Confirmar
          </Button>
        </ButtonContainer>

      </Form>
    </ContainerSection>
  );
}
