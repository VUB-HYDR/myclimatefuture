<script>
  import { t } from '$lib/translations';
  import H2 from '$lib/ui/H2.svelte';
</script>

<section class="column">
  <H2 emoji="📄">{$t('content.SECTION_STUDY')}</H2>
  {@html $t('content.STUDY_TEXT')}
</section>
