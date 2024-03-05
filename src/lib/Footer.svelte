<script>
  import { ADVISORY_BOARD } from '$config';
  import { t } from '$lib/translations';
  import huberlin from './Logos/Huberlin-logo.svg';
  import imp from './Logos/IMP_ML_1CS_4CP_CLEAR SPACE.svg';
  import pik from './Logos/PIK_A_RGB.png';
  import stc from './Logos/STC_Logo.svg';
  import ca from './Logos/ca_logo.svg';
  import vub from './Logos/vub_logo.svg';
</script>

<footer class="column">
  <h2><i aria-hidden="true">👩‍🔬</i>{$t('content.SECTION_BOARD')}</h2>
  <ul class="page-board">
    {#each ADVISORY_BOARD as [person, link, affiliation]}
      <li><a href={link} target="_blank" rel="noopener noreferrer author">{person}</a>, {$t(`content.${affiliation}`)}</li>
    {/each}
  </ul>
  <div class="page-logos">
    <a href="https://www.vub.be/" target="_blank" rel="noopener noreferrer" title="Vrije Universiteit Brussel"><img src={vub} alt="Vrije Universiteit Brussel" /></a>
    <a href="https://climateanalytics.org/" target="_blank" rel="noopener noreferrer" title="Climate Analytics"><img src={ca} alt="Climate Analytics" /></a>
    <a href="https://www.imperial.ac.uk/" target="_blank" rel="noopener noreferrer" title="Imperial College London"><img src={imp} alt="Imperial College London" /></a>
    <a href="https://www.hu-berlin.de/en" class="hu" target="_blank" rel="noopener noreferrer" title="Humboldt University in Berlin"><img src={huberlin} alt="Humboldt University in Berlin" /></a>
    <a href="https://www.pik-potsdam.de/en" target="_blank" rel="noopener noreferrer" title="Potsdam Institute for Climate Impact Research"><img src={pik} alt="Potsdam Institute for Climate Impact Research" /></a>
    <a href="https://www.savethechildren.org/" target="_blank" rel="noopener noreferrer" title="Save the Children"><img src={stc} alt="Save the Children" /></a>
  </div>
  <p>{$t('content.VUB_INTEREST')} <a href="https://www.vub.be/en/programmes" target="_blank" rel="noopener noreferrer">{$t('content.VUB_INTEREST_LINK')}</a></p>
</footer>

<style lang="scss">
  @import '../styles/global.scss';

  .page-board {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: var(--size-vertical-inner-gap);

    li:not(:last-child) {
      margin-bottom: calc(var(--spacing-1) / 2);
    }
  }

  .page-logos {
    display: grid;
    margin: 0 calc(var(--spacing-1) * 2);
    grid-column-gap: calc(var(--spacing-1) * 2);
    grid-row-gap: calc(var(--spacing-1) * 2);
    align-items: center;
    justify-items: center;
    margin-bottom: calc(var(--size-vertical-outer-gap) * 1.5);
    grid-template-columns: repeat(2, 1fr);

    @include query($narrow) {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: calc(var(--spacing-1) * 2);
      grid-row-gap: calc(var(--spacing-1) * 2);
    }

    @include query($medium) {
      grid-template-columns: repeat(6, 1fr);
    }

    a {
      width: 100%;

      &.hu {
        width: 70%;
      }

      img {
        width: 100%;
      }
    }
  }
</style>
