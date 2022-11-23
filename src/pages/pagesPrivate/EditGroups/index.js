import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FaTrash } from 'react-icons/fa';

import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import ContributorGroupService from '../../../services/ContributorGroupService';
import GroupService from '../../../services/GroupService';
import GroupForm from '../components/GroupForm';
import HeaderForm from '../components/HeaderForm';
import ModalContibutors from '../components/ModalContibutors';
import Table from '../components/Table';

import toast from '../../../utils/toast';
import {
  Container, ContainerContributors, HeaderContributors, TableContent,
} from './styles';
import Modal from '../../../components/Modal';

export default function EditGroups() {
  const [modalContributorsVisible, setModalContributorsVisible] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [group, setGroup] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contributorGroupBeingDeleted, setContributorGroupBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getGroup = useCallback(async () => {
    try {
      const { data } = await GroupService.getGroup(id);

      setGroup({
        id: data[0].id,
        nome: data[0].nome,
        descricao: data[0].descricao,
        foto: data[0].foto,
      });
      setColaboradores(data[0].colaboradores);
      setIsLoading(false);
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao buscar dados do grupo!',
        duration: 5000,
      });
      navigate('/adm/grupos');
    }
  }, [id, navigate]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  const toggleShowModal = () => {
    setModalContributorsVisible((prevState) => !prevState);
  };

  const toggleShowModalLoad = () => {
    getGroup();
    setModalContributorsVisible(false);
  };

  const handleDeleteContributorGroup = (colab) => {
    setContributorGroupBeingDeleted(colab);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setContributorGroupBeingDeleted(null);
  };

  const handleConfirmDeleteContributor = async () => {
    try {
      setIsLoadingDeleted(true);
      await ContributorGroupService.deleteContributorGroup(
        contributorGroupBeingDeleted?.pivot_idEntrada,
      );

      setColaboradores((prevState) => prevState.filter(
        (contributor) => contributor.id !== contributorGroupBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'Colaborador removido do grupo com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover o colaborador do grupo!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await GroupService.updateGroup(id, formData);
      toast({
        type: 'success',
        text: 'Grupo editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o grupo!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Edição de grupo" to="/adm/grupos" />

      <GroupForm
        id={id || null}
        key={group.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        group={group}
      />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o colaborador ”${contributorGroupBeingDeleted?.nome}” desse grupo`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContributor}
        loading={isLoadingDeleted}
      >
        <p>Caso desejar, você poderá adiciona-lo novamente!</p>
      </Modal>

      <ModalContibutors
        onCancel={toggleShowModal}
        visible={modalContributorsVisible}
        onConfirm={toggleShowModalLoad}
        setColaboradores={setColaboradores}
        contributorsGroup={colaboradores}
        id={id}
      />

      <ContainerContributors>
        <Loader isLoading={isLoading} />
        <HeaderContributors>
          <h1>Colaboradores do grupo</h1>

          <Button type="button" onClick={toggleShowModal}>Adicionar no Grupo</Button>

        </HeaderContributors>

        {colaboradores.length > 0 && (
        <TableContent>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {colaboradores?.map((colab) => (
                <tr key={colab.id}>
                  <td data-title="Nome">{colab.nome}</td>
                  <td data-title="Sobrenome">{colab.sobrenome}</td>
                  <td data-title="Remover">
                    <FaTrash
                      className="remove"
                      onClick={() => handleDeleteContributorGroup(colab)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContent>
        )}
      </ContainerContributors>
    </Container>
  );
}
