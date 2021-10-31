import http from "k6/http";
import { sleep, check } from "k6";

const BASE_URL = "https://test-api.k6.io";

export let options = {
  vus: 5, // 2 user looping for 10 second
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<2000"],
  },
};

let headers = {
  headers: {
    Authorization: "Bearer TOKEN",
    "Content-type": "application/json",
  },
};

export default function () {
  let res = http.get(BASE_URL, headers);
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}
