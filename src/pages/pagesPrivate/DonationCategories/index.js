import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Container, Content, Search } from './styles';
import HeaderPage from '../components/HeaderPage';
import Table from '../components/Table';
import HeaderContent from '../components/HeaderContent';
import Pagination from '../../../components/Pagination';
import InputSearch from '../components/InputSearch';
import CategoryDonationService from '../../../services/CategoryDonationService';
import Loader from '../../../components/Loader';

export default function DonationCategories() {
  const [donations] = useState([
    { id: 1, nome: 'Medicamentos', email: 'medicamento@email.com' },
    { id: 2, nome: 'Alimentos', email: 'alimento@email.com' },
  ]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const itensPerPage = 15;
  const pages = Math.ceil(categories.length / itensPerPage);
  const startItens = currentPage * itensPerPage;
  const endIndex = startItens + itensPerPage;
  const currentDonations = categories.slice(startItens, endIndex);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await CategoryDonationService.listCategories();

      //   setHasError(false);
      setCategories(data);
    } catch {
    //   setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Container>
      <HeaderPage title="Categorias de doação" />
      <Loader isLoading={isLoading} />

      {categories.length > 0 && (
        <Search>
          <InputSearch
            value={searchTerm}
            change={(e) => setSearchTerm(e.target.value)}
            place="Pesquisar categoria pelo nome..."
          />
        </Search>
      )}

      <Content>
        <HeaderContent
        // hasError={hasError}
          filteredArray={donations}
          array={donations}
          textSing=" categoria"
          textPlu=" categorias"
          textButtom="Novo grupo"
          to="/adm/categoriasdoacao/new"
        //   print={() => gruposPDF(groups)}
        />

        {/* {hasError && (
        <ErrorContainer
          msgErro=" Ocorreu um erro ao obter a lista de grupos"
          click={handleTryAgain}
        />

      )} */}

        {/* {!hasError && ( */}
        <>
          {/* {(groups.length < 1 && !isLoading) && (
            <EmptyList term="Nenhum grupo foi cadastrado" />
          )}

          {(groups.length > 0 && filteredGroups.length < 1) && (
            <SearchNotFound term={searchTerm} />
          )} */}

          {/* {filteredGroups.length > 0 && ( */}
          <div>
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td data-title="Nome">{donation.descricao}</td>
                    <td data-title="E-mail">{donation.email}</td>
                    <td data-title="Ações">
                      <Link to={`/adm/categoriasdoacao/edit/${donation.id}`}>
                        <FaEdit className="edit" />
                      </Link>

                      <FaTrash
                        className="remove"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* )} */}
        </>
        {/* )} */}

      </Content>
    </Container>
  );
}
