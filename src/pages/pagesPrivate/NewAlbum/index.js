import { useNavigate } from 'react-router-dom';
import AlbumService from '../../../services/AlbumService';
import toast from '../../../utils/toast';
import AlbumForm from '../components/AlbumForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewAlbum() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const { data } = await AlbumService.createAlbum(formData);
      toast({
        type: 'success',
        text: 'Álbum cadastrado com sucesso!',
        duration: 3000,
      });
      navigate(`/adm/albuns/edit/${data.id}`);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o álbum!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/albuns" />

      <AlbumForm
        buttonLabel="Cadastrar Álbum"
        onSubmit={handleSubmit}
      />

    </Container>
  );
}
