import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DependentService from '../../../services/DependentService';
import toast from '../../../utils/toast';
import DependentsForm from '../components/DependentsForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditDependent() {
  const { id } = useParams();
  const [idFamily] = useState(localStorage.getItem('idFamily'));
  const [dependent, setDependent] = useState({});

  useEffect(() => {
    const getDependent = async () => {
      try {
        // setIsLoading(true);
        const { data } = await DependentService.getDependent(id);
        setDependent(data);
      } catch (err) {
        // errorAlert({ msg: 'Erro ao buscar dados do dependente' });
      }
    };

    getDependent();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await DependentService.updateDependent(id, formData);
      toast({
        type: 'success',
        text: 'Dependente editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o dependente!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Edição de dependente" to={`/adm/familia/edit/${idFamily}`} />
      <DependentsForm
        id={id || null}
        key={dependent.id}
        buttonLabel="Salvar alterações"
        idFamily={idFamily}
        onSubmit={handleSubmit}
        dependent={dependent}
      />
    </Container>
  );
}
