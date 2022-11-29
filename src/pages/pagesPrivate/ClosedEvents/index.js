import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination';
import EventService from '../../../services/EventService';
import dateFormated from '../../../utils/dateFormated';
import EmptyList from '../components/EmptyList';
import ErrorContainer from '../components/ErrorContainer';
import HeaderContent from '../components/HeaderContent';
import HeaderPage from '../components/HeaderPage';
import InputSearch from '../components/InputSearch';
import SearchNotFound from '../components/SearchNotFound';
import Table from '../components/Table';

import { Container, Content, Search } from './styles';

export default function ClosedEvents() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const filteredEvents = useMemo(() => events.filter((event) => (
    event.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )), [events, searchTerm]);

  const itensPerPage = 15;
  const pages = Math.ceil(events.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentEvents = filteredEvents.slice(startItens, endIndex);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const { data } = await EventService.listClosedEvents();
      setHasError(false);
      setEvents(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleTryAgain = () => {
    loadEvents();
  };

  const handleViewEvent = (id) => {
    navigate(`/adm/eventosencerrados/view/${id}`);
  };

  return (
    <Container>
      <HeaderPage title="Eventos encerrados" />
      <Loader isLoading={isloading} />

      {events.length > 0 && (
      <Search>
        <InputSearch
          value={searchTerm}
          change={(e) => setSearchTerm(e.target.value)}
          place="Pesquisar evento pela descrição..."
        />
      </Search>
      )}

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredEvents}
          array={events}
          textSing=" evento"
          textPlu=" eventos"
          dontAdd
        />
        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a eventos"
          click={handleTryAgain}
        />
        )}

        {!hasError && (
        <>
          {(events.length < 1 && !isloading) && (
          <EmptyList term="Nenhum evento encerrado foi encontrado" visbleStrong />
          )}

          {(events.length > 0 && filteredEvents.length < 1) && (
          <SearchNotFound term={searchTerm} />
          )}

          {filteredEvents.length > 0 && (
          <>
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            <Table>
              <thead>
                <tr>
                  <th>Descrição do evento</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((evento) => (
                  <tr key={evento.id} onClick={() => handleViewEvent(evento.id)}>
                    <td data-title="Descrição">{evento.descricao}</td>
                    <td data-title="Data">{dateFormated(evento.created_at)}</td>
                  </tr>
                ))}
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
