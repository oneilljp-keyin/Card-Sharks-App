import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/high_scores.php"
});

export default instance;