import { Server } from "./server";

let server = new Server().app;

let port =  process.env.PORT || 5100;

server.listen(port, () => {
    console.log(`Shyam Hardware : PORT ${port}`);
});


