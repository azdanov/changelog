import merge from "lodash/merge";
import isNil from "lodash/isNil";
import dotenv from "dotenv";

dotenv.config();

import prod from "./prod";
import staging from "./staging";
import local from "./local";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;
if (stage === "production") {
  envConfig = prod;
} else if (stage === "staging") {
  envConfig = staging;
} else {
  envConfig = local;
}

const config: {
  stage: string;
  databaseUrl: string;
  jwtSecret: string;
  port: number;
  logging: boolean;
} = merge(
  {
    stage,
    databaseUrl: process.env.DATABASE_URL ?? "",
    jwtSecret: process.env.JWT_SECRET ?? "",
    port: Number(process.env.PORT) || 5000,
    logging: false,
  },
  envConfig
);

Object.entries(config).forEach(([key, value]) => {
  if (isNil(value) || value === "") {
    throw new Error(`config error: ${key} is null or undefined`);
  }
});

export default config;
