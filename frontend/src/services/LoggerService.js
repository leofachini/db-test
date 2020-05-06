import axios from 'axios';

const LoggerService = {
  
  uploadLogFile: (file) => {
    const URL = 'http://localhost:3001/log';
    const formData = new FormData();

    formData.append('file', file);
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return axios.post(URL, formData, config);
  }
};

export default LoggerService;
