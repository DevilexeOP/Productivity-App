import * as io from 'socket.io-client';
import Config from "react-native-config";

const socket = io.connect(Config.ROOT_URL, {
  transports: ['websocket'],
  jsonp: false,
});
export default socket;
