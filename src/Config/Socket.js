import * as io from 'socket.io-client';
import {ROOT_URL_KOYEB} from '@env';

const socket = io.connect(ROOT_URL_KOYEB);
export default socket;
