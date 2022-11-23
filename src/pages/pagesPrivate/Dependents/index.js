import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Content, TableContent, HeaderDependent,
} from './styles';

import Table from '../components/Table';
import DependentService from '../../../services/DependentService';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';

export default function Dependents({ dependents, idResp }) {
  const [dependentes, setDependentes] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [dependentBeingDeleted, setDependentBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setDependentes(dependents);
  }, [dependents]);

  const handleNovoDependente = () => {
    localStorage.setItem('idFamily', idResp);
    navigate('/adm/dependentes/new');
  };

  const handleEditDependente = (id) => {
    localStorage.setItem('idFamily', idResp);
    navigate(`/adm/dependentes/edit/${id}`);
  };

  const handleDeleteDependent = (group) => {
    setDependentBeingDeleted(group);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setDependentBeingDeleted(null);
  };

  const handleConfirmDeleteDependent = async () => {
    try {
      setIsLoadingDeleted(true);
      await DependentService.deleteDependent(dependentBeingDeleted?.id);

      setDependentes((prevState) => prevState.filter(
        (dependent) => dependent.id !== dependentBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'Dependente deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o dependente!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  return (
    <Container>
      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o depentende ”${dependentBeingDeleted?.nome}”`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteDependent}
        loading={isLoadingDeleted}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      <Content>
        <HeaderDependent>
          <Button
            onClick={handleNovoDependente}
          >
            Adicionar Dependente
          </Button>
        </HeaderDependent>

        {dependentes?.length > 0 && (
        <TableContent>
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
                dependentes?.map((dependent) => (
                  <tr key={dependent.id}>
                    <td data-title="Nome">{dependent.nome_completo}</td>
                    <td data-title="CPF">{dependent.cpf}</td>
                    <td data-title="Ações">
                      <FaEdit
                        className="edit"
                        onClick={() => handleEditDependente(dependent.id)}
                      />
                      <FaTrash
                        className="remove"
                        onClick={() => handleDeleteDependent(dependent)}
                      />
                    </td>
                  </tr>
                ))
            }
            </tbody>
          </Table>
        </TableContent>
        )}
      </Content>
    </Container>
  );
}
