import { useState } from 'react';
import {
  Container, Hamburguer, BarHamburguer,
} from './styles';

import NavBar from '../NavBar';

export default function Header({ title }) {
  const [active, setActive] = useState(false);

  const handleMenuHamb = () => {
    setActive((prevState) => (!prevState));
  };

  return (
    <Container className={active ? 'active' : ''}>
      <h1>{title}</h1>
      <NavBar closeMenu={handleMenuHamb} />

      <Hamburguer onClick={handleMenuHamb} className={['hamb', active ? 'active' : '']}>
        <BarHamburguer />
      </Hamburguer>
    </Container>
  );
}
