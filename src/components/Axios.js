import axios from "axios";

const instance = axios.create({
  baseURL: "https://johnny-o.net/card-sharks/high_scores.php"
});

export default instance;