import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/deliveries"> ENCOMENDAS </Link>
          <Link to="/deliverymen"> ENTREGADORES </Link>
          <Link to="/recipients"> DESTINATÁRIOS </Link>
          <Link to="/problems"> PROBLEMAS </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                SAIR DO SISTEMA
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
