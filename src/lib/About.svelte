<script>
  import LL from '$i18n/i18n-svelte';
</script>

<section class="column">
  <h2><i aria-hidden="true">📄</i>{$LL.SECTION_STUDY()}</h2>
  {@html $LL.STUDY_TEXT()}
</section>
