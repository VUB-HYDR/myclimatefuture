<script>
  import { ID_GRAPH } from '$config';
  import LL from '$i18n/i18n-svelte';
  import { CURRENT_VIS_HEIGHT, CURRENT_VIS_WIDTH, IMAGE_FILE_NAME } from '$store';
  import { saveAs } from 'file-saver';
  import * as htmlToImage from 'html-to-image';
  import { onMount } from 'svelte';
  import Download from '../Icons/Download.svelte';

  let file;
  IMAGE_FILE_NAME.subscribe((value) => {
    file = value;
  });
  let width;
  CURRENT_VIS_WIDTH.subscribe((value) => {
    width = value;
  });
  let height;
  CURRENT_VIS_HEIGHT.subscribe((value) => {
    height = value;
  });

  // The option to NOT actually save the image is for the automatic call in mount further down.
  function getGraphAsPNG(shouldSave = true) {
    const div = document.getElementById(ID_GRAPH);
    if (div) {
      htmlToImage.toBlob(div, { backgroundColor: '#ffffff', canvasWidth: width * 2, canvasHeight: height * 2 }).then((blob) => {
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

<button type="button" class="download-btn" on:click={getGraphAsPNG} aria-label={$t('content.BUTTON_DOWNLOAD_TITLE')} title={$t('content.BUTTON_DOWNLOAD_TITLE')}>
  <span class="label">{$t('content.BUTTON_DOWNLOAD')}</span>
  <Download />
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

    &:hover,
    &:focus {
      background-color: var(--primary-color);
    }

    @include query($medium) {
      grid-column: 2 / span 2;
    }
  }
</style>
