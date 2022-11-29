import { useNavigate } from 'react-router-dom';

import HeaderForm from '../components/HeaderForm';

import FamilyDonationService from '../../../services/FamilyDonationService';
import toast from '../../../utils/toast';
import FamilyDonationForm from '../components/FamilyDonationForm';
import {
  Container,
} from './styles';

export default function NewFamilyDonation() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await FamilyDonationService.createDonation(formData);
      //     {
      //     descricao: formData.descricao,
      //     entidadeId: 1,
      //     nome: formData.nome,
      //     responsavelId: formData.responsavelId,
      //     titulo: formData.titulo,
      //   }

      toast({
        type: 'success',
        text: 'Doação criada com sucesso!',
        duration: 3000,
      });
      navigate('/adm/familias/doacoes');
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar a doação!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Gerar doação" to="/adm/familias/doacoes" />

      <FamilyDonationForm onSubmit={handleSubmit} />

    </Container>
  );
}
