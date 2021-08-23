import axios from 'axios';

import Api from '../helpers/Api';

class PhysicalPersonService {
    getAddressByCep(cep) {
        return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    }

    listPhysicalPeople() {
        return Api.get(`/pessoas-fisicas`);
    }

    getPhysicalPersonById(id) {
        return Api.get(`/pessoas-fisicas/${id}`);
    }

    getStatusMilitaryEnlistment() {
        return Api.get(`/pessoas-fisicas/alistamento/status`);
    }

    getOptions() {
        return Api.get(`/opcoes/pessoas-fisicas`);
    }

    createPhysicalPerson(data) {
        return Api.post(`/pessoas-fisicas`, data);
    }

    updatePhysicalPersonById(id, data) {
        return Api.put(`/pessoas-fisicas/${id}`, data);
    }

    deletePhysicalPersonById(id) {
        return Api.delete(`/pessoas-fisicas/${id}`);
    }
}

export default new PhysicalPersonService();
