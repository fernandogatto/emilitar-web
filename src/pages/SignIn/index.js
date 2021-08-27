import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
    Box,
    FormControl,
    FormHelperText,
    TextField,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Tooltip,
    IconButton,
    Button,
    CircularProgress,
} from '@material-ui/core';

import {
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';

import { ContainerSignIn, SignInBackground } from './styles';

import logo from '../../assets/logo.png';

import { useAuth } from '../../common/contexts/Auth';

const SignIn = () => {
    const history = useHistory();

    const { signIn } = useAuth();

    const [inputTextData, setInputTextData] = useState({
        email: '',
        senha: '',
    });

    const [inputError, setInputError] = useState({
        email: false,
        senha: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({...inputTextData, [name]: value});
    }

    const handleSubmit = async () => {
        try {
            const { email, senha } = inputTextData;

            setInputError({
                email: email === '' ? true : false,
                senha: senha === '' ? true : false,
            });

            if (email !== '' && senha !== '') {
                const data = {
                    email,
                    senha,
                };

                setIsSubmiting(true);

                await signIn(data);

                setIsSubmiting(false);

                history.push('/status-do-alistamento');
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerSignIn>
            <Box className="container-content">
                <img
                    src={logo}
                    alt="Logo eMilitar"
                />

                <h1>Esteja em dia com o serviço militar</h1>

                <Box className="container-form">
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

                    <FormControl
                        required
                        error={inputError.senha}
                        variant="outlined"
                        fullWidth
                        className="input"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Senha
                        </InputLabel>

                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="senha"
                            labelWidth={60}
                            value={inputTextData.senha}
                            onChange={handleInputTextChange}
                            disabled={isSubmiting}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Senha visível"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={event => event.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword
                                            ? <Tooltip title="Esconder senha" arrow>
                                                <Visibility />
                                            </Tooltip>
                                            : <Tooltip title="Mostrar senha" arrow>
                                                <VisibilityOff />
                                            </Tooltip>
                                        }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        {inputError.senha && (
                            <FormHelperText>
                                Campo obrigatório
                            </FormHelperText>
                        )}
                    </FormControl>

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
                                Entrar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <SignInBackground />
        </ContainerSignIn>
    )
}

export default SignIn;
