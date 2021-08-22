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

import { ArrowBack, Delete } from '@material-ui/icons';

import {
    ContainerCreateEditPoints,
    ContentCreateEditPoints,
    SelectedItem,
} from './styles';

import Menu from '../../components/Menu';

import CheckboxDialog from '../../components/Dialogs/CheckboxDialog';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import ListaStatusDeposito from '../../common/schemas/StatusPoint';

import ListaEstados from '../../common/schemas/Estados';

import ListaCidades from '../../common/schemas/Cidades';

import PhysicalPersonOperations from '../../common/rules/PhysicalPerson/PhysicalPersonOperations';

const CreateEditPhysicalPerson = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [inputTextData, setInputTextData] = useState({
        descricao: '',
        emailContato: '',
        telefoneContato: '',
        cep: '',
    });

    const [inputSelectData, setInputSelectData] = useState({
        estabelecimento: '',
        statusPonto: '',
        estado: '',
        cidade: '',
    });

    const [inputError, setInputError] = useState({
        estabelecimento: false,
        descricao: false,
        emailContato: false,
        telefoneContato: false,
        tamanhoTelefone: false,
        statusPonto: false,
        cep: false,
        estado: false,
        cidade: false,
        selectedMaterials: false,
    });

    const [establishments, setEstablishments] = useState([]);

    const [isLoadingEstablishments, setIsLoadingEstablishments] = useState(false);

    const [hasErrorEstablishments, setHasErrorEstablishments] = useState(false);

    const [materials, setMaterials] = useState([]);

    const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);

    const [hasErrorMaterials, setHasErrorMaterials] = useState(false);

    const [selectedMaterials, setSelectedMaterials] = useState([]);

    const [deletedMaterial, setDeletedMaterial] = useState(null);

    const [selectedFile, setSelectedFile] = useState();

    const [preview, setPreview] = useState('');

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const getMaterials = async () => {
        try {
            setIsLoadingMaterials(true);

            setHasErrorMaterials(false);

            // const response = await dispatch();

            setIsLoadingMaterials(false);

            // setMaterials(response);
        } catch (err) {
            console.log('getMaterials', err);

            setIsLoadingMaterials(false);

            setHasErrorMaterials(true);
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
                            cidade: response.localidade,
                        });
                    }
            } catch (err) {
                console.log('handleChangeCep', err);
            }
        }
    }

    const handleConfirmDeleteMaterial = (index) => {
        setDeletedMaterial(index);

        setOpenConfirmDialog(true);
    }

    const handleDeleteMaterial = (index) => {
        let _items = [...selectedMaterials];

        _items.splice(index, 1);

        setSelectedMaterials(_items);

        setDeletedMaterial(null);
    }

    const handleSubmit = () => {
        try {
            const {
                descricao,
                emailContato,
                telefoneContato,
                cep,
            } = inputTextData;

            const {
                estabelecimento,
                statusPonto,
                estado,
                cidade,
            } = inputSelectData;

            setInputError({
                estabelecimento: estabelecimento === '' ? true : false,
                descricao: descricao === '' ? true : false,
                emailContato: emailContato === '' ? true : false,
                telefoneContato: telefoneContato === '' ? true : false,
                tamanhoTelefone: telefoneContato.length < 14 ? true : false,
                statusPonto: statusPonto === '' ? true : false,
                cep: cep === '' ? true : false,
                estado: estado === '' ? true : false,
                cidade: cidade === '' ? true : false,
                selectedMaterials: selectedMaterials.length === 0 ? true : false,
            });

            if (
                estabelecimento !== '' &&
                descricao !== '' &&
                emailContato !== '' &&
                telefoneContato !== '' &&
                !inputError.tamanhoTelefone < 14 &&
                statusPonto !== '' &&
                cep !== '' &&
                estado !== '' &&
                cidade !== '' &&
                selectedMaterials.length > 0
            ) {
                setIsSubmiting(true);

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

            <ConfirmDialog
                dialogOpen={openConfirmDialog}
                handleCloseDialog={(event, reason) => {
                    setDeletedMaterial(null);

                    setOpenConfirmDialog(false);
                }}
                handleConfirmAction={() => {
                    handleDeleteMaterial(deletedMaterial);

                    setOpenConfirmDialog(false);
                }}
                title="Excluir Material"
                message="Tem certeza que deseja excluir este item?"
            />

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

                        <h1>{isUpdate ? 'Editar': 'Cadastrar'} ponto de coleta</h1>
                    </Box>

                    <Box className="container-form">
                        <Box className="container-section container-flex">
                            <Box className="item-flex">
                                <FormControl
                                    required
                                    error={inputError.estabelecimento}
                                    variant="outlined"
                                    fullWidth
                                    className="input"
                                >
                                    <InputLabel htmlFor="estabelecimento">
                                        Estabelecimento
                                    </InputLabel>

                                    <Select
                                        value={inputSelectData.estado}
                                        onChange={handleSelectChange}
                                        label="Estabelecimento"
                                        name="estabelecimento"
                                        disabled={isSubmiting}
                                    >
                                        {establishments && establishments.length > 0 && establishments.map(item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.nome}
                                            >
                                                {item.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {inputError.estado && (
                                        <FormHelperText>
                                            Campo obrigatório
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <TextField
                                    required
                                    error={inputError.descricao}
                                    multiline
                                    minRows={5}
                                    maxRows={5}
                                    variant="outlined"
                                    type="text"
                                    name="descricao"
                                    label="Descrição"
                                    fullWidth
                                    value={inputTextData.descricao}
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                    className="input"
                                    helperText={inputError.descricao && 'Campo obrigatório'}
                                />

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

                                <InputMask
                                    mask={inputTextData.telefoneContato.length > 14 ? "(99) 99999-9999" : "(99) 9999-99999"}
                                    maskChar=""
                                    fullWidth
                                    value={inputTextData.telefoneContato}
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                >
                                    {() => (
                                        <TextField
                                            required
                                            error={inputError.telefoneContato || inputError.tamanhoTelefone}
                                            variant="outlined"
                                            type="tel"
                                            label="Telefone de contato"
                                            name="telefoneContato"
                                            fullWidth
                                            className="input"
                                            helperText={
                                                (inputError.telefoneContato && 'Campo obrigatório') ||
                                                (inputError.tamanhoTelefone && 'Telefone inválido')
                                            }
                                        />
                                    )}
                                </InputMask>

                                <FormControl
                                    required
                                    error={inputError.statusPonto}
                                    variant="outlined"
                                    fullWidth
                                    className="input"
                                >
                                    <InputLabel htmlFor="statusPonto">
                                        Status
                                    </InputLabel>

                                    <Select
                                        value={inputSelectData.statusPonto}
                                        onChange={handleSelectChange}
                                        label="Status"
                                        name="statusPonto"
                                        disabled={isSubmiting}
                                    >
                                        {Object.keys(ListaStatusDeposito).map(key => (
                                            <MenuItem
                                                key={key}
                                                value={key}
                                            >
                                                {ListaStatusDeposito[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {inputError.statusPonto && (
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
                                    error={inputError.cidade}
                                    variant="outlined"
                                    fullWidth
                                    className="input"
                                >
                                    <InputLabel htmlFor="cidade">
                                        Cidade
                                    </InputLabel>

                                    <Select
                                        value={inputSelectData.cidade}
                                        onChange={handleSelectChange}
                                        label="Cidade"
                                        name="cidade"
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

                                    {inputError.cidade && (
                                        <FormHelperText>
                                            Campo obrigatório
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                        </Box>

                        <Box className="container-section">
                            <h2>Endereço</h2>

                        </Box>

                        <CheckboxDialog
                            titleSection="Materiais"
                            hideAdd={false}
                            error={inputError.selectedMaterials}
                            messageError="Selecione o material *"
                            closeError={() => setInputError({
                                ...inputError,
                                ['selectedMaterials']: false,
                            })}
                            selectedArray={selectedMaterials}
                            setSelectedArray={setSelectedMaterials}
                            isLoading={isLoadingMaterials}
                            hasError={hasErrorMaterials}
                            onPress={getMaterials}
                            array={materials}
                            title="Selecionar Material"
                            confirm="Salvar"
                        />

                        <Box className="container-section">
                            {materials && materials.length > 0 && selectedMaterials && selectedMaterials.length > 0 && selectedMaterials.map((item, index) => (
                                <SelectedItem key={item.id}>
                                    <Box className="item-title">
                                        <p>{materials.find(value => value.id === item.id).nome}</p>
                                    </Box>

                                    <Box className="actions">
                                        <Tooltip title="Excluir" arrow>
                                            <IconButton onClick={() => handleConfirmDeleteMaterial(index)}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </SelectedItem>
                            ))}
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
