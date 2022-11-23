import DonationCategoryForm from '../components/DonationCategoryForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewDonationCategory() {
  return (
    <Container>
      <HeaderForm title="Criação de categoria" to="/adm/categoriasdoacao" />

      <DonationCategoryForm
        buttonLabel="Cadastrar categoria"
      />
    </Container>
  );
}
