import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';

import FamilyDonationService from '../../../services/FamilyDonationService';
import toast from '../../../utils/toast';
import FamilyDonationForm from '../components/FamilyDonationForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditFamilyDonation() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    async function getDataRequestFamily() {
      try {
        const { data } = await FamilyDonationService.getDonation(id);

        formRef.current.setFieldsValues(data);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados da doação!',
          duration: 5000,
        });
      }
    }

    getDataRequestFamily();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await FamilyDonationService.updateDonation(id, formData);
      toast({
        type: 'success',
        text: 'Doação editada com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar a doação!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Editar doação" to="/adm/familias/doacoes" />
      <Loader isLoading={isLoading} />

      <FamilyDonationForm
        ref={formRef}
        onSubmit={handleSubmit}
      />

    </Container>
  );
}
