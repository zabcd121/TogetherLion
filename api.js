import Axios from 'axios';
import {makeUseAxios} from 'axios-hooks';
import {API_HOST} from './Constants';

export const axiosInstance = Axios.create({
  baseURL: API_HOST,
});
