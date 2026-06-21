import dotenv from "dotenv";

dotenv.config();


const { default: app } = await import("./src/app.js");


const PORT = 3000;


app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`);

});