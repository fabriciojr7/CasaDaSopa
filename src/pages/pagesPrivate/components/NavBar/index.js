import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  MdGroups, MdPerson,
  //   MdHome,
  MdHomeWork, MdLogout, MdOutlineFavorite, MdCategory,
} from 'react-icons/md';

import { FaCalendarCheck, FaCalendarTimes, FaImages } from 'react-icons/fa';
import Loader from '../../../../components/Loader';

import { AuthContext } from '../../../../context/auth';

import { Container, Logo, LogoutContent } from './styles';
import toast from '../../../../utils/toast';

export default function NavBar({ closeMenu }) {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch {
      toast({
        type: 'danger',
        text: 'Não foi possivel realizar o logout!',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Logo>
        Casa da sopa
      </Logo>

      <Link onClick={closeMenu} to="/adm/">
        <li>
          <FaCalendarCheck className="ico" />
          Evento
        </li>
      </Link>

      <Link onClick={closeMenu} to="/adm/eventosencerrados">
        <li>
          <FaCalendarTimes className="ico" />
          Eventos encerrados
        </li>
      </Link>

      <Link onClick={closeMenu} to="/adm/colaboradores">
        <li>
          <MdPerson className="ico" />
          Colaboradores
        </li>
      </Link>

      <Link onClick={closeMenu} to="/adm/albuns">
        <li>
          <FaImages className="ico" />
          Albuns
        </li>
      </Link>

      <Link onClick={closeMenu} to="/adm/grupos">
        <li>
          <MdGroups className="ico" />
          Grupos
        </li>
      </Link>

      <Link onClick={closeMenu} to="/adm/categoriasdoacao">
        <li>
          <MdCategory className="ico" />
          Categorias de doações
        </li>
      </Link>

      <Link onClick={closeMenu} to="/adm/familias">
        <li>
          <MdOutlineFavorite className="ico" />
          Famílias
        </li>
      </Link>

      <Link onClick={closeMenu} to="/adm/entidades">
        <li>
          <MdHomeWork className="ico" />
          Entidades
        </li>
      </Link>

      <LogoutContent onClick={handleLogout}>
        <li className="btn-logout">
          <MdLogout className="ico" />
          Sair
        </li>
      </LogoutContent>

    </Container>
  );
}
