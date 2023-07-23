import axios from 'axios';

class IdeasAPI {
    #API_URL = 'api/ideas'

    getIdeas() {
        return axios.get(this.#API_URL);
    }

    createIdea(data) {
        return axios.post(this.#API_URL, data);
    }

    updateIdea(id, data) {
        return axios.put(`${this.#API_URL}/${id}`, data);
    }

    deleteIdea(id) {
        const username = localStorage.getItem('username') || '';
        return axios.delete(`${this.#API_URL}/${id}`, {
            data: {
                username,
            },
        }); 
    }
}

export default new IdeasAPI();