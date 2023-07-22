import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Counter } from "k6/metrics";

export const getDuration = new Trend('GET', true);

export default class example {
  constructor() {
    this.baseUrl = "https://test.k6.io";
  }

  getK6() {
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const OK = 200;

    const res = http.get(`${this.baseUrl}`, params);
    sleep(1);

    getDuration.add(res.timings.duration);

    check(res, {
      "get - status 200": () => res.status === OK,
    });
  }
}
