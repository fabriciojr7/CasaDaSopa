import {
  useState,
} from 'react';

import { ButtonContainer, Form } from './styles';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import useErrors from '../../../../hooks/useErrors';
import formatCnpj from '../../../../utils/formatCnpj';
import formatPhone from '../../../../utils/formatPhone';
import isEmailValid from '../../../../utils/isEmailValid';

export default function EntitiesForm({
  buttonLabel, onSubmit, entity,
}) {
  const [nome, setNome] = useState(entity?.nome_fantasia);
  const [razao, setRazao] = useState(entity?.razao_social);
  const [cnpj, setCnpj] = useState(entity?.cnpj);
  const [telefone, setTelefone] = useState(entity?.telefone);
  const [email, setEmail] = useState(entity?.email);
  const [endereco, setEndereco] = useState(entity?.endereco);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (nome && razao && cnpj && telefone && email && endereco);

  const isFormValid = (isFormInicial && errors.length === 0);

  const handleNomeChange = (e) => {
    setNome(e.target.value);

    if (!e.target.value) {
      setError({ field: 'nome', message: 'O nome fantasia é obrigatório.' });
    } else {
      removeError('nome');
      if (e.target.value.length < 3) {
        setError({ field: 'nome-min', message: 'O nome fantasia deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('nome-min');
      }
    }
  };

  const handleRazaoChange = (e) => {
    setRazao(e.target.value);

    if (!e.target.value) {
      setError({ field: 'razao', message: 'A razão social é obrigatória.' });
    } else {
      removeError('razao');
      if (e.target.value.length < 3) {
        setError({ field: 'razao-min', message: 'A razão social deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('razao-min');
      }
    }
  };

  const handleCnpjChange = (e) => {
    setCnpj(formatCnpj(e.target.value));

    if (!e.target.value) {
      setError({ field: 'cnpj', message: 'O CNPJ é obrigatório.' });
    } else {
      removeError('cnpj');
      if (e.target.value.replace(/\D/g, '').length < 14) {
        setError({ field: 'cnpj-min', message: 'O CNPJ é inválido.' });
      } else {
        removeError('cnpj-min');
      }
    }
  };

  const handleTelefoneChange = (e) => {
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

  const handleEnderecoChange = (e) => {
    setEndereco(e.target.value);

    if (!e.target.value) {
      setError({ field: 'endereco', message: 'O endereço é obrigatório.' });
    } else {
      removeError('endereco');
      if (e.target.value.length < 3) {
        setError({ field: 'endereco-min', message: 'O endereco deve ter pelo menos 3 caracteres.' });
      } else {
        removeError('endereco-min');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEntities = {
      nomeFantasia: nome,
      razaoSocial: razao,
      cnpj,
      telefone,
      email,
      endereco,
    };

    onSubmit(dataEntities);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGrouping error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}>
        <Input
          error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}
          label="Nome fantasia *"
          value={nome}
          change={handleNomeChange}
          max={60}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('razao') || getErrorsMEssageByFieldName('razao-min')}>
        <Input
          error={getErrorsMEssageByFieldName('razao') || getErrorsMEssageByFieldName('razao-min')}
          label="Razão social *"
          value={razao}
          change={handleRazaoChange}
          max={60}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('cnpj') || getErrorsMEssageByFieldName('cnpj-min')}>
        <Input
          error={getErrorsMEssageByFieldName('cnpj') || getErrorsMEssageByFieldName('cnpj-min')}
          label="CNPJ *"
          value={cnpj}
          change={handleCnpjChange}
          max={18}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('phone') || getErrorsMEssageByFieldName('phone-min')}>
        <Input
          error={getErrorsMEssageByFieldName('phone') || getErrorsMEssageByFieldName('phone-min')}
          label="Telefone *"
          value={telefone}
          change={handleTelefoneChange}
          max={14}
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

      <FormGrouping error={getErrorsMEssageByFieldName('endereco') || getErrorsMEssageByFieldName('endereco-min')}>
        <Input
          error={getErrorsMEssageByFieldName('endereco') || getErrorsMEssageByFieldName('endereco-min')}
          label="Endereço *"
          value={endereco}
          change={handleEnderecoChange}
          max={120}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
