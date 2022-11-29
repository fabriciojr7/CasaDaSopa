import { useState } from 'react';

import { Form, ButtonContainer } from './styles';

import formatCep from '../../../../utils/formatCep';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import useErrors from '../../../../hooks/useErrors';

export default function AddressForm({
  buttonLabel, endereco, idResp, onSubmit,
}) {
  const [cep, setCep] = useState(endereco?.cep);
  const [estado, setEstado] = useState(endereco?.estado);
  const [cidade, setCidade] = useState(endereco?.cidade);
  const [rua, setRua] = useState(endereco?.rua);
  const [numero, setNumero] = useState(endereco?.numero);
  const [bairro, setBairro] = useState(endereco?.bairro);
  const [complemento, setComplemento] = useState(endereco?.complemento);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (cep && rua && bairro && numero && cidade && estado);

  const isFormValid = (isFormInicial && errors.length === 0);

  const handleCepChange = (e) => {
    setCep(formatCep(e.target.value));

    if (!e.target.value) {
      setError({ field: 'cep', message: 'O cep é obrigatório.' });
    } else {
      removeError('cep');
      if (e.target.value.length < 8) {
        setError({ field: 'cep-min', message: 'O cep é inválido.' });
      } else {
        removeError('cep-min');
      }
    }
  };

  const handleRuaChange = (e) => {
    setRua(e.target.value);

    if (!e.target.value) {
      setError({ field: 'rua', message: 'A rua é obrigatória.' });
    } else {
      removeError('rua');
      if (e.target.value.length < 3) {
        setError({ field: 'rua-min', message: 'A rua tem pelo menos 3 caractéres.' });
      } else {
        removeError('rua-min');
      }
    }
  };

  const handleBairroChange = (e) => {
    setBairro(e.target.value);
    if (!e.target.value) {
      setError({ field: 'bairro', message: 'O bairro é obrigatório.' });
    } else {
      removeError('bairro');
      if (e.target.value.length < 3) {
        setError({ field: 'bairro-min', message: 'O bairro tem pelo menos 3 caractéres.' });
      } else {
        removeError('bairro-min');
      }
    }
  };

  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
    if (!e.target.value) {
      setError({ field: 'numero', message: 'O número é obrigatório.' });
    } else {
      removeError('numero');
    }
  };

  const handleCidadeChange = (e) => {
    setCidade(e.target.value);
    if (!e.target.value) {
      setError({ field: 'cidade', message: 'A cidade é obrigatória.' });
    } else {
      removeError('cidade');
      if (e.target.value.length < 3) {
        setError({ field: 'cidade-min', message: 'A cidade tem pelo menos 3 caractéres.' });
      } else {
        removeError('cidade-min');
      }
    }
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
    if (!e.target.value) {
      setError({ field: 'estado', message: 'O estado é obrigatório.' });
    } else {
      removeError('estado');
      if (e.target.value.length < 2) {
        setError({ field: 'estado-min', message: 'O estado tem pelo menos 2 caractéres.' });
      } else {
        removeError('estado-min');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const dataEnd = {
      cep,
      estado,
      cidade,
      rua,
      numero,
      bairro,
      complemento,
      responsavelId: idResp,
    };

    onSubmit(dataEnd).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('cep') || getErrorsMEssageByFieldName('cep-min')}>
        <Input
          error={getErrorsMEssageByFieldName('cep') || getErrorsMEssageByFieldName('cep-min')}
          label="CEP"
          value={cep}
          change={handleCepChange}
          max={9}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('rua') || getErrorsMEssageByFieldName('rua-min')}>
        <Input
          error={getErrorsMEssageByFieldName('rua') || getErrorsMEssageByFieldName('rua-min')}
          label="Rua"
          value={rua}
          change={handleRuaChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('bairro') || getErrorsMEssageByFieldName('bairro-min')}>
        <Input
          error={getErrorsMEssageByFieldName('bairro') || getErrorsMEssageByFieldName('bairro-min')}
          label="Bairro"
          value={bairro}
          change={handleBairroChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('numero')}>
        <Input
          error={getErrorsMEssageByFieldName('numero')}
          label="Número"
          value={numero}
          change={handleNumeroChange}
          max={20}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          label="Complemento"
          value={complemento}
          change={(e) => setComplemento(e.target.value)}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('cidade') || getErrorsMEssageByFieldName('cidade-min')}>
        <Input
          error={getErrorsMEssageByFieldName('cidade') || getErrorsMEssageByFieldName('cidade-min')}
          label="Cidade"
          value={cidade}
          change={handleCidadeChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('estado') || getErrorsMEssageByFieldName('estado-min')}>
        <Input
          error={getErrorsMEssageByFieldName('estado') || getErrorsMEssageByFieldName('estado-min')}
          label="Estado"
          value={estado}
          change={handleEstadoChange}
          max={30}
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
