import axios from 'axios'
import router from './router'

const sucess = res => res

const error = err => {
    if (401 === err.response.status) {   
        router.push({name: 'login', params: {naoAutorizado: "true"} })        
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(sucess, error)