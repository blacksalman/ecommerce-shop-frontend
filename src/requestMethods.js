import axios from "axios";

// export const BASE_URL = 'http://localhost:5000';
export const BASE_URL = 'https://ecommerce-shop-api-cupa.onrender.com'; // host is render
// export const BASE_URL = 'https://ecommercebackend-tguy.onrender.com/api';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2YwMDU1NTE5ZGRkYTk3MzM5YmZmYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODEyNjY5OCwiZXhwIjoxNjU4Mzg1ODk4fQ.KYSBgurZC24t9gPPhMsRhv0jxooBRniHC9hg5ZD54MM";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentUser).accessToken;

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token: `Bearer ${TOKEN}`}
});
