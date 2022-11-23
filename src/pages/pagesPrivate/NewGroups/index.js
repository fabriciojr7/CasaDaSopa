import { useNavigate } from 'react-router-dom';
import GroupService from '../../../services/GroupService';
import toast from '../../../utils/toast';
import GroupForm from '../components/GroupForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewGroups() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const { data } = await GroupService.createGroup(formData);
      toast({
        type: 'success',
        text: 'Grupo cadastrado com sucesso!',
        duration: 3000,
      });
      navigate(`/adm/grupos/edit/${data.id}`);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o grupo!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/grupos" />

      <GroupForm
        buttonLabel="Cadastrar grupo"
        onSubmit={handleSubmit}
      />

    </Container>
  );
}
