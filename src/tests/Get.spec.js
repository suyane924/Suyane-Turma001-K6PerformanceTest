import { example } from "../requests/example.request.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { group } from "k6";

const testes = new example();

export function handleSummary(data) {
  return {
    "./src/out/index.html": htmlReport(data),
  };
}

export default function () {
  group("GET", function () {
    testes.getK6();
  });
}
