import { useEffect, useState } from 'react';

import { ButtonContainer, Form } from './styles';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Loader from '../../../../components/Loader';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import useErrors from '../../../../hooks/useErrors';
import formatCpf from '../../../../utils/formatCpf';
import formatNascimento from '../../../../utils/formatNascimento';

export default function DependentsForm({
  buttonLabel, idFamily, onSubmit, dependent,
}) {
  const [isLoading] = useState(false);
  const [nome, setNome] = useState(dependent?.nome_completo);
  const [cpf, setCpf] = useState(dependent?.cpf);
  const [sexo, setSexo] = useState(dependent?.sexo);
  const [outrasInformacoes, setOutrasInformacoes] = useState(dependent?.outras_informacoes);
  const [nascimento, setNascimento] = useState(dependent?.data_nasc);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (nome && cpf && nascimento && sexo);

  const isFormValid = (isFormInicial && errors.length === 0);

  useEffect(() => () => {
    localStorage.removeItem('idFamily');
  });

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

    const dataDepend = {
      responsavelId: idFamily,
      nomeCompleto: nome,
      cpf,
      dataNasc: nascimento,
      sexo,
      outrasInformacoes,
      entidadeId: 1,
    };

    onSubmit(dataDepend);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Loader isLoading={isLoading} />
      <FormGrouping error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}>
        <Input
          error={getErrorsMEssageByFieldName('nome') || getErrorsMEssageByFieldName('nome-min')}
          label="Nome *"
          value={nome}
          change={handleNomeChange}
          max={60}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('cpf') || getErrorsMEssageByFieldName('cpf-min')}>
        <Input
          error={getErrorsMEssageByFieldName('cpf') || getErrorsMEssageByFieldName('cpf-min')}
          label="CPF *"
          value={cpf}
          change={handleCpfChange}
          max={14}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('nascimento') || getErrorsMEssageByFieldName('nascimento-min')}>
        <Input
          error={getErrorsMEssageByFieldName('nascimento') || getErrorsMEssageByFieldName('nascimento-min')}
          label="Data de nascimento *"
          value={nascimento}
          change={handleNascimentoChange}
          max={10}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('sexo')}>
        <Select
          error={getErrorsMEssageByFieldName('sexo')}
          label="Gênero *"
          value={sexo}
          change={handleSexoChange}
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
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
