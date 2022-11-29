import {
  useState,
} from 'react';

import { ButtonContainer, Form } from './styles';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import useErrors from '../../../../hooks/useErrors';
import formatCpf from '../../../../utils/formatCpf';
import formatPhone from '../../../../utils/formatPhone';
import isEmailValid from '../../../../utils/isEmailValid';

export default function ContributorsForm({
  buttonLabel, onSubmit, contributor,
}) {
  const [nome, setNome] = useState(contributor?.nome);
  const [sobrenome, setSobrenome] = useState(contributor?.sobrenome);
  const [cpf, setCpf] = useState(contributor?.cpf);
  const [telefone, setTelefone] = useState(contributor?.telefone);
  const [email, setEmail] = useState(contributor?.email);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (nome && sobrenome && cpf && telefone && email);

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

  const handleSobrenomeChange = (e) => {
    setSobrenome(e.target.value);

    if (!e.target.value) {
      setError({ field: 'sobrenome', message: 'O sobrenome é obrigatório.' });
    } else {
      removeError('sobrenome');
      if (e.target.value.length < 3) {
        setError({ field: 'sobrenome-min', message: 'O sobrenome deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('sobrenome-min');
      }
    }
  };

  const handleCpfChange = (e) => {
    setCpf(formatCpf(e.target.value));

    if (!e.target.value) {
      setError({ field: 'cpf', message: 'O CPF é obrigatório.' });
    } else {
      removeError('cpf');
      if (e.target.value.replace(/\D/g, '').length < 11) {
        setError({ field: 'cpf-min', message: 'O CPF é inválido.' });
      } else {
        removeError('cpf-min');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataContributors = {
      nome,
      sobrenome,
      cpf,
      telefone,
      email,
      entidadeId: 1,
    };

    onSubmit(dataContributors).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGrouping error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}>
        <Input
          error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}
          label="Nome *"
          value={nome}
          change={handleNomeChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('sobrenome') || getErrorsMEssageByFieldName('sobrenome-min')}>
        <Input
          error={getErrorsMEssageByFieldName('sobrenome') || getErrorsMEssageByFieldName('sobrenome-min')}
          label="Sobrenome *"
          value={sobrenome}
          change={handleSobrenomeChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('cpf') || getErrorsMEssageByFieldName('cpf-min')}>
        <Input
          error={getErrorsMEssageByFieldName('cpf') || getErrorsMEssageByFieldName('cpf-min')}
          label="CPF *"
          value={cpf}
          change={handleCpfChange}
          max={14}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('phone') || getErrorsMEssageByFieldName('phone-min')}>
        <Input
          error={getErrorsMEssageByFieldName('phone') || getErrorsMEssageByFieldName('phone-min')}
          label="Telefone *"
          max={14}
          value={telefone}
          change={handlePhoneChange}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('email') || getErrorsMEssageByFieldName('email-valid')}>
        <Input
          error={getErrorsMEssageByFieldName('email') || getErrorsMEssageByFieldName('email-valid')}
          label="E-mail *"
          value={email}
          change={handleEmailChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
