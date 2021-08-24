import React from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import {
    Button,
} from '@material-ui/core';

import {
    Timeline,
    Person,
    ExitToApp,
} from '@material-ui/icons';

import { MenuContainer } from './styles';

import logo from '../../assets/logo.png';

import { useAuth } from '../../common/contexts/Auth';

const Menu = () => {
    const history = useHistory();

    const { isLoadingUser, hasErrorUser, user, signOut } = useAuth();

    const handleSignOut = () => {
        signOut();

        history.push('/');
    }

    return (
        <MenuContainer>
            <img
                src={logo}
                alt="Logo eMilitar"
            />

            {!isLoadingUser && !hasErrorUser && user && user.usuario_id !== '' && (
                <nav>
                    <NavLink to="/status-do-alistamento" activeClassName="active">
                        <Timeline />
                        Status do Alistamento
                    </NavLink>

                    {user.roles && user.roles.length > 0 && user.roles.includes('SERVIDOR') && (
                        <NavLink to="/pessoas-fisicas" activeClassName="active">
                            <Person />
                            Pessoas Físicas
                        </NavLink>
                    )}
                </nav>
            )}

            <Button
                startIcon={<ExitToApp />}
                color="primary"
                fullWidth
                onClick={handleSignOut}
                className="logoff"
            >
                Sair
            </Button>
        </MenuContainer>
    )
}

export default Menu;
