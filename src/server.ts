import { serverHttp } from "./app";

serverHttp.listen(3000, () => {
  console.log("server is running on Port: 3000");
});
