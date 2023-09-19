import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import extractorSvelte from "@unocss/extractor-svelte";
import { defineConfig } from "unocss";

export default defineConfig({
  extractors: [extractorSvelte()],
  shortcuts: [
    {
      main:"w-full h-screen overflow-hidden flex justify-center flex-col text-center items-center",
      card: "px-10 py-16 border-yellow-50 border rounded-xl text-5xl w-40 h-56 flex items-center justify-center mx-5 my-5 bg-darkin"
    },
  ],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  theme: {
    colors: {
      darkin: "#8080bb30",
    },
  },
  rules: [
    [
      "glow",
      {
        "box-shadow": "0px 0px 5px 1px rgba(191, 201, 118, 1)",
      },
    ],
  ],
});
