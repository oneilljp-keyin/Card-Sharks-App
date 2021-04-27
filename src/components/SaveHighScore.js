import axios from "axios";
import { useEffect } from "react";
import publicIp from "public-ip";

function SaveHighScore(name, score) {

  useEffect(() => {
    sendToServer(name, score);
  }, [])

  const sendToServer = async () => {

    const d = new Date();
    var date = (d.getFullYear()) + "-" + 
               (d.getDate()).toString().padStart(2, '0') + "-" +
              ((d.getMonth()+1)).toString().padStart(2, '0');

    console.log(date)

    const getClientIp = async () => await publicIp.v4({
      fallbackUrls: [ "https://ifconfig.co/ip" ]
    });

    let formData = new FormData();
    formData.append("user_date",  date);
    formData.append("user_name",  name);
    formData.append("user_score", score);
    formData.append("user_ip_address", getClientIp);


    const response = await axios.post("https://johnny-o.net/card-sharks/high_scores.php", formData, {
      headers:{'Content-Type': 'application/json'}
    });

    console.log(response);
  }

};

export default SaveHighScore
