import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
    Box,
    Tooltip,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Button,
    CircularProgress,
} from '@material-ui/core';

import { Add, Search } from '@material-ui/icons';

import Menu from '../../components/Menu';

import {
    ContainerPoints,
    ContentPoints,
    ContainerSearch,
} from './styles';

const Status = () => {
    const [inputTextData, setInputTextData] = useState({
        busca: '',
    });

    const [isSubmiting, setIsSubmiting] = useState(false);

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({...inputTextData, [name]: value});
    }

    const handleSearch = () => {
        try {
            const { busca } = inputTextData;

            setIsSubmiting(true);

            setIsSubmiting(false);
        } catch (err) {
            console.log('handleSearch', err);

            setIsSubmiting(false);
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

                    <ContainerSearch>
                        <FormControl
                            variant="outlined"
                            className="input"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Procurar
                            </InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-search"
                                type="search"
                                name="busca"
                                labelWidth={65}
                                value={inputTextData.busca}
                                onChange={handleInputTextChange}
                                disabled={isSubmiting}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onMouseDown={event => event.preventDefault()}
                                            edge="start"
                                        >
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <Box className="grid-button">
                            <Box className="wrapper">
                                {isSubmiting && (
                                    <CircularProgress
                                        className="circular-progress"
                                        style={{ width: 24, height: 24 }}
                                    />
                                )}

                                <Button
                                    aria-label="Submeter formulário de pesquisa"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={isSubmiting}
                                    onClick={handleSearch}
                                >
                                    Procurar
                                </Button>
                            </Box>
                        </Box>
                    </ContainerSearch>
                </ContentPoints>
            </Box>
        </ContainerPoints>
    )
}

export default Status;
