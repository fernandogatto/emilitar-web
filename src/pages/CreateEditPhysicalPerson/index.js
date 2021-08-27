import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import InputMask from 'react-input-mask';

import {
    Box,
    Tooltip,
    IconButton,
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from '@material-ui/core';

import { ArrowBack } from '@material-ui/icons';

import { Alert, AlertTitle } from '@material-ui/lab';

import {
    ContainerCreateEditPoints,
    ContentCreateEditPoints,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import LoadingForm from '../../components/Loadings/LoadingForm';

import LoadingInput from '../../components/Loadings/LoadingInput';

import HasErrorInput from '../../components/Errors/HasErrorInput';

import ListaEstados from '../../common/schemas/Estados';

import ListaCidades from '../../common/schemas/Cidades';

import { validateCPF, validateEmail } from '../../common/helpers/validations';

import PhysicalPersonOperations from '../../common/rules/PhysicalPerson/PhysicalPersonOperations';

import CityOperations from '../../common/rules/City/CityOperations';

const CreateEditPhysicalPerson = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const history = useHistory();

    const { isLoadingUser, hasErrorUser, user, getUser } = useAuth();

    const [inputTextData, setInputTextData] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        telefone: '',
        emailContato: '',
        nomeAlternativo: '',
        cep: '',
        logradouro: '',
        numero: 0,
        complemento: '',
        bairro: '',
    });

    const [inputSelectData, setInputSelectData] = useState({
        estado: '',
        municipio: '',
        escolaridade: '',
        estadoCivil: '',
        tipoSanguineo: '',
    });

    const [inputError, setInputError] = useState({
        nome: false,
        sobrenome: false,
        cpf: false,
        cpfInvalido: false,
        telefone: false,
        telefoneInvalido: false,
        emailContato: false,
        emailInvalido: false,
        escolaridade: false,
        estadoCivil: false,
        tipoSanguineo: false,
        cep: false,
        estado: false,
        municipio: false,
        logradouro: false,
        numero: false,
    });

    const [isLoadingPhysicalPerson, setIsLoadingPhysicalPerson] = useState(false);

    const [hasErrorPhysicalPerson, setHasErrorPhysicalPerson] = useState(false);

    const [physicalPerson, setPhysicalPerson] = useState({});

    const [isLoadingOptions, setIsLoadingOptions] = useState(true);

    const [hasErrorOptions, setHasErrorOptions] = useState(false);

    const [schooling, setSchooling] = useState([]);

    const [civilStatus, setCivilStatus] = useState([]);

    const [bloodTypes, setBloodTypes] = useState([]);

    const [city, setCity] = useState({});

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    const [alertIsOpen, setAlertIsOpen] = useState(true);

    useEffect(() => {
        getOptions();

        if (id) {
            getPhysicalPerson();
        }
    }, []);

    const getOptions = async () => {
        try {
            setIsLoadingOptions(true);

            setHasErrorOptions(false);

            const response = await dispatch(PhysicalPersonOperations
                .getOptions());

            setIsLoadingOptions(false);

            setSchooling(response.escolaridades);

            setCivilStatus(response.estadosCivil);

            setBloodTypes(response.tiposSanguineos);
        } catch (err) {
            console.log('getOptions', err);

            setIsLoadingOptions(false);

            setHasErrorOptions(true);
        }
    }

    const getPhysicalPerson = async () => {
        try {
            if(!isLoadingUser && hasErrorUser) {
                getUser();
            }

            setIsUpdate(true);

            setIsLoadingPhysicalPerson(true);

            setHasErrorPhysicalPerson(false);

            const response = await dispatch(PhysicalPersonOperations
                .getPhysicalPersonById(id));

            setIsLoadingPhysicalPerson(false);

            setInputTextData({
                nome: response.nome,
                sobrenome: response.sobrenome,
                cpf: response.cpf,
                telefone: response.telefone,
                emailContato: response.emailContato,
                nomeAlternativo: response.endereco.nomeAlternativo,
                cep: response.endereco.cep,
                logradouro: response.endereco.logradouro,
                numero: response.endereco.numero,
                complemento: response.endereco.complemento,
                bairro: response.endereco.bairro,
            });

            setInputSelectData({
                estado: response.endereco.municipio.codigoEstado,
                municipio: response.endereco.municipio.nome,
                escolaridade: response.escolaridade.id,
                estadoCivil: response.estadoCivil.id,
                tipoSanguineo: response.tipoSanguineo.id
            });

            setPhysicalPerson(response);
        } catch (err) {
            console.log('getPhysicalPerson', err);

            setIsLoadingPhysicalPerson(false);

            setHasErrorPhysicalPerson(true);
        }
    }

    useEffect(() => {
        if (
            !isUpdate &&
            !isLoadingUser &&
            !hasErrorUser &&
            user &&
            user.nome !== ''
        ) {
            setUserState();

            handleStateChange();
        }
    }, [user]);

    const setUserState = () => {
        const name = 'estado';

        setInputSelectData({ ...inputSelectData, [name]: user.codigoEstado });
    }

    const handleStateChange = async () => {
        try {
            const response = await dispatch(CityOperations
                .getCitiesByState(user.codigoEstado));

            handleCityChange(response);
        } catch (err) {
            console.log('handleCityChange', err);
        }
    }

    const handleCityChange = (values) => {
        const _city = values.find(item => item.nome === user.municipio);

        setCity(_city);
    }

    useEffect(() => {
        if (
            !isUpdate &&
            !isLoadingUser &&
            !hasErrorUser &&
            user &&
            user.nome !== '' &&
            inputSelectData.estado !== ''
        ) {
            setUserCity();
        }
    }, [inputSelectData.estado]);

    const setUserCity = () => {
        const name = 'municipio';

        setInputSelectData({ ...inputSelectData, [name]: user.municipio });
    }

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({ ...inputTextData, [name]: value });
    }

    const handleSelectChange = (event) => {
        const { name, value } = event.target;

        setInputSelectData({ ...inputSelectData, [name]: value });
    }

    const handleCepChange = async (event) => {
        const { value } = event.target;

        if (value.length === 9) {
            try {
                const response = await dispatch(PhysicalPersonOperations
                    .getAddressByCep(value));

                    if(response && response.cep !== '') {
                        setInputSelectData({
                            estado: response.uf,
                            municipio: response.localidade,
                            escolaridade: inputSelectData.escolaridade,
                            estadoCivil: inputSelectData.estadoCivil,
                            tipoSanguineo: inputSelectData.tipoSanguineo,
                            statusAlistamento: inputSelectData.statusAlistamento,
                        });

                        setInputTextData({
                            nome: inputTextData.nome,
                            sobrenome: inputTextData.sobrenome,
                            cpf: inputTextData.cpf,
                            telefone: inputTextData.telefone,
                            emailContato: inputTextData.emailContato,
                            nomeAlternativo: inputTextData.nomeAlternativo,
                            cep: response.cep,
                            logradouro: response.logradouro,
                            numero: response.numero,
                            complemento: response.complemento,
                            bairro: response.bairro,
                        });
                    }
            } catch (err) {
                console.log('handleChangeCep', err);
            }
        }
    }

    const handleEmailChange = (event) => {
        const { value } = event.target;

        const name = 'emailInvalido';

        const isValid = validateEmail(value);

        if (!isValid) {
            setInputError({ ...inputError, [name]: true });
        } else {
            setInputError({ ...inputError, [name]: false });
        }
    }

    const handleCpfChange = (event) => {
        const { value } = event.target;

        const name = 'cpfInvalido';

        const isValid = validateCPF(value);

        if (!isValid) {
            setInputError({ ...inputError, [name]: true });
        } else {
            setInputError({ ...inputError, [name]: false });
        }
    }

    const handleSubmit = async () => {
        try {
            const {
                nome,
                sobrenome,
                cpf,
                telefone,
                emailContato,
                nomeAlternativo,
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
            } = inputTextData;

            const {
                estado,
                municipio,
                escolaridade,
                estadoCivil,
                tipoSanguineo,
            } = inputSelectData;

            setInputError({
                nome: nome === '' ? true : false,
                sobrenome: sobrenome === '' ? true : false,
                cpf: cpf === '' ? true : false,
                telefone: telefone === '' ? true : false,
                emailContato: emailContato === '' ? true : false,
                escolaridade: escolaridade === '' ? true : false,
                estadoCivil: estadoCivil === '' ? true : false,
                tipoSanguineo: tipoSanguineo === '' ? true : false,
                cep: cep === '' ? true : false,
                estado: estado === '' ? true : false,
                municipio: municipio === '' ? true : false,
                logradouro: logradouro === '' ? true : false,
                numero: (numero === 0 || numero < 0) ? true : false,
            });

            if (
                nome !== '' &&
                sobrenome !== '' &&
                cpf !== '' &&
                !inputError.cpfInvalido &&
                telefone !== '' &&
                !inputError.telefoneInvalido &&
                emailContato !== '' &&
                !inputError.emailInvalido &&
                escolaridade !== '' &&
                estadoCivil !== '' &&
                tipoSanguineo !== '' &&
                cep !== '' &&
                estado !== '' &&
                municipio !== '' &&
                logradouro !== '' &&
                numero > 0
            ) {
                const data = {
                    nome,
                    sobrenome,
                    cpf: cpf.replace(/[^0-9]+/g, ''),
                    telefone: telefone.replace(/[^0-9]+/g, ''),
                    emailContato,
                    endereco: {
                        nomeAlternativo,
                        cep: cep.replace(/[^0-9]+/g, ''),
                        logradouro,
                        numero: Number(numero),
                        complemento,
                        bairro,
                        municipio: city,
                    },
                    escolaridade: schooling.find(item => item.id === escolaridade),
                    estadoCivil: civilStatus.find(item => item.id === estadoCivil),
                    tipoSanguineo: bloodTypes.find(item => item.id === tipoSanguineo),
                };

                setIsSubmiting(true);

                isUpdate
                    ? await dispatch(PhysicalPersonOperations.updatePhysicalPersonById(id, data))
                    : await dispatch(PhysicalPersonOperations.createPhysicalPerson(data));

                setIsSubmiting(false);

                history.goBack();
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerCreateEditPoints>
            <Menu />

            <Box className="container-page">
                <ContentCreateEditPoints>
                    <Box className="container-back-page">
                        <Tooltip title="Voltar" arrow>
                            <IconButton
                                aria-label="Voltar página"
                                component={Link}
                                to="/pessoas-fisicas"
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>

                        <h1>{isUpdate ? 'Editar': 'Cadastrar'} pessoa física</h1>
                    </Box>

                    <LoadingForm
                        isLoading={isLoadingPhysicalPerson || isLoadingUser}
                        hasError={hasErrorPhysicalPerson || hasErrorUser}
                        onPress={getPhysicalPerson}
                    />

                    {(!isUpdate ||
                        (!isLoadingPhysicalPerson &&
                            !hasErrorPhysicalPerson &&
                            physicalPerson &&
                            physicalPerson.nome !== '')) && (
                                <Box className="container-form">
                                    <Box className="container-section container-flex">
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

                                            <InputMask
                                                mask="999.999.999-99"
                                                maskChar=""
                                                fullWidth
                                                value={inputTextData.cpf}
                                                onChange={(event) => {
                                                    handleInputTextChange(event);

                                                    handleCpfChange(event);
                                                }}
                                                disabled={isSubmiting}
                                            >
                                                {() => (
                                                    <TextField
                                                        required
                                                        error={inputError.cpf || inputError.cpfInvalido}
                                                        variant="outlined"
                                                        type="tel"
                                                        label="CPF"
                                                        name="cpf"
                                                        fullWidth
                                                        className="input"
                                                        helperText={
                                                            (inputError.cpf && 'Campo obrigatório') ||
                                                            (inputError.cpfInvalido && 'CPF inválido')
                                                        }
                                                    />
                                                )}
                                            </InputMask>

                                            <InputMask
                                                mask={inputTextData.telefone.length > 14 ? "(99) 99999-9999" : "(99) 9999-99999"}
                                                maskChar=""
                                                fullWidth
                                                value={inputTextData.telefone}
                                                onChange={handleInputTextChange}
                                                disabled={isSubmiting}
                                            >
                                                {() => (
                                                    <TextField
                                                        required
                                                        error={inputError.telefone || inputError.telefoneInvalido}
                                                        variant="outlined"
                                                        type="tel"
                                                        label="Telefone de contato"
                                                        name="telefone"
                                                        fullWidth
                                                        className="input"
                                                        helperText={
                                                            (inputError.telefone && 'Campo obrigatório') ||
                                                            (inputError.telefoneInvalido && 'Telefone inválido')
                                                        }
                                                    />
                                                )}
                                            </InputMask>

                                            <TextField
                                                required
                                                error={inputError.emailContato || inputError.emailInvalido}
                                                variant="outlined"
                                                type="email"
                                                name="emailContato"
                                                label="E-mail de contato"
                                                fullWidth
                                                value={inputTextData.emailContato}
                                                onChange={(event) => {
                                                    handleInputTextChange(event);

                                                    handleEmailChange(event);
                                                }}
                                                disabled={isSubmiting}
                                                className="input"
                                                helperText={
                                                    (inputError.emailContato && 'Campo obrigatório') ||
                                                    (inputError.emailInvalido && 'E-mail inválido')
                                                }
                                            />

                                            {hasErrorOptions && (
                                                <HasErrorInput
                                                    marginTop={16}
                                                />
                                            )}

                                            {isLoadingOptions && (
                                                <>
                                                    <LoadingInput marginTop={16} />
                                                    <LoadingInput marginTop={16} />
                                                    <LoadingInput marginTop={16} />
                                                </>
                                            )}

                                            {!isLoadingOptions && !hasErrorOptions && (
                                                <>
                                                    <FormControl
                                                        required
                                                        error={inputError.escolaridade}
                                                        variant="outlined"
                                                        fullWidth
                                                        className="input"
                                                    >
                                                        <InputLabel htmlFor="escolaridade">
                                                            Escolaridade
                                                        </InputLabel>

                                                        <Select
                                                            value={inputSelectData.escolaridade}
                                                            onChange={handleSelectChange}
                                                            label="Escolaridade"
                                                            name="escolaridade"
                                                            disabled={isSubmiting}
                                                        >
                                                            {schooling && schooling.length > 0 && schooling.map(item => (
                                                                <MenuItem
                                                                    key={item.id}
                                                                    value={item.id}
                                                                >
                                                                    {item.valor}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>

                                                        {inputError.escolaridade && (
                                                            <FormHelperText>
                                                                Campo obrigatório
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>

                                                    <FormControl
                                                        required
                                                        error={inputError.estadoCivil}
                                                        variant="outlined"
                                                        fullWidth
                                                        className="input"
                                                    >
                                                        <InputLabel htmlFor="estadoCivil">
                                                            Estado civil
                                                        </InputLabel>

                                                        <Select
                                                            value={inputSelectData.estadoCivil}
                                                            onChange={handleSelectChange}
                                                            label="Estado civil"
                                                            name="estadoCivil"
                                                            disabled={isSubmiting}
                                                        >
                                                            {civilStatus && civilStatus.length > 0 && civilStatus.map(item => (
                                                                <MenuItem
                                                                    key={item.id}
                                                                    value={item.id}
                                                                >
                                                                    {item.valor}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>

                                                        {inputError.estadoCivil && (
                                                            <FormHelperText>
                                                                Campo obrigatório
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>

                                                    <FormControl
                                                        required
                                                        error={inputError.tipoSanguineo}
                                                        variant="outlined"
                                                        fullWidth
                                                        className="input"
                                                    >
                                                        <InputLabel htmlFor="tipoSanguineo">
                                                            Tipo sanguíneo
                                                        </InputLabel>

                                                        <Select
                                                            value={inputSelectData.tipoSanguineo}
                                                            onChange={handleSelectChange}
                                                            label="Tipo sanguíneo"
                                                            name="tipoSanguineo"
                                                            disabled={isSubmiting}
                                                        >
                                                            {bloodTypes && bloodTypes.length > 0 && bloodTypes.map(item => (
                                                                <MenuItem
                                                                    key={item.id}
                                                                    value={item.id}
                                                                >
                                                                    {item.valor}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>

                                                        {inputError.tipoSanguineo && (
                                                            <FormHelperText>
                                                                Campo obrigatório
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </>
                                            )}
                                        </Box>

                                        <Box className="item-flex">
                                            <InputMask
                                                mask="99999-999"
                                                maskChar=""
                                                fullWidth
                                                value={inputTextData.cep}
                                                onChange={(event) => {
                                                    handleInputTextChange(event);

                                                    handleCepChange(event);
                                                }}
                                                disabled={isSubmiting}
                                            >
                                                {() => (
                                                    <TextField
                                                        required
                                                        error={inputError.cep}
                                                        variant="outlined"
                                                        type="tel"
                                                        label="CEP"
                                                        name="cep"
                                                        fullWidth
                                                        className="input"
                                                        helperText={inputError.cep && 'Campo obrigatório'}
                                                    />
                                                )}
                                            </InputMask>

                                            {alertIsOpen && (
                                                <Alert
                                                    severity="info"
                                                    className="input"
                                                    style={{
                                                        height: 128,
                                                    }}
                                                >
                                                    <AlertTitle>
                                                        Atenção!
                                                    </AlertTitle>

                                                    <p>Só é permitido cadastrar pessoas no município em que você atua.</p>

                                                    <Box
                                                        style={{ display: 'flex', justifyContent: 'flex-end'}}
                                                    >
                                                        <Button
                                                            size="small"
                                                            disabled={isSubmiting}
                                                            onClick={() => setAlertIsOpen(false)}
                                                        >
                                                            Fechar
                                                        </Button>
                                                    </Box>
                                                </Alert>
                                            )}

                                            <FormControl
                                                required
                                                error={inputError.estado}
                                                variant="outlined"
                                                fullWidth
                                                className="input"
                                            >
                                                <InputLabel htmlFor="estado">
                                                    Estado
                                                </InputLabel>

                                                <Select
                                                    value={inputSelectData.estado}
                                                    onChange={handleSelectChange}
                                                    label="Estado"
                                                    name="estado"
                                                    disabled={isSubmiting || user.codigoEstado !== ''}
                                                >
                                                    {Object.keys(ListaEstados).map(key => (
                                                        <MenuItem
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {ListaEstados[key]}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                                {inputError.estado && (
                                                    <FormHelperText>
                                                        Campo obrigatório
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <FormControl
                                                required
                                                error={inputError.municipio}
                                                variant="outlined"
                                                fullWidth
                                                className="input"
                                            >
                                                <InputLabel htmlFor="municipio">
                                                    Cidade
                                                </InputLabel>

                                                <Select
                                                    value={inputSelectData.municipio}
                                                    onChange={(event) => {
                                                        handleSelectChange(event);

                                                        handleCityChange(event);
                                                    }}
                                                    label="Cidade"
                                                    name="municipio"
                                                    disabled={isSubmiting || user.municipio !== ''}
                                                >
                                                    {inputSelectData.estado &&
                                                        ListaCidades[inputSelectData.estado] &&
                                                        ListaCidades[inputSelectData.estado].map(key => (
                                                            <MenuItem
                                                                key={key}
                                                                value={key}
                                                            >
                                                                {key}
                                                            </MenuItem>
                                                    ))}
                                                </Select>

                                                {inputError.municipio && (
                                                    <FormHelperText>
                                                        Campo obrigatório
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <TextField
                                                required
                                                error={inputError.logradouro}
                                                variant="outlined"
                                                type="text"
                                                name="logradouro"
                                                label="Logradouro"
                                                fullWidth
                                                value={inputTextData.logradouro}
                                                onChange={handleInputTextChange}
                                                disabled={isSubmiting}
                                                className="input"
                                                helperText={inputError.logradouro && 'Campo obrigatório'}
                                            />

                                            <TextField
                                                required
                                                error={inputError.numero}
                                                variant="outlined"
                                                type="number"
                                                name="numero"
                                                label="Número"
                                                fullWidth
                                                inputProps={{ min: 0 }}
                                                min={0}
                                                value={inputTextData.numero}
                                                onChange={handleInputTextChange}
                                                disabled={isSubmiting}
                                                className="input"
                                                helperText={inputError.numero && 'Campo obrigatório'}
                                            />

                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                name="complemento"
                                                label="Complemento"
                                                fullWidth
                                                value={inputTextData.complemento}
                                                onChange={handleInputTextChange}
                                                disabled={isSubmiting}
                                                className="input"
                                            />

                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                name="nomeAlternativo"
                                                label="Nome alternativo"
                                                fullWidth
                                                value={inputTextData.nomeAlternativo}
                                                onChange={handleInputTextChange}
                                                disabled={isSubmiting}
                                                className="input"
                                            />
                                        </Box>
                                    </Box>

                                    <Box className="grid-button">
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
                                                {isUpdate ? 'Atualizar' : 'Salvar'}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                    )}
                </ContentCreateEditPoints>
            </Box>
        </ContainerCreateEditPoints>
    )
}

export default CreateEditPhysicalPerson;
