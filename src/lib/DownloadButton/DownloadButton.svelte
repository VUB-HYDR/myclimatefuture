<script>
  import { ID_GRAPH } from '$config';
  import { t } from '$lib/translations';
  import { CURRENT_VIS_HEIGHT, CURRENT_VIS_WIDTH, IMAGE_FILE_NAME } from '$store';
  import saveAs from 'file-saver';
  import * as htmlToImage from 'html-to-image';
  import { onMount } from 'svelte';
  import Download from '../Icons/Download.svelte';

  // The option to NOT actually save the image is for the automatic call in mount further down.
  function getGraphAsPNG(shouldSave = true) {
    const div = document.getElementById(ID_GRAPH);
    if (div) {
      htmlToImage.toBlob(div, { backgroundColor: '#ffffff', canvasWidth: $CURRENT_VIS_WIDTH * 2, canvasHeight: $CURRENT_VIS_HEIGHT * 2 }).then((blob) => {
        if (shouldSave) {
          if (window.saveAs) {
            window.saveAs(blob, $IMAGE_FILE_NAME);
          } else {
            saveAs(blob, $IMAGE_FILE_NAME);
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
  class="download-btn p-2 bg-accent transition-colors text-white rounded-md flex items-center justify-center gap-x-4 hover:bg-primary"
  on:click={getGraphAsPNG}
  aria-label={$t('content.BUTTON_DOWNLOAD_TITLE')}
  title={$t('content.BUTTON_DOWNLOAD_TITLE')}
>
  <span class="label">{$t('content.BUTTON_DOWNLOAD')}</span>
  <Download />
</button>

<style lang="scss">
  @import '../../styles/global.scss';

  button {
    @include query($medium) {
      grid-column: 2 / span 2;
    }
  }
</style>
