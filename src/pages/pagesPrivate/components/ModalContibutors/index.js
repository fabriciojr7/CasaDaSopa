import { useEffect, useState } from 'react';
import { TableContent, CheckBox } from './styles';

import ContributorService from '../../../../services/ContributorService';
import Modal from '../../../../components/Modal';
import Table from '../Table';
import ContributorGroupService from '../../../../services/ContributorGroupService';
import Spinner from '../../../../components/Spinner';

export default function ModalContibutors({
  visible,
  onCancel,
  onConfirm,
  id,
  contributorsGroup,
}) {
  const [contributors, setContributors] = useState([]);
  const [listAddGroup, setListAddGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAddGroup, setLoadingAddGroup] = useState(false);

  useEffect(() => {
    const loadContributors = async () => {
      try {
        setIsLoading(true);
        const { data } = await ContributorService.listContributors();

        setContributors(data);
      } catch {
        //
      } finally {
        setIsLoading(false);
      }
    };

    loadContributors();
  }, []);

  const filteredArray = () => {
    const array1Filtrado = contributors.filter((itemArray1) => (
      !contributorsGroup.some((itemArray2) => (
        itemArray1.id === itemArray2.id && itemArray1.nome === itemArray2.nome
      ))
    ));

    const arrayContributors = [];

    array1Filtrado.forEach((item) => {
      arrayContributors.push({
        id: item.id,
        nome: item.nome,
        sobrenome: item.sobrenome,
      });
    });
    return arrayContributors;
  };

  const toggleAddContributor = (contributor) => {
    const copyList = [...listAddGroup];
    const item = copyList.find((itemList) => itemList.colaboradorId === contributor.id);
    if (!item) {
      copyList.push({
        grupoId: id,
        colaboradorId: contributor.id,
        nome: contributor.nome,
        sobrenome: contributor.sobrenome,
      });
      setListAddGroup(copyList);
    } else {
      const listFiltered = copyList.filter(
        (itemList) => itemList.colaboradorId !== contributor.id,
      );

      setListAddGroup(listFiltered);
    }
  };

  const addContributorsGruop = () => {
    setLoadingAddGroup(true);
    listAddGroup.forEach(async (item) => {
      await ContributorGroupService.createContributorGroup({

        grupoId: item.grupoId,
        colaboradorId: item.colaboradorId,
      });
      setLoadingAddGroup(false);
      onConfirm();
    });
    setListAddGroup([]);
  };

  return (
    <Modal
      visible={visible}
      title="Lista de colaboradores"
      cancelLabel="Cancelar"
      confirmLabel="Confirmar"
      onCancel={onCancel}
      onConfirm={addContributorsGruop}
      loading={loadingAddGroup}
    >
      {isLoading ? <Spinner size={48} />
        : (
          <TableContent>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Adicionar</th>
                </tr>
              </thead>
              <tbody>
                {
                filteredArray().map((contributor) => (
                  <tr key={contributor.id}>
                    <td data-title="Nome">
                      {contributor.nome}
                      {' '}
                      {contributor.sobrenome}
                    </td>
                    <td data-title="Adicionar">
                      <CheckBox
                        type="checkbox"
                        onChange={() => toggleAddContributor(contributor)}
                      />
                    </td>
                  </tr>
                ))
            }
              </tbody>
            </Table>
          </TableContent>
        )}
    </Modal>
  );
}
