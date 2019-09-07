import Vue from 'vue';
import axios from 'axios';
import Bridge from '@/util/bridge'
import { judgeClient } from "@/util/methods.js";


import config from './config';

const { baseURL } = config;
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000;

axios.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        throw new Error(err)
    }
);

const $axios = {
    async postRequest(url, params = {}) {
        const platform = judgeClient();
        if (platform === 'IOS') {
            Bridge.callhandler('encryptionRequest', params, function (data) {
                let instance = axios({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url,
                    data
                });
                return instance;
            });
        } else {
            let data = {
                "appVersion": "ceshi.com.android@1.0.6",
                "deviceType": 1,
                "devicenId": "1123",
                "param": params,
                "userID": '1077513311572815872'
            };
            let instance = axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                url,
                data: data
            });
            return instance;
        }
    },
    async getRequest(url) {
        let instance = axios({
            method: 'get',
            url
        });
        return instance;
    }
};

export default $axios;
