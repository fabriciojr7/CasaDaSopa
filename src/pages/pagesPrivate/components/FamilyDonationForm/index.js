import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import useErrors from '../../../../hooks/useErrors';
import CategoryDonationService from '../../../../services/CategoryDonationService';

import { Form, ButtonContainer } from './styles';

const FamilyDonationForm = forwardRef(({ onSubmit }, ref) => {
  const [responsavel] = useState(JSON.parse(localStorage.getItem('responsavel')));
  const [categoriaId, setCategoriaId] = useState('');
  const [categories, setCategories] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormInicial = (categoriaId && descricao);

  const isFormValid = (isFormInicial && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (familyDonation) => {
      setCategoriaId(familyDonation[0].categoria_id);
      setDescricao(familyDonation[0].descricao);
      setStatus(familyDonation[0].status);
    },
  }), []);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await CategoryDonationService.listCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  const handleCategoriaChange = (e) => {
    setCategoriaId(e.target.value);

    if (!e.target.value) {
      setError({ field: 'categoria', message: 'A categoria é obrigatória.' });
    } else {
      removeError('categoria');
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
    setIsSubmitting(true);
    onSubmit({
      responsavelId: responsavel.id,
      categoriaId,
      descricao,
      nome: responsavel.nome,
      status,
      entidadeId: 1,
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('categoria')}>
        <Select
          error={getErrorsMEssageByFieldName('categoria')}
          label="Categoria da doação *"
          value={categoriaId}
          change={handleCategoriaChange}
          disabled={isSubmitting || status === 'Solicitação Concluida'}
        >
          <option value="">Informe a categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.descricao}</option>
          ))}
        </Select>
      </FormGrouping>

      <FormGrouping error={getErrorsMEssageByFieldName('descricao') || getErrorsMEssageByFieldName('descricao-min')}>
        <TextArea
          error={getErrorsMEssageByFieldName('descricao') || getErrorsMEssageByFieldName('descricao-min')}
          label="Descrição sobre a doação"
          value={descricao}
          change={handleDescricaoChange}
          disabled={isSubmitting || status === 'Solicitação Concluida'}
          max={255}
        />
      </FormGrouping>

      {status && (
      <FormGrouping>
        <Select
          label="Status"
          value={status}
          change={(e) => setStatus(e.target.value)}
          disabled={isSubmitting || status === 'Solicitação Concluida'}
        >
          <option value="Solicitação Aberta">Doação aberta</option>
          <option value="Solicitação em Progresso">Doação em progresso</option>
          <option value="Solicitação Concluida">Doação concluída</option>
        </Select>
      </FormGrouping>
      )}

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          Confirmar
        </Button>
      </ButtonContainer>
    </Form>
  );
});

export default FamilyDonationForm;
