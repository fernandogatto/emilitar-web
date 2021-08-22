import axios from 'axios';

class PhysicalPersonService {
    getAddressByCep(cep) {
        return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    }

    listPhysicalPeople() {
        return axios.get(`/pessoas-fisicas`);
    }

    getPhysicalPersonById(id) {
        return axios.get(`/pessoas-fisicas/${id}`);
    }

    getStatusMilitaryEnlistment() {
        return axios.get(`/pessoas-fisicas/alistamento/status`);
    }

    createPhysicalPerson(data) {
        return axios.post(`/pessoas-fisicas`, { data });
    }

    updatePhysicalPersonById(id, data) {
        return axios.put(`/pessoas-fisicas/${id}`, { data });
    }

    deletePhysicalPersonById(id) {
        return axios.delete(`/pessoas-fisicas/${id}`);
    }
}

export default new PhysicalPersonService();
