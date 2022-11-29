import {
  useEffect,
  useMemo, useState,
} from 'react';
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
import SearchNotFound from '../components/SearchNotFound';
import Table from '../components/Table';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';

import AlbumService from '../../../services/AlbumService';

export default function Albums() {
  const [albuns, setAlbuns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [groupBeingDeleted, setGroupBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const loadAlbuns = async () => {
    try {
      setIsLoading(true);
      const { data } = await AlbumService.listAlbunsAll();
      setHasError(false);
      setAlbuns(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAlbuns();
  }, []);

  const filteredAlbuns = useMemo(() => albuns.filter((album) => (
    album?.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )), [albuns, searchTerm]);

  const itensPerPage = 15;
  const pages = Math.ceil(filteredAlbuns.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentAlbuns = filteredAlbuns.slice(startItens, endIndex);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadAlbuns();
  };

  const handleDeleteAlbum = (group) => {
    setGroupBeingDeleted(group);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setGroupBeingDeleted(null);
  };

  const handleConfirmDeleteAlbum = async () => {
    try {
      setIsLoadingDeleted(true);
      await GroupService.deleteGroup(groupBeingDeleted?.id);

      setAlbuns((prevState) => prevState.filter(
        (album) => album.id !== groupBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'Álbum deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o álbum!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  return (
    <Container>
      <HeaderPage title="Álbuns" />

      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o grupo ”${groupBeingDeleted?.nome}”`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteAlbum}
        loading={isLoadingDeleted}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {albuns.length > 0 && (
      <Search>
        <InputSearch
          value={searchTerm}
          change={handleChangeSearchTerm}
          place="Pesquisar álbum pela descrição..."
        />
      </Search>
      )}

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredAlbuns}
          array={albuns}
          textSing=" álbum"
          textPlu=" álbuns"
          textButtom="Novo álbum"
          to="/adm/albuns/new"
        />

        {hasError && (
        <ErrorContainer
          msgErro=" Ocorreu um erro ao obter a lista de álbuns"
          click={handleTryAgain}
        />

        )}

        {!hasError && (
        <>
          {(albuns.length < 1 && !isLoading) && (
            <EmptyList term="Nenhum álbum foi cadastrado" />
          )}

          {(albuns.length > 0 && filteredAlbuns.length < 1) && (
            <SearchNotFound term={searchTerm} />
          )}

          {filteredAlbuns.length > 0 && (
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
                {currentAlbuns.map((dataAlbum) => (
                  <tr key={dataAlbum.id}>
                    <td data-title="Nome">{dataAlbum.descricao}</td>
                    <td data-title="Ações">
                      <Link to={`/adm/albuns/edit/${dataAlbum.id}`}>
                        <FaEdit className="edit" />
                      </Link>

                      <FaTrash
                        className="remove"
                        onClick={() => handleDeleteAlbum(dataAlbum)}
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
