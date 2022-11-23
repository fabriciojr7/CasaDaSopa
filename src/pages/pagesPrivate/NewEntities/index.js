import { useNavigate } from 'react-router-dom';
import EntityService from '../../../services/EntityService';
import toast from '../../../utils/toast';
import EntitiesForm from '../components/EntitiesForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewContributors() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await EntityService.createEntity(formData);
      toast({
        type: 'success',
        text: 'Entidade cadastrada com sucesso!',
        duration: 3000,
      });
      navigate('/adm/entidades');
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar a entidade!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Criação de entidades" to="/adm/entidades" />
      <EntitiesForm
        buttonLabel="Cadastrar entidade"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
