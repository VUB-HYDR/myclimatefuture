# MyClimateFuture website

## How will I experience climate change?

👉 [MyClimateFuture.info](https://myclimatefuture.info)

This website is build with [SvelteKit](https://kit.svelte.dev/), [Layercake](https://layercake.graphics/) and [MeltUI](https://melt-ui.com/). Styling is currently a mix of [TailwindCSS](https://tailwindcss.com/) and plain CSS.

## Code Structure

- You find most of the configuration in `/src/config.js`. Please be aware that some parts need to be changed in the individual components as well.
- `/static/` holds fonts, favicons and the preview image.
- `/src/lib/` has all the components in it.
- `/data/` holds a [Jupyter Notebook](https://jupyter.org/) written in [Julia](https://julialang.org/) to convert the data from the CSV files to a single JSON file.
- The website loads the data from `/src/data/data.json`.

## Developing

```bash
bun run dev
```

## Building

```bash
bun run build
```
