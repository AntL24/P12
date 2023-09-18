import React from 'react';
import styled from 'styled-components';

const VerticalNav = styled.nav`
  height: 100%;
  z-index: -1;
  width: 117px; 
  background-color: #000;
  position: fixed;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  z-index: 99;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 10px; 
`;

const NavIcon = styled.img`
  width: 30px; 
  height: 30px;
`;

const Copyright = styled.p`
    color: #ffffff;
    font-size: 12px;
    line-height: 16px;
    rotate: -90deg;
    position: absolute;
    bottom: 5rem;
    
    @media (max-width: 1028px) {
        bottom: 3rem;
`;



const VerticalNavbar = () => {
    return (
        <VerticalNav>
                <IconContainer>
                    <NavIcon src={process.env.PUBLIC_URL + '/icon.svg'} alt="Icon" />
                </IconContainer>
                <IconContainer>
                    <NavIcon src={process.env.PUBLIC_URL + '/icon2.svg'} alt="Icon2" />
                </IconContainer>
                <IconContainer>
                    <NavIcon src={process.env.PUBLIC_URL + '/icon3.svg'} alt="Icon3" />
                </IconContainer>
                <IconContainer>
                    <NavIcon src={process.env.PUBLIC_URL + '/icon4.svg'} alt="Icon4" />
                </IconContainer>
            <Copyright>
                Copyright, SportSee 2020
            </Copyright>
        </VerticalNav>
    );
};

export default VerticalNavbar;
