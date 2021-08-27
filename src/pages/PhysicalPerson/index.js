import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import {
    Box,
    Tooltip,
    IconButton,
} from '@material-ui/core';

import { Add, Edit, Delete } from '@material-ui/icons';

import {
    ContainerPoints,
    ContentPoints,
    ContainerPhysicalPersonCard,
} from './styles';

import Menu from '../../components/Menu';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import LoadingCard from '../../components/Loadings/LoadingCard';

import PhysicalPersonOperations from '../../common/rules/PhysicalPerson/PhysicalPersonOperations';

const PhysicalPerson = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [people, setPeople] = useState([]);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getPhysicalPeople();
    }, []);

    const getPhysicalPeople = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(PhysicalPersonOperations
                .listPhysicalPeople());

            setIsLoading(false);

            setPeople(response);
        } catch (err) {
            console.log('getPhysicalPeople', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    const handleConfirmDelete = (id, index) => {
        setDeletedItem({
            id,
            index,
        });

        setOpenConfirmDialog(true);
    }

    const handleDelete = async (item) => {
        let _items = [...people];

        _items.splice(item.index, 1);

        setPeople(_items);

        await dispatch(PhysicalPersonOperations.deletePhysicalPersonById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerPoints>
            <Menu />

            <ConfirmDialog
                dialogOpen={openConfirmDialog}
                handleCloseDialog={() => {
                    setDeletedItem({});

                    setOpenConfirmDialog(false);
                }}
                handleConfirmAction={() => {
                    handleDelete(deletedItem);

                    setOpenConfirmDialog(false);
                }}
                title="Excluir Pessoa Física"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentPoints>
                    <Box className="container-header-page">
                        <h1>Pessoas Físicas</h1>

                        <Tooltip title="Nova pessoa física" arrow>
                            <IconButton
                                aria-label="Nova pessoa física"
                                component={Link}
                                to="/pessoas-fisicas/adicionar"
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box>
                        <LoadingCard
                            rows={2}
                            isLoading={isLoading}
                            hasError={hasError}
                            onPress={getPhysicalPeople}
                        />

                        {!isLoading && !hasError && people && people.length === 0 && (
                            <p>Nenhum resultado encontrado</p>
                        )}

                        {!isLoading && !hasError && people && people.length > 0 && people.map((item, index) => (
                            <ContainerPhysicalPersonCard key={item.cpf}>
                                <Box className="item-container-name">
                                    <Box className="item-flex">
                                        <h2>{item.nomeCompleto}</h2>

                                        <Tooltip title="Editar" arrow>
                                            <IconButton
                                                aria-label="Editar"
                                                component={Link}
                                                to={`/pessoas-fisicas/editar/${item.id}`}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Excluir" arrow>
                                            <IconButton
                                                aria-label="Excluir"
                                                onClick={() => handleConfirmDelete(item.id, index)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    <Box className="item-status">
                                        <p>{item.statusAlistamento}</p>
                                    </Box>
                                </Box>

                                <p>
                                    CPF: {item.cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4')}
                                </p>

                                <p>
                                    {item.bairro} - {item.municipio} - {item.estado}
                                </p>
                            </ContainerPhysicalPersonCard>
                        ))}
                    </Box>
                </ContentPoints>
            </Box>
        </ContainerPoints>
    )
}

export default PhysicalPerson;
