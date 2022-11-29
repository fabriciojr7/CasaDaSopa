import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { Container, Content, Search } from './styles';
import HeaderPage from '../components/HeaderPage';
import Table from '../components/Table';
import HeaderContent from '../components/HeaderContent';
import Pagination from '../../../components/Pagination';
import InputSearch from '../components/InputSearch';
import CategoryDonationService from '../../../services/CategoryDonationService';
import Loader from '../../../components/Loader';
import ErrorContainer from '../components/ErrorContainer';
import EmptyList from '../components/EmptyList';
import SearchNotFound from '../components/SearchNotFound';
import toast from '../../../utils/toast';
import Modal from '../../../components/Modal';

export default function DonationCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryBeingDeleted, setCategoryBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await CategoryDonationService.listCategories();

      setHasError(false);
      setCategories(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => categories.filter((category) => (
    category.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )), [categories, searchTerm]);

  const itensPerPage = 15;
  const pages = Math.ceil(filteredCategories.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentCategories = filteredCategories.slice(startItens, endIndex);

  const handleTryAgain = () => {
    loadCategories();
  };

  const handleDeleteCategory = (category) => {
    setCategoryBeingDeleted(category);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setCategoryBeingDeleted(null);
  };

  const handleConfirmDeleteCategory = async () => {
    try {
      setIsLoadingDeleted(true);
      await CategoryDonationService.deleteCategory(categoryBeingDeleted?.id);

      setCategories((prevState) => prevState.filter(
        (contributor) => contributor.id !== categoryBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'Categoria deletada com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar a categoria!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  return (
    <Container>
      <HeaderPage title="Categorias de doação" />
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover a categoria ”${categoryBeingDeleted?.descricao}”`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteCategory}
        loading={isLoadingDeleted}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {categories.length > 0 && (
        <Search>
          <InputSearch
            value={searchTerm}
            change={(e) => setSearchTerm(e.target.value)}
            place="Pesquisar categoria pelo nome..."
          />
        </Search>
      )}

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredCategories}
          array={categories}
          textSing=" categoria"
          textPlu=" categorias"
          textButtom="Novo grupo"
          to="/adm/categoriasdoacao/new"
        />

        {hasError && (
        <ErrorContainer
          msgErro=" Ocorreu um erro ao obter a lista de categorias"
          click={handleTryAgain}
        />
        )}

        {!hasError && (
        <>
          {(categories.length < 1 && !isLoading) && (
            <EmptyList term="Nenhuma categoria foi cadastrada" />
          )}

          {(categories.length > 0 && filteredCategories.length < 1) && (
            <SearchNotFound term={searchTerm} />
          )}

          {filteredCategories.length > 0 && (
          <div>
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((category) => (
                  <tr key={category.id}>
                    <td data-title="Nome">{category.descricao}</td>
                    <td data-title="E-mail">{category.email}</td>
                    <td data-title="Ações">
                      <Link to={`/adm/categoriasdoacao/edit/${category.id}`}>
                        <FaEdit className="edit" />
                      </Link>

                      <FaTrash
                        className="remove"
                        onClick={() => handleDeleteCategory(category)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          )}
        </>
        )}

      </Content>
    </Container>
  );
}
