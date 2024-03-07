<script>
  import { t } from '$lib/translations';
  import Chevron from '$lib/Icons/Chevron.svelte';
  import { createAccordion, melt } from '@melt-ui/svelte';
  import { slide } from 'svelte/transition';
  import H2 from '$lib/ui/H2.svelte';

  const {
    elements: { content, item, trigger, root },
    helpers: { isSelected },
  } = createAccordion({
    defaultValue: 'item-1',
  });

  const items = [
    {
      question: $t('content.QUESTION_1_QUESTION'),
      answer: $t('content.QUESTION_1_ANSWER'),
    },
    {
      question: $t('content.QUESTION_2_QUESTION'),
      answer: $t('content.QUESTION_2_ANSWER'),
    },
    {
      question: $t('content.QUESTION_3_QUESTION'),
      answer: $t('content.QUESTION_3_ANSWER'),
    },
    {
      question: $t('content.QUESTION_4_QUESTION'),
      answer: $t('content.QUESTION_4_ANSWER'),
    },
    {
      question: $t('content.QUESTION_5_QUESTION'),
      answer: $t('content.QUESTION_5_ANSWER'),
    },
    {
      question: $t('content.QUESTION_6_QUESTION'),
      answer: $t('content.QUESTION_6_ANSWER'),
    },
    {
      question: $t('content.QUESTION_7_QUESTION'),
      answer: $t('content.QUESTION_7_ANSWER'),
    },
  ].map((item, id) => ({ ...item, id: String(id) }));
</script>

<section class="column">
  <H2 emoji="🤔">{$t('content.SECTION_FAQ')}</H2>
  <div>
    {#each items as { id, question, answer }, i}
      <div use:melt={$item(id)} class="overflow-hidden transition-colors">
        <h2 class="flex" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <button use:melt={$trigger(id)} class="flex flex-1 cursor-pointer items-center justify-between bg-white px-5 py-5 text-base font-medium leading-none text-black transition-colors hover:text-accent focus:!ring-0 focus:outline-none focus-visible:text-accent" class:border-t={i !== 0} class:border-t-neutral-300={i !== 0}>
            <span itemprop="name">{question}</span>
            <div class="transition-transform" class:rotate-180={$isSelected(id)}>
              <Chevron />
            </div>
          </button>
        </h2>
        {#if $isSelected(id)}
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer" class="content overflow-hidden text-sm text-neutral-600" use:melt={$content(id)} transition:slide>
            <div itemprop="text" class="px-5 py-4">
              {@html answer}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>
