import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import EventService from '../../../services/EventService';
import toast from '../../../utils/toast';

import HeaderForm from '../components/HeaderForm';
import InputSearch from '../components/InputSearch';
import Table from '../components/Table';
import { Container, Content, Search } from './styles';

export default function ClosedEventView() {
  const [event, setEvent] = useState({});
  const [responsaveis, setResponsaveis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRadioBtn, setSelectedRadioBtn] = useState('todas');

  const { id } = useParams();
  const navigate = useNavigate();

  const filteredResponsaveis = useMemo(() => responsaveis.filter((responsavel) => (
    responsavel.nome_completo.toLowerCase().includes(searchTerm.toLowerCase())
  )), [responsaveis, searchTerm]);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const { data } = await EventService.getEvent(id);

        if (data.length === 0) {
          toast({
            type: 'danger',
            text: 'Erro ao buscar dados do grupo!',
            duration: 5000,
          });
          navigate('/adm/eventosencerrados');
        }
        setEvent(data[0]);
        setResponsaveis(data[0].responsaveis);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados do grupo!',
          duration: 5000,
        });
        navigate('/adm/eventosencerrados');
      }
    };

    loadEvent();
  }, [id, navigate]);

  const listResponsaveis = () => {
    if (selectedRadioBtn === 'todas') {
      return filteredResponsaveis;
    }

    if (selectedRadioBtn === 'sim') {
      const newResponsaveis = filteredResponsaveis.filter((resp) => resp.presente);
      return newResponsaveis;
    }

    const newResponsaveis = filteredResponsaveis.filter((resp) => !resp.presente);
    return newResponsaveis;
  };

  const isRadioSelected = (radio) => selectedRadioBtn === radio;

  const handleRadioClick = (e) => {
    setSelectedRadioBtn(e.target.value);
  };

  return (
    <Container>
      <HeaderForm title={event?.descricao || 'Evento'} to="/adm/eventosencerrados" />
      <Loader isLoading={isLoading} />

      <Content>
        {responsaveis.length > 0 && (
        <Search>
          <InputSearch
            value={searchTerm}
            change={(e) => setSearchTerm(e.target.value)}
            place="Pesquisar responsável pelo nome..."
          />
        </Search>
        )}

        {!isLoading && (
        <>
          <div className="filter">
            <p>Presenças: </p>
            <input
              type="radio"
              value="todas"
              name="presencas"
              checked={isRadioSelected('todas')}
              onChange={handleRadioClick}
            />
            Todas
            <input
              type="radio"
              value="sim"
              name="presencas"
              checked={isRadioSelected('sim')}
              onChange={handleRadioClick}
            />
            Confirmadas
            <input
              type="radio"
              value="nao"
              name="presencas"
              checked={isRadioSelected('nao')}
              onChange={handleRadioClick}
            />
            Não confirmadas
          </div>

          <Table>
            <thead>
              <tr>
                <th>Responsável</th>
                <th>Telefone</th>
                <th>Presença</th>
              </tr>
            </thead>
            <tbody>
              {listResponsaveis().map((responsavel) => (
                <tr key={responsavel.id}>
                  <td data-title="Responsável">
                    {responsavel.nome_completo}
                  </td>
                  <td data-title="Telefone">
                    {responsavel.telefone}
                  </td>
                  <td data-title="Presença">{responsavel.presente ? 'Sim' : 'Não'}</td>
                </tr>
              ))}

            </tbody>
          </Table>
        </>
        )}
      </Content>
    </Container>
  );
}
