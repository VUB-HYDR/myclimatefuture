# MyClimateFuture website
## How will I experience climate change?

👉 [MyClimateFuture.info](https://myclimatefuture.info)

This website is build with [SvelteKit](https://kit.svelte.dev/). See their [docs](https://kit.svelte.dev/docs) to find out more. Some components are adapted from [Carbon Design System](https://github.com/carbon-design-system/carbon-components-svelte).

## Code Structure
- You find most of the configuration in `/src/config.js`. Please be aware that some parts need to be changed the individual components as well.
- `/static/` holds fonts, favicons and the preview image.
- `/src/lib/` has all the components in it.
- `/data/` holds a [Jupyter Notebook](https://jupyter.org/) written in [Julia](https://julialang.org/) to convert the data from the CSV files to a single JSON file.
- The website loads the data from `/src/data/data.json`.
- `/src/styles/` has all the global styling.
- `/assets/` has the source files for the favicon and the preview image.

## Common use cases
### Changing the output text
The text has parts in `/src/config.js`, `/src/utils.js` and `/src/lib/Text/Text.svelte`.

### Adding items to the FAQ
The questions are located in `/src/lib/FAQ.svelte`

### Updating the data
The data is located in `/src/data/data.json`. Use the Jupyter Notebook in `/data/` to generate a new JSON file. Copy that JSON file to `/src/data/data.json`. You will probably need to change some variables in `/src/config.js` if you have new risks or a longer time range.

## Developing
```bash
npm run dev
```

## Building
```bash
npm run build
```
