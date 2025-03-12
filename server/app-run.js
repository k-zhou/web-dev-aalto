import app from "./app.js";

Deno.serve(
{
    cert: Deno.readTextFileSync("./cert/server-cert.pem"),
    key:  Deno.readTextFileSync("./cert/server-key.pem"),
}, 
app.fetch);
