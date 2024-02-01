import axios from 'axios';

//axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://kimmyungsa.us-east-2.elasticbeanstalk.com',//API baseURL
    timeout:1000,
    headers:{
        'Content-Type': 'application/json', //응답헤더, json 형식
    }

})

// 요청 인터셉터 추가
api.interceptors.request.use(
    (config) => {
      console.log('Request Interceptor - Config:', config);
      return config;
    },
    (error) => {
      console.error('Request Interceptor - Error:', error);
      return Promise.reject(error);
    }
  );
  
  // 응답 인터셉터 추가
 api.interceptors.response.use(
    (response) => {
      console.log('Response Interceptor - Response:', response);
      return response;
    },
    (error) => {
        console.error('Response Interceptor - Error:', error);
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        return Promise.reject(error);
    }
  );


export default api;