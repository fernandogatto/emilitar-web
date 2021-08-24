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

import {
    ContainerCreateEditPoints,
    ContentCreateEditPoints,
} from './styles';

import Menu from '../../components/Menu';

import ListaEstados from '../../common/schemas/Estados';

import ListaCidades from '../../common/schemas/Cidades';

import PhysicalPersonOperations from '../../common/rules/PhysicalPerson/PhysicalPersonOperations';

const CreateEditPhysicalPerson = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const history = useHistory();

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
        statusAlistamento: '',
    });

    const [inputError, setInputError] = useState({
        nome: false,
        sobrenome: false,
        cpf: false,
        tamanhoCpf: false,
        telefone: false,
        tamanhoTelefone: false,
        emailContato: false,
        cep: false,
        estado: false,
        municipio: false,
        escolaridade: false,
        estadoCivil: false,
        tipoSanguineo: false,
        statusAlistamento: false,
    });

    const [physicalPerson, setPhysicalPerson] = useState({});

    const [isLoadingPhysicalPerson, setIsLoadingPhysicalPerson] = useState(true);

    const [hasErrorPhysicalPerson, setHasErrorPhysicalPerson] = useState(false);

    const [isLoadingOptions, setIsLoadingOptions] = useState(true);

    const [hasErrorOptions, setHasErrorOptions] = useState(false);

    const [schooling, setSchooling] = useState([]);

    const [civilStatus, setCivilStatus] = useState([]);

    const [enlistmentStatus, setEnlistmentStatus] = useState([]);

    const [bloodTypes, setBloodTypes] = useState([]);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        getOptions();

        if (id) {
            getPhysicalPerson();
        }
    }, []);

    const getOptions = async () => {
        try {
            setIsLoadingOptions(true);

            const response = await dispatch(PhysicalPersonOperations.getOptions());

            setIsLoadingOptions(false);

            setSchooling(response.escolaridades);

            setCivilStatus(response.estadosCivil);

            setEnlistmentStatus(response.statusesAlistamento);

            setBloodTypes(response.tiposSanguineos);
        } catch (err) {
            console.log('getOptions', err);

            setIsLoadingOptions(false);
        }
    }

    const getPhysicalPerson = async () => {
        try {
            setIsUpdate(true);

            setIsLoadingPhysicalPerson(true);

            setHasErrorPhysicalPerson(false);

            const response = await dispatch(PhysicalPersonOperations
                .getPhysicalPersonById(id));

            setIsLoadingPhysicalPerson(false);

            setPhysicalPerson(response);

            console.log('getPhysicalPerson', response);
        } catch (err) {
            console.log('getPhysicalPerson', err);

            setIsLoadingPhysicalPerson(false);

            setHasErrorPhysicalPerson(true);
        }
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
                            cep: inputTextData.cep,
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

    const handleSubmit = async () => {
        try {
            const {
                nome,
                sobrenome,
                cpf,
                telefone,
                emailContato,
                Alternativo,
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
                statusAlistamento,
            } = inputSelectData;

            setInputError({
                nome: nome === '' ? true : false,
            });

            if (
                nome !== ''
            ) {
                setIsSubmiting(true);

                const data = {
                    nome,
                    sobrenome,
                    cpf,
                    telefone,
                    emailContato,
                    Alternativo,
                    cep,
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    estado,
                    municipio,
                    escolaridade,
                    estadoCivil,
                    tipoSanguineo,
                    statusAlistamento,
                };

                console.log('handleSubmit', data)

                isUpdate
                    ? await dispatch(PhysicalPersonOperations.updatePhysicalPersonById(id, data))
                    : await dispatch(PhysicalPersonOperations.createPhysicalPerson(data));

                setIsSubmiting(false);

                // history.goBack();
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
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                >
                                    {() => (
                                        <TextField
                                            required
                                            error={inputError.cpf || inputError.tamanhoCpf}
                                            variant="outlined"
                                            type="tel"
                                            label="CPF"
                                            name="cpf"
                                            fullWidth
                                            className="input"
                                            helperText={
                                                (inputError.cpf && 'Campo obrigatório') ||
                                                (inputError.tamanhoCpf && 'CPF inválido')
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
                                            error={inputError.telefone || inputError.tamanhoTelefone}
                                            variant="outlined"
                                            type="tel"
                                            label="Telefone de contato"
                                            name="telefone"
                                            fullWidth
                                            className="input"
                                            helperText={
                                                (inputError.telefone && 'Campo obrigatório') ||
                                                (inputError.tamanhoTelefone && 'Telefone inválido')
                                            }
                                        />
                                    )}
                                </InputMask>

                                <TextField
                                    required
                                    error={inputError.emailContato}
                                    variant="outlined"
                                    type="email"
                                    name="emailContato"
                                    label="E-mail de contato"
                                    fullWidth
                                    value={inputTextData.emailContato}
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                    className="input"
                                    helperText={inputError.emailContato && 'Campo obrigatório'}
                                />

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

                                <FormControl
                                    required
                                    error={inputError.statusAlistamento}
                                    variant="outlined"
                                    fullWidth
                                    className="input"
                                >
                                    <InputLabel htmlFor="statusAlistamento">
                                        Status do alistamento
                                    </InputLabel>

                                    <Select
                                        value={inputSelectData.statusAlistamento}
                                        onChange={handleSelectChange}
                                        label="Status do alistamento"
                                        name="statusAlistamento"
                                        disabled={isSubmiting}
                                    >
                                        {enlistmentStatus && enlistmentStatus.length > 0 && enlistmentStatus.map(item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.valor}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {inputError.statusAlistamento && (
                                        <FormHelperText>
                                            Campo obrigatório
                                        </FormHelperText>
                                    )}
                                </FormControl>
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
                                        disabled={isSubmiting}
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
                                        onChange={handleSelectChange}
                                        label="Cidade"
                                        name="municipio"
                                        disabled={isSubmiting}
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
                                    value={inputTextData.numero}
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                    className="input"
                                    helperText={inputError.numero && 'Campo obrigatório'}
                                />

                                <TextField
                                    required
                                    error={inputError.complemento}
                                    variant="outlined"
                                    type="text"
                                    name="complemento"
                                    label="Complemento"
                                    fullWidth
                                    value={inputTextData.complemento}
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                    className="input"
                                    helperText={inputError.complemento && 'Campo obrigatório'}
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
                </ContentCreateEditPoints>
            </Box>
        </ContainerCreateEditPoints>
    )
}

export default CreateEditPhysicalPerson;
