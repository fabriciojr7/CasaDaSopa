import { useEffect, useMemo, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
  Container, Content, Search,
} from './styles';

import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination';
import ContributorService from '../../../services/ContributorService';
import EmptyList from '../components/EmptyList';
import ErrorContainer from '../components/ErrorContainer';
import HeaderContent from '../components/HeaderContent';
import HeaderPage from '../components/HeaderPage';
import InputSearch from '../components/InputSearch';
import ColaboradoresPDF from '../components/Reports/ColaboradoresRelatorio';
import SearchNotFound from '../components/SearchNotFound';
import Table from '../components/Table';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';

export default function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contributorBeingDeleted, setContributorBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const loadContributors = async () => {
    try {
      setIsLoading(true);
      const { data } = await ContributorService.listContributors();
      setHasError(false);
      setContributors(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContributors();
  }, []);

  const filteredContributors = useMemo(() => contributors.filter((contributor) => (
    contributor.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contributors, searchTerm]);

  const itensPerPage = 15;
  const pages = Math.ceil(filteredContributors.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentContributors = filteredContributors.slice(startItens, endIndex);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadContributors();
  };

  const handleDeleteContributor = (contributor) => {
    setContributorBeingDeleted(contributor);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setContributorBeingDeleted(null);
  };

  const handleConfirmDeleteContributor = async () => {
    try {
      setIsLoadingDeleted(true);
      await ContributorService.deleteContributor(contributorBeingDeleted?.id);

      setContributors((prevState) => prevState.filter(
        (contributor) => contributor.id !== contributorBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'Colaborador deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o colaborador!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  return (
    <Container>
      <HeaderPage title="Colaboradores" />
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o colaborador ”${contributorBeingDeleted?.nome}”`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContributor}
        loading={isLoadingDeleted}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {contributors.length > 0 && (
        <Search>
          <InputSearch
            value={searchTerm}
            change={handleChangeSearchTerm}
            place="Pesquisar colaborador pelo nome..."
          />
        </Search>
      )}

      <Content>

        <HeaderContent
          hasError={hasError}
          filteredArray={filteredContributors}
          array={contributors}
          textSing=" colaborador"
          textPlu=" colaboradores"
          textButtom="Novo Colaborador"
          to="/adm/colaboradores/new"
          print={() => ColaboradoresPDF(contributors)}
        />

        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista de colaboradores"
          click={handleTryAgain}
        />
        )}

        {!hasError && (
        <>
          {(contributors.length < 1 && !isLoading) && (
          <EmptyList term="Nenhum colaborador foi cadastrado" />
          )}

          {(contributors.length > 0 && filteredContributors.length < 1) && (
            <SearchNotFound term={searchTerm} />
          )}

          {filteredContributors.length > 0 && (
          <>
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Sobrenome</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                currentContributors.map((contributor) => (
                  <tr key={contributor.id}>
                    <td data-title="Nome">{contributor.nome}</td>
                    <td data-title="Sobrenome">{contributor.sobrenome}</td>
                    <td data-title="Telefone">{contributor.telefone}</td>
                    <td data-title="Ações">
                      <Link to={`/adm/colaboradores/edit/${contributor.id}`}>
                        <FaEdit className="edit" />
                      </Link>

                      <FaTrash
                        className="remove"
                        onClick={() => handleDeleteContributor(contributor)}
                      />
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </Table>
          </>
          )}
        </>

        )}

      </Content>

    </Container>
  );
}
