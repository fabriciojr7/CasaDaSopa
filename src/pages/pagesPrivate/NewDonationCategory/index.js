import { useNavigate } from 'react-router-dom';
import CategoryDonationService from '../../../services/CategoryDonationService';
import toast from '../../../utils/toast';
import DonationCategoryForm from '../components/DonationCategoryForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewDonationCategory() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await CategoryDonationService.createCategory(formData);
      toast({
        type: 'success',
        text: 'Categoria cadastrada com sucesso!',
        duration: 3000,
      });
      navigate('/adm/categoriasdoacao');
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar a categoria!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Criação de categoria" to="/adm/categoriasdoacao" />

      <DonationCategoryForm
        buttonLabel="Cadastrar categoria"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
