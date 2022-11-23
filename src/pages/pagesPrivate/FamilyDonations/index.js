import {
  useEffect, useState, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Content,
  TableContent, TabContainer, TabProdHead, Tab,
  TabProdBody, TabContent,
} from './styles';

import FamilyDonationService from '../../../services/FamilyDonationService';
import Loader from '../../../components/Loader';
import HeaderContent from '../components/HeaderContent';
import ErrorContainer from '../components/ErrorContainer';
import Table from '../components/Table';
import HeaderForm from '../components/HeaderForm';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';

export default function FamilyDonations() {
  const [responsavel] = useState(JSON.parse(localStorage.getItem('responsavel')));
  const [familiesRequests, setFamiliesRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [toggle, setToggle] = useState(1);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [familyRequestBeingDeleted, setFamilyRequestBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const navigate = useNavigate();

  const loadFamiliesRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await FamilyDonationService.listFamilyDonation(responsavel.id);
      setHasError(false);
      setFamiliesRequest(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [responsavel.id]);

  useEffect(() => {
    loadFamiliesRequests();
  }, [loadFamiliesRequests]);

  const handleTryAgain = () => {
    loadFamiliesRequests();
  };

  const toggleTab = (index) => {
    setToggle(index);
  };

  const handleEdit = (id) => {
    navigate(`/adm/familias/doacoes/edit/${id}`);
  };

  const requestsOpened = () => familiesRequests.filter((request) => (
    request.status === 'Solicitação Aberta'
  ));

  const requestsProgress = () => familiesRequests.filter((request) => (
    request.status === 'Solicitação em Progresso'
  ));

  const requestsCompleted = () => familiesRequests.filter((request) => (
    request.status === 'Solicitação Concluida'
  ));

  const handleDeleteFamilyRequest = (request) => {
    setFamilyRequestBeingDeleted(request);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setFamilyRequestBeingDeleted(null);
  };

  const handleConfirmDeleteFamilyRequest = async () => {
    try {
      setIsLoadingDeleted(true);
      await FamilyDonationService.deleteDonation(familyRequestBeingDeleted?.id);

      setFamiliesRequest((prevState) => prevState.filter(
        (request) => request.id !== familyRequestBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast({
        type: 'success',
        text: 'Dependente deletada com doação!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar a doação!',
      });
    } finally {
      setIsLoadingDeleted(false);
    }
  };

  return (
    <Container>
      <HeaderForm title="Doações da família" to="/adm/familias" />

      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover a doação ”${familyRequestBeingDeleted?.titulo}”`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteFamilyRequest}
        loading={isLoadingDeleted}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={familiesRequests}
          array={familiesRequests}
          textSing=" doação"
          textPlu=" doações"
          textButtom="Nova doação"
          to="/adm/familias/doacoes/new"
        />

        {hasError && (
          <ErrorContainer
            msgErro="Ocorreu um erro ao obter a lista doação da família"
            click={handleTryAgain}
          />
        )}

        <TabContainer>
          <TabProdHead>
            <Tab
              onClick={() => toggleTab(1)}
              className={toggle === 1 ? 'left active' : 'left'}
            >
              <h4>Abertas</h4>
            </Tab>
            <Tab
              onClick={() => toggleTab(2)}
              className={toggle === 2 ? 'right active' : 'right'}
            >
              <h4>Em progresso</h4>
            </Tab>

            <Tab
              onClick={() => toggleTab(3)}
              className={toggle === 3 ? 'right active' : 'right'}
            >
              <h4>Concluídas</h4>
            </Tab>

          </TabProdHead>
          <TabProdBody>
            <TabContent className={toggle === 1 ? 'active' : ''}>
              <TableContent>
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        requestsOpened().map((familyRequest) => (
                          <tr
                            key={familyRequest.id}
                          >
                            <td data-title="Título">{familyRequest.titulo}</td>
                            <td data-title="Status">
                              {familyRequest.status}
                            </td>
                            <td data-title="Ações">

                              <abbr title="Editar">
                                <FaEdit
                                  onClick={() => handleEdit(familyRequest.id)}
                                  className="edit"
                                />
                              </abbr>

                              <abbr title="Remover">
                                <FaTrash
                                  className="remove"
                                  onClick={() => handleDeleteFamilyRequest(familyRequest)}
                                />
                              </abbr>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </Table>
              </TableContent>
            </TabContent>

            <TabContent className={toggle === 2 ? 'active' : ''}>
              <TableContent>
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        requestsProgress().map((familyRequest) => (
                          <tr key={familyRequest.id}>
                            <td data-title="Título">{familyRequest.titulo}</td>
                            <td data-title="Status">{familyRequest.status}</td>
                            <td data-title="Ações">

                              <abbr title="Editar">
                                <FaEdit
                                  onClick={() => handleEdit(familyRequest.id)}
                                  className="edit"
                                />
                              </abbr>

                              <abbr title="Remover">
                                <FaTrash
                                  className="remove"
                                  onClick={() => handleDeleteFamilyRequest(familyRequest)}
                                />
                              </abbr>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </Table>
              </TableContent>
            </TabContent>

            <TabContent className={toggle === 3 ? 'active' : ''}>
              <TableContent>
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        requestsCompleted().map((familyRequest) => (
                          <tr key={familyRequest.id}>
                            <td data-title="Título">{familyRequest.titulo}</td>
                            <td data-title="Status">{familyRequest.status}</td>
                            <td data-title="Ações">

                              <abbr title="Editar">
                                <FaEdit
                                  onClick={() => handleEdit(familyRequest.id)}
                                  className="edit"
                                />
                              </abbr>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </Table>
              </TableContent>
            </TabContent>

          </TabProdBody>
        </TabContainer>

      </Content>
    </Container>
  );
}
