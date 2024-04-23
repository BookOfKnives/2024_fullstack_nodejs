import { creatRequire } from "module";
const require = createRequire(import.meta.url);
const assert = require("assert");

const request = require("supertest");
import app from "../app.js";