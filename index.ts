import { Server} from "./Server";
import * as Config from "./lib/Config";
let server: Server = new Server;

server.init(Config.port);