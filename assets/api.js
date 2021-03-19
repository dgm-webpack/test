import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://unpkg.com/swiper/swiper-bundle.min.js',
    headers: { 'Content-Type': 'application/json' },
    timeout: 20000
  });

  // 此處的instance為我們create的實體
instance.interceptors.response.use(
    function (response) {
      // Do something with response data
        


      return response;
    },
    function (error) {
      if (error.response){
        switch (error.response.status) {
          case 404:
            console.log("你要找的頁面不存在")
            // go to 404 page
            break
          case 500:
            console.log("程式發生問題")
            // go to 500 page
            break
          default
            console.log(error.message)
        }
      } 
      if (!window.navigator.onLine) {
        alert("網路出了點問題，請重新連線後重整網頁");
        return;
      }
      return Promise.reject(error);
    }
  );

  export const userSignUp = (signUpData) => {
    return req("post", "/user/sign-in", signUpData)
  }

  //https://ithelp.ithome.com.tw/articles/10230336?sc=pt

