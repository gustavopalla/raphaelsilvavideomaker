import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // `npm run build` chama o OpenNext; ele roda o build do Next por aqui (evita recursão).
  buildCommand: "next build",
};
