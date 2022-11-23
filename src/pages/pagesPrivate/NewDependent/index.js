import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DependentService from '../../../services/DependentService';
import toast from '../../../utils/toast';

import DependentsForm from '../components/DependentsForm';
import HeaderForm from '../components/HeaderForm';

import { Container } from './styles';

export default function NewDependent() {
  const [idFamily] = useState(localStorage.getItem('idFamily'));
  const navigate = useNavigate();

  useEffect(() => () => {
    localStorage.removeItem('idFamily');
  });

  const handleSubmit = async (formData) => {
    try {
      await DependentService.createDependent(formData);
      toast({
        type: 'success',
        text: 'Dependente cadastrado com sucesso!',
        duration: 3000,
      });
      navigate(`/adm/familia/edit/${idFamily}`);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o dependente!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Cadastro de dependente" to={`/adm/familia/edit/${idFamily}`} />

      <DependentsForm
        buttonLabel="Cadastrar depentende"
        idFamily={idFamily}
        onSubmit={handleSubmit}
      />

    </Container>
  );
}
