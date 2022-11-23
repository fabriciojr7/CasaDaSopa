import {
  useEffect, useState,
} from 'react';
import { MdOpenInNew } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import {
  Content,
  Card,
} from './styles';

import TitleSection from '../components/TitleSection';
import Loader from '../../../components/Loader';
import FamilyDonationService from '../../../services/FamilyDonationService';
import ContainerSection from '../components/ContainerSection';
import Pagination from '../../../components/Pagination';

export default function Donations() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const itensPerPage = 10;
  const pages = Math.ceil(requests.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentRequests = requests.slice(startItens, endIndex);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const { data } = await FamilyDonationService.listDonations();
      setRequests(data);
    } catch {
      //   setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const requestsOpened = () => currentRequests.filter((req) => (
    req.status === 'Solicitação Aberta'
  ));

  const handleRequest = (request) => {
    navigate(`/doacoes/${request.id}`);
  };

  return (
    <ContainerSection>
      <Loader isLoading={isLoading} />

      <TitleSection
        title="Doações"
        subtitle="Escolha uma e ajude uma família"
      />

      <Content>
        {
            requestsOpened().map((request) => (
              <Card
                key={request.id}
                onClick={() => handleRequest(request)}
              >
                <div className="card-header">
                  <strong>{request.titulo}</strong>
                  <MdOpenInNew />
                </div>
                <div className="card-description">
                  <p>
                    {request.descricao}
                  </p>
                </div>
              </Card>
            ))
        }

        {requests.length > 10 && (
        <Pagination
          pages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        )}

      </Content>
    </ContainerSection>
  );
}
