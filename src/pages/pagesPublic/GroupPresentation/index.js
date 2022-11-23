import { useEffect, useState } from 'react';
import { Container, Group } from './styles';
import ContainerSection from '../components/ContainerSection';
import TitleSection from '../components/TitleSection';
import Loader from '../../../components/Loader';

import groupImg from '../../../assets/images/grupo.jpg';
import GroupService from '../../../services/GroupService';
import ErrorContainer from '../../pagesPrivate/components/ErrorContainer';

export default function GroupPresentation() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  useEffect(() => {
    loadGroups();
  }, []);

  const listColaboradores = (colaboradores) => {
    const nameColaboradores = colaboradores?.map((colaborador) => colaborador.nome);
    return nameColaboradores?.join(', ');
  };

  const handleTryAgain = () => {
    loadGroups();
  };

  return (
    <ContainerSection>
      <Loader isLoading={isLoading} />
      <TitleSection
        title="Grupos de colaboradores"
        subtitle="Conheça quem faz acontecer"
      />

      {hasError && (
      <ErrorContainer
        msgErro="Ocorreu um erro ao obter a lista de grupos"
        click={handleTryAgain}
      />
      )}

      {!hasError && (
        <Container>
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
