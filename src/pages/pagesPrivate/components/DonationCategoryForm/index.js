import {
  useState,
} from 'react';

import { ButtonContainer, Form } from './styles';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import useErrors from '../../../../hooks/useErrors';
import isEmailValid from '../../../../utils/isEmailValid';

export default function DonationCategoryForm({
  buttonLabel, onSubmit, donation,
}) {
  const [nome, setNome] = useState(donation?.nome);
  const [email, setEmail] = useState(donation?.email);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (nome && email);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataContributors = {
      nome,
      email,
      entidadeId: 1,
    };

    onSubmit(dataContributors);
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
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('email') || getErrorsMEssageByFieldName('email-valid')}>
        <Input
          error={getErrorsMEssageByFieldName('email') || getErrorsMEssageByFieldName('email-valid')}
          label="E-mail *"
          value={email}
          change={handleEmailChange}
          max={60}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
