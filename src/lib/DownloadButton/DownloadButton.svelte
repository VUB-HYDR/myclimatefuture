<script>
  import * as htmlToImage from 'html-to-image';
  import { toBlob } from 'html-to-image';
  import { IMAGE_FILE_NAME, CURRENT_VIS_WIDTH, CURRENT_VIS_HEIGHT } from '../../stores.js';
  import { LABEL_DOWNLOAD_BUTTON, ID_GRAPH, ARIA_DOWNLOAD_BUTTON } from '../../config.js';
  import Download from "../Icons/Download.svelte";
  import { saveAs } from 'file-saver';
  import { onMount } from "svelte";

  let file;
  IMAGE_FILE_NAME.subscribe(value => { file = value; });
  let width;
  CURRENT_VIS_WIDTH.subscribe(value => { width = value; });
  let height;
  CURRENT_VIS_HEIGHT.subscribe(value => { height = value; });

  // The option to NOT actually save the image is for the automatic call in mount further down.
  function getGraphAsPNG(shouldSave = true) {
    const div = document.getElementById(ID_GRAPH);
    if (div) {
      htmlToImage.toBlob(div, { backgroundColor: '#ffffff', canvasWidth: width * 2, canvasHeight: height * 2 })
        .then((blob) => {
          if (shouldSave) {
            if (window.saveAs) {
              window.saveAs(blob, file);
            } else {
              saveAs(blob, file);
            }
          }
        });
    }
  }

  onMount(async () => {
    // Because htmlToImage might have a problem with WOFF/WOFF2 font files
    // which results in blank text areas, we render the image without saving it.
    // This seems to be a quick fix for now.
    // https://github.com/bubkoo/html-to-image/issues/203#issuecomment-952866941
    getGraphAsPNG(false);
  });
</script>

<button
  type="button"
  class="download-btn"
  on:click="{getGraphAsPNG}"
  aria-label={ ARIA_DOWNLOAD_BUTTON }
  title={ ARIA_DOWNLOAD_BUTTON }
>
  <span class="label">{ LABEL_DOWNLOAD_BUTTON }</span> <Download />
</button>

<style lang="scss">
@import '../../styles/global.scss';

button {
  @include button-reset();
  transition: background-color var(--transition);
  background-color: var(--color-accent);
  color: var(--text-color-invert);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;

  .label {
    margin-right: var(--spacing-1);
  }

  &:hover, &:focus {
    background-color: var(--primary-color);
  }

  @include query($medium) {
    grid-column: 2 / span 2;
  }
}
</style>