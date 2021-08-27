import CityService from '../../services/CityService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const CityOperations = {
    getCities: () => async () => {
        try {
            const response = await CityService.getCities();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    getCitiesByState: (uf) => async () => {
        try {
            const response = await CityService.getCitiesByState(uf);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default CityOperations;
