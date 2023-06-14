import axios from 'axios'

const api = {
    getWordInfo: async (word) => {
        return await axios.post('http://localhost:3000/getWordInfo', {word})
    }
}

export default api