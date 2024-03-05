<script>
  import LL from '$i18n/i18n-svelte';
  import Accordion from './Accordion/Accordion.svelte';
  import AccordionItem from './Accordion/AccordionItem.svelte';
</script>

<section class="column">
  <h2><i aria-hidden="true">🤔</i>{$LL.SECTION_FAQ()}</h2>
  <Accordion>
    <AccordionItem title={$LL.QUESTION_1_QUESTION()}>
      {@html $LL.QUESTION_1_ANSWER()}
    </AccordionItem>
    <AccordionItem title={$LL.QUESTION_2_QUESTION()}>
      {@html $LL.QUESTION_2_ANSWER()}
    </AccordionItem>
    <AccordionItem title={$LL.QUESTION_3_QUESTION()}>
      {@html $LL.QUESTION_3_ANSWER()}
    </AccordionItem>
    <AccordionItem title={$LL.QUESTION_4_QUESTION()}>
      {@html $LL.QUESTION_4_ANSWER()}
    </AccordionItem>
    <AccordionItem title={$LL.QUESTION_5_QUESTION()}>
      {@html $LL.QUESTION_5_ANSWER()}
    </AccordionItem>
    <AccordionItem title={$LL.QUESTION_6_QUESTION()}>
      {@html $LL.QUESTION_6_ANSWER()}
    </AccordionItem>
    <AccordionItem title={$LL.QUESTION_7_QUESTION()}>
      {@html $LL.QUESTION_7_ANSWER()}
    </AccordionItem>
  </Accordion>
</section>

<style lang="scss">
</style>
