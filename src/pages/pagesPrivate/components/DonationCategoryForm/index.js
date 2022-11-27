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
  buttonLabel, onSubmit, category,
}) {
  const [descricao, setDescricao] = useState(category?.descricao);
  const [email, setEmail] = useState(category?.email);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (descricao && email);

  const isFormValid = (isFormInicial && errors.length === 0);

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);

    if (!e.target.value) {
      setError({ field: 'descricao', message: 'A descrição é obrigatória.' });
    } else {
      removeError('descricao');
      if (e.target.value.length < 3) {
        setError({ field: 'descricao-min', message: 'A descrição deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('descricao-min');
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

    const dataCategories = {
      descricao,
      //   email,
    };

    onSubmit(dataCategories);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGrouping error={getErrorsMEssageByFieldName('descricao') || getErrorsMEssageByFieldName('descricao-min')}>
        <Input
          error={getErrorsMEssageByFieldName('descricao') || getErrorsMEssageByFieldName('descricao-min')}
          label="Descrição *"
          value={descricao}
          change={handleDescricaoChange}
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
