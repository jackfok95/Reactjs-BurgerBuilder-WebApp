import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-93aea.firebaseio.com/'
});

export default instance;


