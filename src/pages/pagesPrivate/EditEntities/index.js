import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import EntityService from '../../../services/EntityService';
import toast from '../../../utils/toast';
import EntitiesForm from '../components/EntitiesForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditContributors() {
  const [entity, setEntity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEntity = async () => {
      try {
        const { data } = await EntityService.getEntity(id);
        setEntity(data);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados da endidade!',
          duration: 5000,
        });
        navigate('/adm/entidades');
      }
    };

    getEntity();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await EntityService.updateEntity(id, formData);
      toast({
        type: 'success',
        text: 'Entidade editada com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar a entidade!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Edição de Entidade" to="/adm/entidades" />
      <Loader isLoading={isLoading} />

      <EntitiesForm
        key={entity.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        entity={entity}
      />
    </Container>
  );
}
