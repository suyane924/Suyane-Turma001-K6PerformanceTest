import  Example  from "../requests/Example.request.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { group } from "k6";

const example = new Example();

export function handleSummary(data) {
  return {
    "./src/output/index.html": htmlReport(data),
  };
}

export default function () {
  group("GET", function () {
    example.getK6();
  });
}
