<script>
  import vub from './vub_logo.svg';
</script>

<div class="page-head">
  <a href="https://www.vub.be/" target="_blank" rel="noopener noreferrer" title="Vrije Universiteit Brussel">
    <img src={vub} alt="Vrije Universiteit Brussel" />
  </a>
</div>

<style lang="scss">
  .page-head {
    width: 100vw;
    text-align: right;

    a {
      display: inline-block;
      margin-top: var(--spacing-1);
      margin-right: calc(var(--spacing-1) * 2);

      img {
        width: 150px;
      }
    }
  }
</style>
