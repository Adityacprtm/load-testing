import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
    stages: [
        { duration: "10s", target: 10 },
        { duration: "40s", target: 20 },
        { duration: "10s", target: 5 },
    ],
};

export default function () {
    let res = http.get("https://test.k6.io");
    check(res, { "status was 200": (r) => r.status == 200 });
    sleep(1);
}
