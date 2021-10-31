/*
 * Smoke test is a regular load test, configured for minimal load.
 * You want to run a smoke test as a sanity check every time you write a new script or modify an existing script.
 */

import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
    vus: 2, // 2 user looping for 30 second
    duration: "10s",

    thresholds: {
        http_req_duration: ["p(99)<1000"], // 99% of requests must complete below 1s
    },
};

const BASE_URL = "https://test-api.k6.io";
const USERNAME = "TestUser";
const PASSWORD = "SuperCroc2020";

export default () => {
    // login
    let loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USERNAME,
        password: PASSWORD,
    });

    check(loginRes, {
        "logged in successfully": (resp) => resp.json("access") !== "",
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json("access")}`,
        },
    };

    // GET object by
    let myObjects = http.get(`${BASE_URL}/my/crocodiles/`, authHeaders).json();
    check(myObjects, { "retrieved crocodiles": (obj) => obj.length > 0 });

    sleep(1);
};
