import * as io from 'socket.io-client';
import {ROOT_URL_KOYEB} from '@env';

const socket = io.connect('http://192.168.29.155:8082', {
  transports: ['websocket'],
  jsonp: false,
});
export default socket;
