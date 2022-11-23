import { useNavigate } from 'react-router-dom';
import ContributorService from '../../../services/ContributorService';
import toast from '../../../utils/toast';
import ContributorsForm from '../components/ContributorsForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewContributors() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await ContributorService.createContributor(formData);
      toast({
        type: 'success',
        text: 'Colaborador cadastrado com sucesso!',
        duration: 3000,
      });
      navigate('/adm/colaboradores');
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o colaborador!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/colaboradores" />
      <ContributorsForm
        buttonLabel="Cadastrar colaborador"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
