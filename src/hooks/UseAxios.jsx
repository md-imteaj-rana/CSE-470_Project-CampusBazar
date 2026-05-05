import React from 'react'
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://campusbazar-cse470.vercel.app'
})


const UseAxios = () => {
  return axiosInstance
}

export default UseAxios;
