import {app} from "./app";

app.listen(process.env.PORT || 5555, () => {
    console.log("Server on.")
});