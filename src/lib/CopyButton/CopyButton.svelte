<script>
  import { ID_COPY, ID_TEXT } from '$config';
  import { t } from '$lib/translations';
  import ClipboardJS from 'clipboard';
  import { onMount } from 'svelte';
  import tippy from 'tippy.js';
  import Copy from '../Icons/Copy.svelte';

  let copy_success = false;
  let timeout = undefined;
  let elButton;

  onMount(async () => {
    clearTimeout(timeout);
    const instance = tippy(elButton, { content: `Copied to clipboard`, trigger: 'manual', offset: [0, 10], showOnCreate: false, hideOnClick: false, placement: 'top' });
    const clipboard = new ClipboardJS(`#${ID_COPY}`, {
      // This is the node with the text
      target: () => document.getElementById(ID_TEXT),
    });
    clipboard.on('success', (e) => {
      e.clearSelection();
      instance.show();
      copy_success = true;
      timeout = setTimeout(() => {
        instance.hide();
        copy_success = false;
      }, 500);
    });
  });
</script>

<button
  bind:this={elButton}
  type="button"
  aria-live="polite"
  id={ID_COPY}
  class="copy-btn absolute flex items-center justify-center rounded-full text-accent hover:text-primary"
  class:copy_success
  aria-label={$t('content.BUTTON_COPY')}
  title={$t('content.BUTTON_COPY')}
  {...$$restProps}
>
  <Copy />
</button>

<style lang="scss">
  @import '../../styles/global.scss';

  .copy-btn {
    right: calc(var(--spacing-1) * 0.5);
    bottom: calc(var(--spacing-1) * 0.5);
    width: calc(var(--spacing-1) * 3);
    height: calc(var(--spacing-1) * 3);
    transition:
      background-color var(--transition),
      color var(--transition);

    &:hover,
    &:focus {
      &::after {
        background-color: var(--tertiary-color);
      }
    }

    &.copy_success {
      &::after {
        transform: scaleX(1.8) scaleY(1.8);
        opacity: 0;
        transition:
          transform var(--transition),
          opacity var(--transition);
      }
    }

    &::after {
      content: '';
      display: inline-block;
      height: 100%;
      width: 100%;
      border-radius: 100px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      background-color: var(--color-accent-light);
      transition:
        transform var(--transition),
        opacity var(--transition) 0.3s;
    }

    @include query($narrow) {
      right: calc(var(--spacing-1) * 1);
      bottom: calc(var(--spacing-1) * 1);
    }
  }
</style>
