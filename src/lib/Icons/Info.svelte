<script>
  import tooltip from "../tooltip.js";

  export let title = '';
</script>

<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" use:tooltip={{ content: title }}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <circle cx="12" cy="12" r="9"></circle>
  <line x1="12" y1="8" x2="12.01" y2="8"></line>
  <polyline points="11 12 12 12 12 16 13 16"></polyline>
</svg>