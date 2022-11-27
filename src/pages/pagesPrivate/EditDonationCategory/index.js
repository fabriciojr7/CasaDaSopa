import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import CategoryDonationService from '../../../services/CategoryDonationService';
import toast from '../../../utils/toast';
import DonationCategoryForm from '../components/DonationCategoryForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditDonationCategory() {
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await CategoryDonationService.getCategory(id);

        setCategory(data);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados da categoria!',
          duration: 5000,
        });
        navigate('/adm/categoriasdoacao');
      }
    };

    getCategory();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await CategoryDonationService.updateCategory(id, formData);
      toast({
        type: 'success',
        text: 'Categoria editada com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar a categoria!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Edição de categoria" to="/adm/categoriasdoacao" />
      <Loader isLoading={isLoading} />

      <DonationCategoryForm
        key={category.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        category={category}
      />
    </Container>
  );
}
