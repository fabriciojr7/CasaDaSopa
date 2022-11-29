import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  List, ListMenu, Logo, NavContainer, StyledHeader,
} from './styles';

import iconClose from '../../../../assets/images/icons/closeICmenu.svg';
import iconOpen from '../../../../assets/images/icons/openICmenu.svg';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleMenuToggleVisible() {
    setMenuOpen((prevState) => !prevState);
  }

  return (
    <StyledHeader>
      <NavContainer>
        <Logo>
          <Link to="/">
            <h1>Casa da Sopa</h1>
          </Link>
        </Logo>

        <List>
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li>
              <Link to="/sobre">
                Quem somos
              </Link>

            </li>

            <li>
              <Link to="/galeria">
                Galeria
              </Link>
            </li>

            <li>
              <Link to="/grupos">
                Grupos
              </Link>
            </li>

            <li>
              <Link to="/contato">
                Contato
              </Link>
            </li>

            <li>
              <Link to="/doacoes">
                Doações
              </Link>
            </li>
          </ul>

        </List>

        <div className="login-buttom">
          <button
            onClick={() => navigate('/login')}
            type="button"
          >
            Painel
          </button>
        </div>

        <div className="mobile-icon">
          <button
            type="button"
            onClick={handleMenuToggleVisible}
          >
            {menuOpen ? (<img src={iconClose} alt="Icon menu" />) : (
              <img src={iconOpen} alt="Icon menu" />
            )}

          </button>
        </div>
      </NavContainer>

      <ListMenu menuOpen={menuOpen}>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>

          <li>
            <Link to="/sobre">
              Quem somos
            </Link>

          </li>

          <li>
            <Link to="/galeria">
              Galeria
            </Link>
          </li>

          <li>
            <Link to="/grupos">
              Grupos
            </Link>
          </li>

          <li>
            <Link to="/contato">
              Contato
            </Link>
          </li>

          <li>
            <Link to="/doacoes">
              Doações
            </Link>
          </li>
        </ul>

        <div className="login-buttom">
          <button
            type="button"
            onClick={() => navigate('/login')}
          >
            Painel
          </button>
        </div>
      </ListMenu>
    </StyledHeader>
  );
}
