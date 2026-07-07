import { writeFileSync } from "node:fs";

const config = {
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
};

writeFileSync("env.js", `window.CAMPERFIX_ENV = ${JSON.stringify(config)};\n`);
