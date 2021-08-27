import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import moment from 'moment';

import {
    Box,
} from '@material-ui/core';

import { Mail } from '@material-ui/icons';

import {
    ContainerStatus,
    ContentStatus,
} from './styles';

import Menu from '../../components/Menu';

import LoadingGridArea from '../../components/Loadings/LoadingGridArea';

import { useAuth } from '../../common/contexts/Auth';

import PhysicalPersonOperations from '../../common/rules/PhysicalPerson/PhysicalPersonOperations';

const Status = () => {
    const dispatch = useDispatch();

    const { isLoadingUser, hasErrorUser, user, getUser } = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [status, setStatus] = useState({});

    useEffect(() => {
        getStatus();
    }, []);

    const getStatus = async () => {
        try {
            if(!isLoadingUser && hasErrorUser) {
                getUser();
            }

            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(PhysicalPersonOperations
                .getStatusMilitaryEnlistment());

            setIsLoading(false);

            setStatus(response);
        } catch (err) {
            console.log('getStatus', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    return (
        <ContainerStatus>
            <Menu />

            <Box className="container-page">
                <ContentStatus>
                    <Box className="container-header-page">
                        <h1>Status do alistamento</h1>
                    </Box>

                    <LoadingGridArea
                        isLoading={isLoading || isLoadingUser}
                        hasError={hasError || hasErrorUser}
                        onPress={getStatus}
                        mainIsVisible
                        sidebarIsVisible
                        footerIsVisible
                    />

                    {!isLoadingUser &&
                        !hasErrorUser &&
                        user &&
                        user.nome !== '' &&
                        !isLoading &&
                        !hasError &&
                        status &&
                        status.statusAlistamento &&
                        status.statusAlistamento.id !== '' && (
                            <Box className="container-grid-area">
                                <Box className="item-main">
                                    <Box className="container-title">
                                        <h2>{user.nome} {user.sobrenome}</h2>
                                    </Box>

                                    <Box className="container-description">
                                        {user.municipio && user.municipio !== '' && (
                                            <Box className="item-description">
                                                <p>
                                                    {user.municipio}, {user.codigoEstado}
                                                </p>
                                            </Box>
                                        )}

                                        <Box className="item-description">
                                            <p>
                                                Status do alistamento: <strong>{status.statusAlistamento.valor}</strong>
                                            </p>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="item-sidebar">
                                    <Box className="container-title">
                                        <h3>Contato</h3>
                                    </Box>

                                    <Box className="container-description">
                                        <p>
                                            <Mail />
                                            {user.sub}
                                        </p>
                                    </Box>
                                </Box>

                                <Box className="item-footer">
                                    <Box className="container-title">
                                        <h3>Sobre</h3>
                                    </Box>

                                    <Box className="container-description">
                                        {status.postoAlistamento !== null && (
                                            <>
                                                <Box className="item-description">
                                                    <h4>Posto de alistamento</h4>

                                                    <p>
                                                        {status
                                                            .postoAlistamento
                                                            .endereco
                                                            .logradouro
                                                        }, {status
                                                            .postoAlistamento
                                                            .endereco
                                                            .numero
                                                        }, {status
                                                            .postoAlistamento
                                                            .endereco
                                                            .complemento
                                                        } - {status
                                                            .postoAlistamento
                                                            .endereco
                                                            .bairro
                                                        } - {status
                                                            .postoAlistamento
                                                            .endereco
                                                            .cep
                                                            .replace(/(\d{5})?(\d{3})/, '$1-$2')
                                                        }
                                                    </p>

                                                    <p>
                                                        {status
                                                            .postoAlistamento
                                                            .endereco.municipio
                                                            .nome
                                                        }, {status
                                                            .postoAlistamento
                                                            .endereco
                                                            .municipio
                                                            .codigoEstado
                                                        }
                                                    </p>
                                                </Box>

                                                <Box className="item-description">
                                                    <h4>Período de alistamento</h4>

                                                    <p>
                                                        {moment(status
                                                            .postoAlistamento
                                                            .periodoAlistamento
                                                            .dtInicio)
                                                            .format('DD/MM/YYYY')
                                                        } - {moment(status
                                                            .postoAlistamento
                                                            .periodoAlistamento
                                                            .dtFim)
                                                            .format('DD/MM/YYYY')
                                                        }
                                                    </p>
                                                </Box>
                                            </>
                                        )}

                                        {status.periodoAlistamentoMaisProximo !== null && (
                                            <Box className="item-description">
                                                <h4>Próximo período de alistamento</h4>

                                                <p>
                                                    {moment(status
                                                        .periodoAlistamentoMaisProximo
                                                        .dtInicio)
                                                        .format('DD/MM/YYYY')
                                                    } - {moment(status
                                                        .periodoAlistamentoMaisProximo
                                                        .dtFim)
                                                        .format('DD/MM/YYYY')
                                                    }
                                                </p>
                                            </Box>
                                        )}

                                        <Box className="item-description">
                                            <h4>Última atualização</h4>

                                            <p>
                                                {moment(status.ultimaAtualizacao)
                                                    .subtract(3, 'hours')
                                                    .format('DD/MM/YYYY [às] HH:mm')
                                                }
                                            </p>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                    )}
                </ContentStatus>
            </Box>
        </ContainerStatus>
    )
}

export default Status;
