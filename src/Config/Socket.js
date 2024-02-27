import * as io from "socket.io-client";
import {ROOT_URL} from "./Constants";

const socket = io.connect(ROOT_URL);
export default socket;