import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContributorService from '../../../services/ContributorService';
import ContributorsForm from '../components/ContributorsForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';
import toast from '../../../utils/toast';
import Loader from '../../../components/Loader';

export default function EditContributors() {
  const [contributor, setContributor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getContributor = async () => {
      try {
        const { data } = await ContributorService.getContributor(id);

        setContributor(data);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados do colaborador!',
          duration: 5000,
        });
        navigate('/adm/colaboradores');
      }
    };

    getContributor();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await ContributorService.updateContributor(id, formData);
      toast({
        type: 'success',
        text: 'Colaborador editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o colaborador!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Edição de colaboradores" to="/adm/colaboradores" />

      <Loader isLoading={isLoading} />

      <ContributorsForm
        key={contributor.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        contributor={contributor}
      />
    </Container>
  );
}
