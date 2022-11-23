import {
  useState,
} from 'react';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

export default function FamilyRequestForm({ onSubmit, familyRequest }) {
  const [responsavel] = useState(JSON.parse(localStorage.getItem('responsavel')));
  const [titulo, setTitulo] = useState(familyRequest?.titulo);
  const [descricao, setDescricao] = useState(familyRequest?.descricao);
  const [status, setStatus] = useState(familyRequest?.status);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (titulo && descricao);

  const isFormValid = (isFormInicial && errors.length === 0);

  const handleTitleChange = (e) => {
    setTitulo(e.target.value);

    if (!e.target.value) {
      setError({ field: 'titulo', message: 'O titúlo é obrigatório.' });
    } else {
      removeError('titulo');
      if (e.target.value.length < 3) {
        setError({ field: 'titulo-min', message: 'O titúlo tem pelo menos 3 caractéres.' });
      } else {
        removeError('titulo-min');
      }
    }
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);

    if (!e.target.value) {
      setError({ field: 'descricao', message: 'A descrição é obrigatória.' });
    } else {
      removeError('descricao');
      if (e.target.value.length < 3) {
        setError({ field: 'descricao-min', message: 'A descrição tem pelo menos 3 caractéres.' });
      } else {
        removeError('descricao-min');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSolicitacao = {
      responsavelId: responsavel.id,
      titulo,
      descricao,
      nome: responsavel.nome,
      status,
      entidadeId: 1,
    };
    onSubmit(dataSolicitacao);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('titulo') || getErrorsMEssageByFieldName('titulo-min')}>
        <Input
          error={getErrorsMEssageByFieldName('titulo') || getErrorsMEssageByFieldName('titulo-min')}
          label="Titulo da solicitação *"
          value={titulo}
          change={handleTitleChange}
        />
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('descricao') || getErrorsMEssageByFieldName('descricao-min')}>
        <TextArea
          error={getErrorsMEssageByFieldName('descricao') || getErrorsMEssageByFieldName('descricao-min')}
          label="Descrição detalhada da solicitação"
          value={descricao}
          change={handleDescricaoChange}
        />
      </FormGrouping>

      {status && (
        <FormGrouping>
          <Select
            label="Status"
            value={status}
            change={(e) => setStatus(e.target.value)}
          >
            <option value="Solicitação Aberta">Solicitação aberta</option>
            <option value="Solicitação em Progresso">Solicitação em progresso</option>
            <option value="Solicitação Concluida">Solicitação concluída</option>
          </Select>
        </FormGrouping>
      )}

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>Confirmar</Button>
      </ButtonContainer>
    </Form>
  );
}
