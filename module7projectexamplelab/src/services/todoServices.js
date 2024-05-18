// create list of aps for generic referancing to other fkles e.g
import axios from "axios";
const api = "localhost:3000";

const getTodo = async () => {
  const response = await axios.get(`http://${api}/todos`);
  return response.data;
};

export { getTodo };
