import { useState, useEffect/* useCallback */ } from 'react';
import { useParams } from 'react-router-dom';

import AddressForm from '../components/AddressForm';
import FamiliesForm from '../components/FamiliesForm';
import HeaderForm from '../components/HeaderForm';
import Dependents from '../Dependents';
import FamilyService from '../../../services/FamilyService';
import Loader from '../../../components/Loader';

import {
  Container, TabContainer, TabProdHead, Tab, TabProdBody, TabContent,
} from './styles';
import AddressService from '../../../services/AddressService';
import toast from '../../../utils/toast';

export default function EditFamilies() {
  const [toggle, setToggle] = useState(1);
  const [responsavel, setResponsavel] = useState({});
  const [endereco, setEndereco] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dependentes, setDependentes] = useState([]);

  const toggleTab = (index) => {
    setToggle(index);
  };

  const { id } = useParams();

  useEffect(() => {
    const getFamily = async () => {
      try {
        setIsLoading(true);
        const { data } = await FamilyService.getFamily(id);

        setResponsavel({
          id: data[0].id,
          nome: data[0].nome_completo,
          cpf: data[0].cpf,
          telefone: data[0].telefone,
          nascimento: data[0].data_nasc,
          sexo: data[0].sexo,
          renda: data[0].renda,
          outrasInformacoes: data[0].outras_informacoes,
        });
        setEndereco(data[0].endereco);
        setDependentes(data[0].dependente);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados do responsável da família!',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getFamily();
  }, [id]);

  const handleSubimitResponsavel = async (formData) => {
    try {
      await FamilyService.updateFamily(id, formData);
      toast({
        type: 'success',
        text: 'Responsável da família editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o responsável da família!',
        duration: 5000,
      });
    }
  };

  const handleSubimitAddress = async (formData) => {
    try {
      await AddressService.updateAddress(endereco?.id, formData);
      toast({
        type: 'success',
        text: 'Endereço editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o endereço!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Edição de familia" to="/adm/familias" />
      <Loader isLoading={isLoading} />
      <TabContainer>
        <TabProdHead>
          <Tab
            onClick={() => toggleTab(1)}
            className={toggle === 1 ? 'active' : ''}
          >
            <h4>Responsável</h4>
          </Tab>

          <Tab
            onClick={() => toggleTab(2)}
            className={toggle === 2 ? 'active' : ''}
          >
            <h4>Endereço</h4>
          </Tab>

        </TabProdHead>

        <TabProdBody>
          <TabContent className={toggle === 1 ? 'active' : ''}>
            <FamiliesForm
              key={responsavel?.id}
              responsavel={responsavel}
              buttonLabel="Salvar alterações do responsável"
              onSubmit={handleSubimitResponsavel}
            />
          </TabContent>
          <TabContent className={toggle === 2 ? 'active' : ''}>
            <AddressForm
              key={endereco?.id}
              buttonLabel="Salvar alterações do endereço"
              idResp={responsavel?.id}
              endereco={endereco}
              onSubmit={handleSubimitAddress}
            />
          </TabContent>

        </TabProdBody>
      </TabContainer>

      <Dependents dependents={dependentes} idResp={responsavel?.id} />
    </Container>
  );
}
