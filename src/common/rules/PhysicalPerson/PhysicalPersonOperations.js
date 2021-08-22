import PhysicalPersonService from '../../services/PhysicalPersonService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const PhysicalPersonOperations = {
    getAddressByCep: (cep) => async () => {
        try {
            const response = await PhysicalPersonService.getAddressByCep(cep);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    listPhysicalPeople: () => async () => {
        try {
            const response = await PhysicalPersonService.listPhysicalPeople();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    getPhysicalPersonById: (id) => async () => {
        try {
            const response = await PhysicalPersonService.getPhysicalPersonById(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    getStatusMilitaryEnlistment: () => async () => {
        try {
            const response = await PhysicalPersonService.getStatusMilitaryEnlistment();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    createPhysicalPerson: (data) => async () => {
        try {
            const response = await PhysicalPersonService.createPhysicalPerson(data);

            Toast.showSuccess('Pessoa Física criada com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    updatePhysicalPersonById: (id, data) => async () => {
        try {
            const response = await PhysicalPersonService.updatePhysicalPersonById(id, data);

            Toast.showSuccess('Pessoa Física atualizada com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    deletePhysicalPersonById: (id) => async () => {
        try {
            const response = await PhysicalPersonService.deletePhysicalPersonById(id);

            Toast.showSuccess('Pessoa Física excluída com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default PhysicalPersonOperations;
