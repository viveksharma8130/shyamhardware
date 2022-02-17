import { Environment } from "./env";

export const ProdEnvironment:Environment = {
    db_url:'mongodb+srv://shyamhardwareappusr:33550112@shyamhardwareappusr@shyamhardware.qkrfh.mongodb.net/shyamhardwareapp?retryWrites=true&w=majority',
    jwt_secret:'prodSecret',
    site_url:'https://master.shyamhardware.app/'
}