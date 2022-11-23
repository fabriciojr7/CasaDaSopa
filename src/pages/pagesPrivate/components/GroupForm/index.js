import {
  useState,
} from 'react';

import useErrors from '../../../../hooks/useErrors';

import { ButtonContainer, Form } from './styles';

import Button from '../../../../components/Button';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import FileInput from '../../../../components/FileInput';

export default function GroupForm({
  buttonLabel, onSubmit, group,
}) {
  const [nome, setNome] = useState(group?.nome);
  const [descricao, setDescricao] = useState(group?.descricao);
  const [selectedFile, setSelectedFile] = useState(group?.foto);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorsMEssageByFieldName,
  } = useErrors();

  const isFormValid = (nome && descricao && errors.length === 0);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    if (!e.target.value) {
      setError({ field: 'nome', message: 'O nome é obrigatório.' });
    } else {
      removeError('nome');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const data = new FormData();
    data.append('nome', nome);
    data.append('descricao', descricao);
    if (selectedFile) {
      data.append('foto', selectedFile);
    }
    data.append('entidadeId', 1);

    onSubmit(data).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('nome')}>
        <Input
          error={getErrorsMEssageByFieldName('nome')}
          label="Nome do grupo *"
          value={nome}
          change={handleNomeChange}
          max={60}
          disabled={isSubmitting}
        />
      </FormGrouping>

      <FormGrouping>
        <TextArea
          label="Descrição sobre o grupo *"
          value={descricao}
          change={(e) => setDescricao(e.target.value)}
          disabled={isSubmitting}
          max={256}
        />
      </FormGrouping>

      <FormGrouping>
        <FileInput image={selectedFile} setImage={setSelectedFile} />
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
