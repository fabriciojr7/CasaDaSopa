import { useNavigate } from 'react-router-dom';

import HeaderForm from '../components/HeaderForm';

import FamilyDonationService from '../../../services/FamilyDonationService';
import toast from '../../../utils/toast';
import FamilyRequestForm from '../components/FamilyRequestForm';
import {
  Container,
} from './styles';

export default function NewFamilyDonation() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await FamilyDonationService.createDonation({
        descricao: formData.descricao,
        entidadeId: 1,
        nome: formData.nome,
        responsavelId: formData.responsavelId,
        titulo: formData.titulo,
      });
      toast({
        type: 'success',
        text: 'oação criada com sucesso!',
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

      <FamilyRequestForm onSubmit={handleSubmit} />

    </Container>
  );
}
