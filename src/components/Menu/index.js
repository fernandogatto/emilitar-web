import React from 'react';

import { NavLink } from 'react-router-dom';

import {
    Button,
} from '@material-ui/core';

import {
    Home,
    Timeline,
    Person,
    ExitToApp,
} from '@material-ui/icons';

import { MenuContainer } from './styles';

import logo from '../../assets/logo.png';

const Menu = () => {
    return (
        <MenuContainer>
            <img
                src={logo}
                alt="Logo eMilitar"
            />

            <nav>
                <NavLink to="/status-do-alistamento" activeClassName="active">
                    <Timeline />
                    Status do Alistamento
                </NavLink>

                <NavLink to="/pessoas-fisicas" activeClassName="active">
                    <Person />
                    Pessoas Físicas
                </NavLink>
            </nav>

            <Button
                startIcon={<ExitToApp />}
                color="primary"
                fullWidth
                onClick={() => {}}
                className="logoff"
            >
                Sair
            </Button>
        </MenuContainer>
    )
}

export default Menu;
