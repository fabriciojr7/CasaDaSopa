import { useEffect, useMemo, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Container, Content, Search,
} from './styles';

import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination';
import EntityService from '../../../services/EntityService';
import EmptyList from '../components/EmptyList';
import ErrorContainer from '../components/ErrorContainer';
import HeaderContent from '../components/HeaderContent';
import HeaderPage from '../components/HeaderPage';
import InputSearch from '../components/InputSearch';
import EntidadesPDF from '../components/Reports/EntidadesRelatorio';
import SearchNotFound from '../components/SearchNotFound';
import Table from '../components/Table';

export default function Entities() {
  const [entities, setEntities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const loadEntities = async () => {
    try {
      setIsLoading(true);
      const { data } = await EntityService.listEntities();
      setHasError(false);
      setEntities(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntities();
  }, []);

  const filteredEntitites = useMemo(() => entities.filter((entity) => (
    entity.nome_fantasia.toLowerCase().includes(searchTerm.toLowerCase())
  )), [entities, searchTerm]);

  const itensPerPage = 15;
  const pages = Math.ceil(filteredEntitites.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentEntitites = filteredEntitites.slice(startItens, endIndex);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadEntities();
  };

  return (
    <Container>
      <HeaderPage title="Entidades" />
      <Loader isLoading={isLoading} />

      {entities.length > 0 && (
        <Search>
          <InputSearch
            value={searchTerm}
            change={handleChangeSearchTerm}
            place="Pesquisar entidade pelo nome fantasia..."
          />
        </Search>
      )}

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredEntitites}
          array={entities}
          textSing=" entidade"
          textPlu=" entidades"
          textButtom="Nova entidade"
          to="/adm/entidades/new"
          print={() => EntidadesPDF(entities)}
        />

        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista de entidades"
          click={handleTryAgain}
        />
        )}

        {!hasError && (
        <>
          {(entities.length < 1 && !isLoading) && (
          <EmptyList term="Nenhuma entidade cadastrada" />
          )}

          {(entities.length > 0 && filteredEntitites.length < 1) && (
          <SearchNotFound term={searchTerm} />
          )}

          {filteredEntitites.length > 0 && (
          <>
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            <Table>
              <thead>
                <tr>
                  <th>Nome fantasia</th>
                  <th>CNPJ</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                currentEntitites.map((entity) => (
                  <tr key={entity.id}>
                    <td data-title="Nome fantasia">{entity.nome_fantasia}</td>
                    <td data-title="CNPJ">{entity.cnpj}</td>
                    <td data-title="Telefone">{entity.telefone}</td>
                    <td data-title="Ações">
                      <Link to={`/adm/entidades/edit/${entity.id}`}>
                        <FaEdit className="edit" />
                      </Link>
                    </td>
                  </tr>
                ))
            }
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
