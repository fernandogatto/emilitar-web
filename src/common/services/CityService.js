import Api from '../helpers/Api';

class CityService {
    getCities() {
        return Api.get(`/municipios`);
    }

    getCitiesByState(uf) {
        return Api.get(`/municipios/${uf}`);
    }
}

export default new CityService();
