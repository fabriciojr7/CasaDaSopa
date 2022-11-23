import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddressForm from '../components/AddressForm';
import FamiliesForm from '../components/FamiliesForm';
import HeaderForm from '../components/HeaderForm';
import RegistrationProgress from '../components/RegistrationProgress';

import AddressService from '../../../services/AddressService';
import FamilyService from '../../../services/FamilyService';
import toast from '../../../utils/toast';
import { Container } from './styles';

export default function NewFamilies() {
  const [renderForm, setRenderForm] = useState(1);
  const [idResp, setIdResp] = useState(0);
  const navigate = useNavigate();

  const handleSubimitResponsavel = async (formData) => {
    try {
      const { data } = await FamilyService.createFamily(formData);
      setIdResp(data.id);
      setRenderForm(2);
      toast({
        type: 'success',
        text: 'Responsável cadastrado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o responsável!',
        duration: 5000,
      });
    }
  };

  const handleSubimitAddress = async (formData) => {
    try {
      await AddressService.createAddress(formData);
      toast({
        type: 'success',
        text: 'Família cadastrada com sucesso!',
        duration: 3000,
      });
      navigate('/adm/familias/');
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o endereço!',
        duration: 5000,
      });
    }
  };

  return (
    <Container>
      <HeaderForm title="Cadastro de família" to="/adm/familias" />

      <RegistrationProgress check={renderForm} />

      {renderForm === 1
        ? (
          <FamiliesForm
            buttonLabel="Cadastrar responável"
            onSubmit={handleSubimitResponsavel}
          />
        )
        : (
          <AddressForm
            buttonLabel="Cadastrar endereço"
            idResp={idResp}
            onSubmit={handleSubimitAddress}
          />
        )}
    </Container>
  );
}
