import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
width: 100%;
position: fixed;
  height: 91px;
  background-color: #000;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  z-index: 100;
  // flex-shrink: 0;
`;

const NavItems = styled.div`
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-right: 100px;
`;

const Logo = styled.h1`
  color: red;
  display: flex;
  align-items: center;
  margin-left: -30px;
`;

const NavItem = styled.p`
  color: white;
  font-size: 24px;
`;

const NavBar = () => {
  return (
    <Nav>
      <NavItems>
        <Logo>
          <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="SportSee logo" />
        </Logo>
        <NavItem>Accueil</NavItem>
        <NavItem>Profil</NavItem>
        <NavItem>Réglages</NavItem>
        <NavItem>Communauté</NavItem>
      </NavItems>
    </Nav>
  );
};

export default NavBar;
