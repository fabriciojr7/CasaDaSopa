import DonationCategoryForm from '../components/DonationCategoryForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditDonationCategory() {
  return (
    <Container>
      <HeaderForm title="Edição de categoria" to="/adm/categoriasdoacao" />

      <DonationCategoryForm
        buttonLabel="Salvar alterações"
      />
    </Container>
  );
}
