import {
  useState,
} from 'react';

import useErrors from '../../../../hooks/useErrors';

import { ButtonContainer, Form } from './styles';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

export default function AlbumForm({
  buttonLabel, onSubmit, album,
}) {
  const [descricao, setDescricao] = useState(album?.descricao);
  const [visivel, setVisivel] = useState(album?.visivel);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormValid = (descricao && errors.length === 0);

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
    if (!e.target.value) {
      setError({ field: 'descricao', message: 'A descrição é obrigatório.' });
    } else {
      removeError('descricao');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    // const dataAlbum = {
    //   descricao,
    //   visivel,
    // };

    onSubmit({
      descricao,
      visivel,
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('descricao')}>
        <Input
          error={getErrorsMEssageByFieldName('descricao')}
          label="Descrição do álbum *"
          value={descricao}
          change={handleDescricaoChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>
      <FormGrouping error={getErrorsMEssageByFieldName('descricao')}>
        <Select
          label="Visivel no site"
          value={visivel}
          change={(e) => setVisivel(e.target.value)}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </Select>
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
