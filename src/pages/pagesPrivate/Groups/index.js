import { useEffect, useMemo, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Container, Content, Search, TableContent,
} from './styles';

import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination';
import GroupService from '../../../services/GroupService';
import EmptyList from '../components/EmptyList';
import ErrorContainer from '../components/ErrorContainer';
import HeaderContent from '../components/HeaderContent';
import HeaderPage from '../components/HeaderPage';
import InputSearch from '../components/InputSearch';
import gruposPDF from '../components/Reports/GruposRelatorio';
import SearchNotFound from '../components/SearchNotFound';
import Table from '../components/Table';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [groupBeingDeleted, setGroupBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const loadGroups = async () => {
    try {
      setIsLoading(true);
      const { data } = await GroupService.listGroups();
      setHasError(false);
      setGroups(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const filteredGroups = useMemo(() => groups.filter((group) => (
    group.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )), [groups, searchTerm]);

  const itensPerPage = 15;
  const pages = Math.ceil(filteredGroups.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentGroups = filteredGroups.slice(startItens, endIndex);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadGroups();
  };

  const handleDeleteGroup = (group) => {
    setGroupBeingDeleted(group);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setGroupBeingDeleted(null);
  };

  const handleConfirmDeleteGroup = async () => {
    try {
      setIsLoadingDeleted(true);
      await GroupService.deleteGroup(groupBeingDeleted?.id);

      setGroups((prevState) => prevState.filter(
        (group) => group.id !== groupBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'Grupo deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o grupo!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  return (
    <Container>
      <HeaderPage title="Grupos" />

      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o grupo ”${groupBeingDeleted?.nome}”`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteGroup}
        loading={isLoadingDeleted}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {groups.length > 0 && (
      <Search>
        <InputSearch
          value={searchTerm}
          change={handleChangeSearchTerm}
          place="Pesquisar grupo pelo nome..."
        />
      </Search>
      )}

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredGroups}
          array={groups}
          textSing=" grupo"
          textPlu=" grupos"
          textButtom="Novo grupo"
          to="/adm/grupos/new"
          print={() => gruposPDF(groups)}
        />

        {hasError && (
        <ErrorContainer
          msgErro=" Ocorreu um erro ao obter a lista de grupos"
          click={handleTryAgain}
        />

        )}

        {!hasError && (
        <>
          {(groups.length < 1 && !isLoading) && (
            <EmptyList term="Nenhum grupo foi cadastrado" />
          )}

          {(groups.length > 0 && filteredGroups.length < 1) && (
            <SearchNotFound term={searchTerm} />
          )}

          {filteredGroups.length > 0 && (
          <TableContent>
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentGroups.map((group) => (
                  <tr key={group.id}>
                    <td data-title="Nome">{group.nome}</td>
                    <td data-title="Ações">
                      <Link to={`/adm/grupos/edit/${group.id}`}>
                        <FaEdit className="edit" />
                      </Link>

                      <FaTrash
                        className="remove"
                        onClick={() => handleDeleteGroup(group)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContent>
          )}
        </>
        )}

      </Content>
    </Container>
  );
}
