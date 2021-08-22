import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import InputMask from 'react-input-mask';

import {
    Box,
    TextField,
    Tooltip,
    IconButton,
    Button,
    CircularProgress,
} from '@material-ui/core';

import { ArrowBack } from '@material-ui/icons';

import { ContainerSignUp, SignUpBackground } from './styles';

const SignUp = () => {
    const [inputTextData, setInputTextData] = useState({
        nome: '',
        sobrenome: '',
        celular: '',
        email: '',
        senha: '',
        confirmarSenha: '',
    });

    const [inputError, setInputError] = useState({
        nome: false,
        sobrenome: false,
        celular: false,
        tamanhoCelular: false,
        email: false,
        senha: false,
        confirmarSenha: false,
        senhasDiferentes: false,
    });

    const [isSubmiting, setIsSubmiting] = useState(false);

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({...inputTextData, [name]: value});
    }

    const handleConfirmPassword = (event) => {
        const { value } = event.target;

        const name = 'senhasDiferentes';

        if (value !== inputTextData.senha) {
            setInputError({...inputError, [name]: true});
        } else {
            setInputError({...inputError, [name]: false});
        }
    }

    const handleSubmit = () => {
        try {
            const {
                nome,
                sobrenome,
                celular,
                email,
                senha,
                confirmarSenha,
            } = inputTextData;

            setInputError({
                nome: nome === '' ? true : false,
                sobrenome: sobrenome === '' ? true : false,
                celular: celular === '' ? true : false,
                tamanhoCelular: celular.length < 14 ? true : false,
                email: email === '' ? true : false,
                senha: senha === '' ? true : false,
                confirmarSenha: confirmarSenha === '' ? true : false,
                senhasDiferentes: inputError.senhasDiferentes,
            });

            if (
                nome !== '' &&
                sobrenome !== '' &&
                celular !== '' &&
                !inputError.tamanhoCelular < 14 &&
                email !== '' &&
                senha !== '' &&
                confirmarSenha !== '' &&
                !inputError.senhasDiferentes
            ) {
                const dados = {
                    nome,
                    sobrenome,
                    celular,
                    email,
                    senha,
                };

                setIsSubmiting(true);

                console.log('submit', dados);

                setIsSubmiting(false);
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerSignUp>
            <Box className="container-content">
                <Tooltip title="Voltar" arrow>
                    <IconButton
                        aria-label="Voltar página"
                        component={Link}
                        to="/"
                    >
                        <ArrowBack />
                    </IconButton>
                </Tooltip>

                <h1>Cadastrar usuário</h1>

                <Box className="container-form">
                    <Box className="container-flex">
                        <Box className="item-flex">
                            <TextField
                                required
                                error={inputError.nome}
                                variant="outlined"
                                type="text"
                                name="nome"
                                label="Nome"
                                fullWidth
                                value={inputTextData.nome}
                                onChange={handleInputTextChange}
                                disabled={isSubmiting}
                                className="input"
                                helperText={inputError.nome && 'Campo obrigatório'}
                            />
                        </Box>

                        <Box className="item-flex">
                            <TextField
                                required
                                error={inputError.sobrenome}
                                variant="outlined"
                                type="text"
                                name="sobrenome"
                                label="Sobrenome"
                                fullWidth
                                value={inputTextData.sobrenome}
                                onChange={handleInputTextChange}
                                disabled={isSubmiting}
                                className="input"
                                helperText={inputError.sobrenome && 'Campo obrigatório'}
                            />
                        </Box>
                    </Box>

                    <TextField
                        required
                        error={inputError.email}
                        variant="outlined"
                        type="email"
                        name="email"
                        label="E-mail"
                        fullWidth
                        value={inputTextData.email}
                        onChange={handleInputTextChange}
                        disabled={isSubmiting}
                        className="input"
                        helperText={inputError.email && 'Campo obrigatório'}
                    />

                    <InputMask
                        mask={inputTextData.celular.length > 14 ? "(99) 99999-9999" : "(99) 9999-99999"}
                        maskChar=""
                        fullWidth
                        value={inputTextData.celular}
                        onChange={handleInputTextChange}
                        disabled={isSubmiting}
                    >
                        {() => (
                            <TextField
                                required
                                error={inputError.celular || inputError.tamanhoCelular}
                                variant="outlined"
                                type="tel"
                                label="Celular"
                                name="celular"
                                fullWidth
                                className="input"
                                helperText={
                                    (inputError.celular && 'Campo obrigatório') ||
                                    (inputError.tamanhoCelular && 'Celular inválido')
                                }
                            />
                        )}
                    </InputMask>

                    <TextField
                        required
                        error={inputError.senha}
                        variant="outlined"
                        type="password"
                        name="senha"
                        label="Senha"
                        fullWidth
                        value={inputTextData.senha}
                        onChange={handleInputTextChange}
                        disabled={isSubmiting}
                        className="input"
                        helperText={inputError.senha && 'Campo obrigatório'}
                    />

                    <TextField
                        required
                        error={inputError.confirmarSenha || inputError.senhasDiferentes}
                        variant="outlined"
                        type="password"
                        name="confirmarSenha"
                        label="Confirmar senha"
                        fullWidth
                        value={inputTextData.confirmarSenha}
                        onChange={(event) => {
                            handleInputTextChange(event);

                            handleConfirmPassword(event);
                        }}
                        disabled={isSubmiting}
                        className="input"
                        helperText={
                            (inputError.confirmarSenha && 'Campo obrigatório') ||
                            (inputError.senhasDiferentes && 'As senhas são diferentes')
                        }
                    />

                    <Box mt={2} className="grid-button">
                        <Box className="wrapper">
                            {isSubmiting && (
                                <CircularProgress
                                    className="circular-progress"
                                    style={{ width: 24, height: 24 }}
                                />
                            )}

                            <Button
                                aria-label="Submeter formulário"
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={isSubmiting}
                                onClick={handleSubmit}
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <SignUpBackground />
        </ContainerSignUp>
    )
}

export default SignUp;
