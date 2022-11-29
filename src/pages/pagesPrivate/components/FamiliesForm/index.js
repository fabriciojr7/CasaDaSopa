import { useState } from 'react';

import { ButtonContainer, Form } from './styles';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import useErrors from '../../../../hooks/useErrors';
import formatCpf from '../../../../utils/formatCpf';
import formatNascimento from '../../../../utils/formatNascimento';
import formatPhone from '../../../../utils/formatPhone';

export default function FamiliesForm({
  buttonLabel, responsavel, onSubmit,
}) {
  const [nome, setNome] = useState(responsavel?.nome);
  const [cpf, setCpf] = useState(responsavel?.cpf);
  const [telefone, setTelefone] = useState(responsavel?.telefone);
  const [nascimento, setNascimento] = useState(responsavel?.nascimento);
  const [renda, setRenda] = useState(responsavel?.renda);
  const [sexo, setSexo] = useState(responsavel?.sexo);
  const [outrasInformacoes, setOutrasInformacoes] = useState(responsavel?.outrasInformacoes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (nome && cpf && telefone && nascimento && renda && sexo);

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

  const handleNascimentoChange = (e) => {
    setNascimento(formatNascimento(e.target.value));

    if (!e.target.value) {
      setError({ field: 'nascimento', message: 'A data de nascimento é obrigatória.' });
    } else {
      removeError('nascimento');
      if (e.target.value.replace(/\D/g, '').length < 8) {
        setError({ field: 'nascimento-min', message: 'Data de nascimento é inválido.' });
      } else {
        removeError('nascimento-min');
      }
    }
  };

  const handleRendaChange = (e) => {
    setRenda(e.target.value.replace(/\D/g, ''));
    if (!e.target.value) {
      setError({ field: 'renda', message: 'A renda é obrigatória.' });
    } else {
      removeError('renda');
    }
  };

  const handleSexoChange = (e) => {
    setSexo(e.target.value);
    if (!e.target.value) {
      setError({ field: 'sexo', message: 'O gênero é obrigatório.' });
    } else {
      removeError('sexo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const dataFamilies = {
      nomeCompleto: nome,
      cpf,
      telefone,
      dataNasc: nascimento,
      renda: renda ? Number(renda) : 0,
      sexo,
      outrasInformacoes,
      entidadeId: 1,
    };
    onSubmit(dataFamilies).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <FormGrouping error={getErrorsMEssageByFieldName('nascimento') || getErrorsMEssageByFieldName('nascimento-min')}>
        <Input
          error={getErrorsMEssageByFieldName('nascimento') || getErrorsMEssageByFieldName('nascimento-min')}
          label="Data de nascimento *"
          value={nascimento}
          change={handleNascimentoChange}
          max={10}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('renda')}>
        <Input
          error={getErrorsMEssageByFieldName('renda')}
          label="Informe a renda da casa *"
          value={renda}
          change={handleRendaChange}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('sexo')}>
        <Select
          error={getErrorsMEssageByFieldName('sexo')}
          label="Gênero *"
          value={sexo}
          change={handleSexoChange}
          disabled={isSubmitting}
        >
          <option value="">Informe o seu gênero</option>
          <option value="F">Feminino</option>
          <option value="M">Masculino</option>
          <option value="O">Outros</option>
        </Select>
      </FormGrouping>

      <FormGrouping>
        <TextArea
          label="Observações"
          value={outrasInformacoes}
          change={(e) => setOutrasInformacoes(e.target.value)}
          max={240}
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
