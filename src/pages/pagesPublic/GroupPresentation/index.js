import { useEffect, useState } from 'react';
import { Container, Group } from './styles';
import ContainerSection from '../components/ContainerSection';
import TitleSection from '../components/TitleSection';
import Loader from '../../../components/Loader';

import groupImg from '../../../assets/images/grupo.jpg';
import GroupService from '../../../services/GroupService';
import RequestError from '../components/RequestError';
import EmptyList from '../../pagesPrivate/components/EmptyList';

export default function GroupPresentation() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setIsLoading(true);
        const { data } = await GroupService.listGroups();

        setGroups(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroups();
  }, []);

  const listColaboradores = (colaboradores) => {
    const nameColaboradores = colaboradores?.map((colaborador) => colaborador.nome);
    return nameColaboradores?.join(', ');
  };

  return (
    <ContainerSection>
      <Loader isLoading={isLoading} />
      <TitleSection
        title="Grupos de colaboradores"
        subtitle="Conheça quem faz acontecer"
      />

      {hasError && (
      <RequestError />
      )}

      {!hasError && (
        <Container>

          {(groups.length === 0) && !isLoading && (
          <EmptyList term="Nenhum grupo cadastrado!" visbleStrong />
          )}

          {groups.map((group) => (
            <Group key={group?.id}>
              <div className="group-information">
                <h2>{group?.nome}</h2>
                <p>
                  Membros:
                  {' '}
                  {listColaboradores(group?.colaboradores)}
                </p>
                <p>{group?.descricao}</p>
              </div>
              <div className="group-photo">
                <img src={group?.foto || groupImg} alt="Foto do Grupo" />
              </div>
            </Group>
          ))}
        </Container>
      )}

    </ContainerSection>
  );
}
