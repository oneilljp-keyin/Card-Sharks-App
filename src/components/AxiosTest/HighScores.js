import React, { Component } from 'react';
import axios from './Axios';

export default class users extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Users: []
    };
  }

  getUsersData() {
    axios
        .get(``, {
          headers: {
            'Access-Control-Allow-Origin': 'true',
          }
        })
        .then(res => {
            const data = res.data
            console.log(data)

        })
        .catch((error) => {
            console.log(error)
        })

  }
  componentDidMount(){
      this.getUsersData()
  }

  render() {
    return (
      <div>
          
      </div>
    )
  }
}