import { useEffect, useMemo, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdVolunteerActivism } from 'react-icons/md';

import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Content, Search, TableContent,
} from './styles';

import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination';
import FamilyService from '../../../services/FamilyService';
import EmptyList from '../components/EmptyList';
import ErrorContainer from '../components/ErrorContainer';
import HeaderContent from '../components/HeaderContent';
import HeaderPage from '../components/HeaderPage';
import InputSearch from '../components/InputSearch';
import FamiliasPDF from '../components/Reports/FamiliasRelatorio ';
import SearchNotFound from '../components/SearchNotFound';
import Table from '../components/Table';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';

export default function Families() {
  const [families, setFamilies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [familyBeingDeleted, setFamilyBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const navigate = useNavigate();

  const loadFamilies = async () => {
    try {
      setIsLoading(true);
      const { data } = await FamilyService.listFamilies();
      setHasError(false);
      setFamilies(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem('responsavel');
    loadFamilies();
  }, []);

  const filteredFamilies = useMemo(() => families.filter((family) => (
    family.nome_completo.toLowerCase().includes(searchTerm.toLowerCase())
  )), [families, searchTerm]);

  const itensPerPage = 15;
  const pages = Math.ceil(filteredFamilies.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentFamilies = filteredFamilies.slice(startItens, endIndex);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadFamilies();
  };

  const handleDeleteFamily = (contributor) => {
    setFamilyBeingDeleted(contributor);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setFamilyBeingDeleted(null);
  };

  const handleConfirmDeleteFamily = async () => {
    try {
      setIsLoadingDeleted(true);
      await FamilyService.deleteFamily(familyBeingDeleted?.id);

      setFamilies((prevState) => prevState.filter(
        (family) => family.id !== familyBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'família deletada com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar a família!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  const handleSolicitacoes = (resp) => {
    localStorage.setItem('responsavel', JSON.stringify(resp));
    navigate('/adm/familias/doacoes');
  };

  return (
    <Container>
      <HeaderPage title="Família" />

      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o responsável ”${familyBeingDeleted?.nome}” e sua família?`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteFamily}
        loading={isLoadingDeleted}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {families.length > 0 && (
      <Search>
        <InputSearch
          value={searchTerm}
          change={handleChangeSearchTerm}
          place="Pesquisar familia pelo nome responsável..."
        />
      </Search>
      )}

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredFamilies}
          array={families}
          textSing=" família"
          textPlu=" famílias"
          textButtom="Nova família"
          to="/adm/familia/new"
          print={() => FamiliasPDF(families)}
        />

        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista de famílias"
          click={handleTryAgain}
        />
        )}

        {!hasError && (
        <>
          {(families.length < 1 && !isLoading) && (
          <EmptyList term="Nenhuma família cadastrada" />
          )}

          {(families.length > 0 && filteredFamilies.length < 1) && (
          <SearchNotFound term={searchTerm} />
          )}

          {filteredFamilies.length > 0 && (
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
                  <th>CPF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                currentFamilies.map((family) => (
                  <tr key={family.id}>
                    <td data-title="Nome">{family.nome_completo}</td>
                    <td data-title="CPF">{family.cpf}</td>
                    <td data-title="Ações">
                      <Link to={`/adm/familia/edit/${family.id}`}>
                        <abbr title="Editar">
                          <FaEdit className="edit" />
                        </abbr>
                      </Link>

                      <abbr title="Remover">
                        <FaTrash
                          className="remove"
                          onClick={() => handleDeleteFamily(family)}
                        />
                      </abbr>

                      <abbr title="Doações">
                        <MdVolunteerActivism
                          className="solicitacao"
                          onClick={() => handleSolicitacoes({
                            id: family.id, nome: family.nome_completo,
                          })}
                        />
                      </abbr>
                    </td>
                  </tr>
                ))
               }
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
