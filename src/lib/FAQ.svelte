<script>
  import { t } from '$lib/translations';
  import Accordion from './Accordion/Accordion.svelte';
  import AccordionItem from './Accordion/AccordionItem.svelte';
</script>

<section class="column">
  <h2><i aria-hidden="true">🤔</i>{$t('content.SECTION_FAQ')}</h2>
  <Accordion>
    <AccordionItem title={$t('content.QUESTION_1_QUESTION')}>
      {@html $t('content.QUESTION_1_ANSWER')}
    </AccordionItem>
    <AccordionItem title={$t('content.QUESTION_2_QUESTION')}>
      {@html $t('content.QUESTION_2_ANSWER')}
    </AccordionItem>
    <AccordionItem title={$t('content.QUESTION_3_QUESTION')}>
      {@html $t('content.QUESTION_3_ANSWER')}
    </AccordionItem>
    <AccordionItem title={$t('content.QUESTION_4_QUESTION')}>
      {@html $t('content.QUESTION_4_ANSWER')}
    </AccordionItem>
    <AccordionItem title={$t('content.QUESTION_5_QUESTION')}>
      {@html $t('content.QUESTION_5_ANSWER')}
    </AccordionItem>
    <AccordionItem title={$t('content.QUESTION_6_QUESTION')}>
      {@html $t('content.QUESTION_6_ANSWER')}
    </AccordionItem>
    <AccordionItem title={$t('content.QUESTION_7_QUESTION')}>
      {@html $t('content.QUESTION_7_ANSWER')}
    </AccordionItem>
  </Accordion>
</section>

<style lang="scss">
</style>
