import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import {
    Box,
} from '@material-ui/core';

import Menu from '../../components/Menu';

import {
    ContainerPoints,
    ContentPoints,
} from './styles';

import PhysicalPersonOperations from '../../common/rules/PhysicalPerson/PhysicalPersonOperations';

const Status = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [status, setStatus] = useState({});

    useEffect(() => {
        getStatus();
    }, []);

    const getStatus = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(PhysicalPersonOperations
                .getStatusMilitaryEnlistment());

            setIsLoading(false);

            setStatus(response);

            console.log('getStatus', response)
        } catch (err) {
            console.log('getStatus', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    return (
        <ContainerPoints>
            <Menu />

            <Box className="container-page">
                <ContentPoints>
                    <Box className="container-header-page">
                        <h1>Status do alistamento</h1>
                    </Box>


                </ContentPoints>
            </Box>
        </ContainerPoints>
    )
}

export default Status;
