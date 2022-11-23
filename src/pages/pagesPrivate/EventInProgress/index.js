/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../../../components/Button';
import HeaderPage from '../components/HeaderPage';
import {
  Container, Content, CurrentEvent, NoEvent, Search,
} from './styles';

import emptyBox from '../../../assets/images/empty-box.svg';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import EventService from '../../../services/EventService';
import dateFormated from '../../../utils/dateFormated';
import toast from '../../../utils/toast';
import Table from '../components/Table';
import InputSearch from '../components/InputSearch';

export default function EventInProgress() {
  const [event, setEvent] = useState({});
  const [responsible, setResponsible] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOpening, setIsLoadingOpening] = useState(false);
  const [isLoadingClosed, setIsLoadingClosed] = useState(false);
  const [isLoadingPresence, setIsLoadingPresence] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEncerrarVisible, setIsModalEncerrarVisible] = useState(false);
  const [isModalConfirmPresenceVisible, setIsModalConfirmPresenceVisible] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const loadEventOpen = async () => {
    try {
      const { data } = await EventService.getOpenEvent();
      setEvent(data[0]);
      setIsLoading(false);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao buscar o evento!',
        duration: 5000,
      });
    }
  };

  const filteredResponsaveis = useMemo(() => event?.responsaveis?.filter((responsavel) => (
    responsavel.nome_completo.toLowerCase().includes(searchTerm.toLowerCase())
  )), [event?.responsaveis, searchTerm]);

  useEffect(() => {
    loadEventOpen();
  }, []);

  const handleToggleModalVisible = () => {
    setIsModalVisible((prevState) => !prevState);
    setDescricao('');
    setHorario('');
  };

  const handleToggleModalEncerrarVisible = () => {
    setIsModalEncerrarVisible((prevState) => !prevState);
  };

  const handleToggleModalConfirmPresenceVisible = () => {
    setIsModalConfirmPresenceVisible((prevState) => !prevState);
    setResponsible(null);
  };

  const handleModalConfirmPresence = (responsavel) => {
    setResponsible(responsavel);
    setIsModalConfirmPresenceVisible(true);
  };

  const handleConfirmCreateEvent = async () => {
    try {
      setIsLoadingOpening(true);
      await EventService.createEvent({
        descricao,
        horario,
      });
      loadEventOpen();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar o evento!',
        duration: 5000,
      });
    } finally {
      setIsLoadingOpening(false);
      handleToggleModalVisible();
    }
  };

  const handleConfirmClosingEvent = async () => {
    try {
      setIsLoadingClosed(true);
      await EventService.updateEvent(event?.id, {
        descricao: event?.descricao,
        horario: event?.horario,
        responsaveis: event?.responsaveis,
        finalizado: true,
      });
      loadEventOpen();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao encerrar o evento!',
        duration: 5000,
      });
    } finally {
      setIsLoadingClosed(false);
      handleToggleModalEncerrarVisible();
    }
  };

  const handleConfirmPresenceEvent = async () => {
    try {
      setIsLoadingPresence(true);
      await EventService.presenceEvent(responsible.presencaId, { presente: true });
      loadEventOpen();
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao confirmar a presença!',
        duration: 5000,
      });
    } finally {
      setIsLoadingPresence(false);
      handleToggleModalConfirmPresenceVisible();
    }
  };

  return (
    <Container>
      <HeaderPage title="Evento" />

      <Loader isLoading={isLoading} />

      <Modal
        visible={isModalVisible}
        title="Criar um novo evento"
        cancelLabel="Cancelar"
        confirmLabel="Confirmar"
        onCancel={handleToggleModalVisible}
        onConfirm={handleConfirmCreateEvent}
        loading={isLoadingOpening}
      >
        <p>Informe uma descrição para o evento</p><br />
        <FormGrouping>
          <Input
        //   error={getErrorsMEssageByFieldName('nome')}
            value={descricao}
            change={(e) => setDescricao(e.target.value)}
            max={40}
          />
        </FormGrouping>

        <br /><p>Informe o horário do evento (ex: 12 horas)</p><br />

        <FormGrouping>
          <Input
        //   error={getErrorsMEssageByFieldName('nome')}
            value={horario}
            change={(e) => setHorario(e.target.value)}
            max={20}
          />
        </FormGrouping>
      </Modal>

      <Modal
        danger
        visible={isModalEncerrarVisible}
        title={`Deseja realmente encerrrar o evento ”${event?.descricao}”?`}
        cancelLabel="Cancelar"
        confirmLabel="Encerrar"
        onCancel={handleToggleModalEncerrarVisible}
        onConfirm={handleConfirmClosingEvent}
        loading={isLoadingClosed}
      >
        <p>Após encerrado, o evento não poderá ser reaberto</p>
      </Modal>

      <Modal
        visible={isModalConfirmPresenceVisible}
        title={`Confirmar presença de ”${responsible?.nome_completo}”?`}
        cancelLabel="Cancelar"
        confirmLabel="Confirmar"
        onCancel={handleToggleModalConfirmPresenceVisible}
        onConfirm={handleConfirmPresenceEvent}
        loading={isLoadingPresence}
      >
        <p>Após confirmada a presença, não poderá ser retirada!</p>
      </Modal>

      <Content>
        {!isLoading && (
        <div>
          {event ? (
            <CurrentEvent>
              <div className="header-event">
                <h2>{event?.descricao} - {dateFormated(event?.created_at)}</h2>

                <Button
                  onClick={handleToggleModalEncerrarVisible}
                >
                  Encerrar evento
                </Button>
              </div>

              <Search>
                <InputSearch
                  value={searchTerm}
                  change={(e) => setSearchTerm(e.target.value)}
                  place="Pesquisar responsável pelo nome..."
                />
              </Search>

              <Table>
                <thead>
                  <tr>
                    <th>Responsável</th>
                    <th>Telefone</th>
                    <th>Presença</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResponsaveis.map((responsavel) => (
                    <tr key={responsavel.id}>
                      <td data-title="Responsável">{responsavel.nome_completo}</td>
                      <td data-title="Telefone">{responsavel.telefone}</td>
                      <td data-title="Presença">
                        {responsavel.presente ? <FaCheckCircle /> : (
                          <button
                            type="button"
                            onClick={() => handleModalConfirmPresence(responsavel)}
                          >
                            Confirmar
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}

                </tbody>
              </Table>
            </CurrentEvent>
          ) : (
            <NoEvent>
              <Button
                onClick={handleToggleModalVisible}
              >
                Criar evento
              </Button>

              <img src={emptyBox} alt="Empty box" />
              <p>
                Nenhum evento ativo encontrado <br />
                Clique em <strong>”Criar evento”</strong> para ativar um!
              </p>
            </NoEvent>
          )}
        </div>
        )}

      </Content>
    </Container>
  );
}
