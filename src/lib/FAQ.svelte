<script>
  import Accordion from "./Accordion/Accordion.svelte";
  import AccordionItem from "./Accordion/AccordionItem.svelte";
</script>

<section class="column">
  <h2><i aria-hidden="true">🤔</i>Frequently asked questions</h2>
	<Accordion>
    <AccordionItem title="How did you come to these findings? What is the science behind it?">
      <p>A team of climate researchers led by the Vrije Universiteit of Brussels used 5 sources of data: newly-generated global-scale simulations of climate impacts across six extreme event categories; life expectancy data from the United Nations World Population Prospects; global mean temperature scenarios compiled in support of the Intergovernmental Panel on Climate Change’s (IPCC) Special Report on Global Warming of 1.5 degrees Celsius; gridded population reconstructions and projections; and country-scale cohort size data provided by the Wittgenstein Centre’s Human Capital Data Explorer. The detailed methods and results of this analysis are included in a publication in the renowned journal <a href="https://www.science.org/doi/10.1126/science.abi7339" target="_blank" rel="noopener noreferrer">Science</a>, published in October 2021.</p>
      <p>The research calculates the exposure of an average person to climate impacts across their lifetime in 178 countries, 11 regions and the globe, then compares different age groups to calculate conservative estimates of lifetime extreme event occurrence as a consequence of climate change.</p>
    </AccordionItem>
    <AccordionItem title="But it’s not really surprising, given the way the climate crisis is evolving? What is new about these findings?">
      <p>The new study published in <a href="https://www.science.org/doi/10.1126/science.abi7339" target="_blank" rel="noopener noreferrer">Science</a> and the accompanying report by the NGO <a href="https://resourcecentre.savethechildren.net/library/born-climate-crisis-why-we-must-act-now-secure-childrens-rights"target="_blank" rel="noopener noreferrer">Save the Children</a> for the first time clearly outline how big the impact is likely to be if we don’t act now and how millions of children in low- and middle- income countries and communities will be harder hit.</p>
    </AccordionItem>
    <AccordionItem title="Is it too late to act? What needs to happen?">
      <p>It’s not too late, but we need to act now and reduce our global greenhouse gas emissions to net-zero as quickly as possible.</p>
    </AccordionItem>
    <AccordionItem title="What do these global warming scenarios mean?">
      <p>1.5°C: The Paris Agreement commits countries to hold warming ‘well below’ 2°C and to ‘pursue efforts’ to limit global warming to 1.5°C above pre-industrial levels. Here we use a 1.5°C compatible scenario that gives about a 50% chance of staying below 1.5°C warming over the course of the century and results in warming slightly below 1.5°C in 2100.</p>
      <p>Climate promises: Current climate pledges put us on a path of 1.9°C to 3.0°C warming by 2100. Current policies put us on a path of 2.1°C to 3.9°C warming by 2100. In this tool, we employ a scenario that puts us on a path towards 2.4°C warming by 2100, which corresponds to the best estimate of where the current climate pledges will lead to. See <a target="_blank" rel="noopener noreferrer" href="https://climateactiontracker.org/global/cat-thermometer/">here for more</a> info on the link between climate action and resulting global warming. DISCLAIMER: these numbers represent the status on 18/10/2021 and are expected to change as countries announce new pledges.</p>
      <p>High warming: In this tool, we define high warming as a scenario where global mean temperatures increase in a linear way to 3.5°C by 2100.</p>
      <p>All scenarios are described in this study are published in <a href="https://www.science.org/doi/10.1126/science.abi7339" target="_blank" rel="noopener noreferrer">Science</a>.</p>
    </AccordionItem>
    <AccordionItem title="Why do you calculate increases relative to a person living in a world without climate change?">
      <p>We provide increases relative to a world without climate change because this allows us to make more meaningful calculations without having a strong dependency on the definitions of extreme events. For this tool, we want people of any age to get a comparison – recognising that people from every generation are experiencing more exposure to extreme events. Comparisons between age groups is also possible – and was done in our study.</p>
    </AccordionItem>
    <AccordionItem title="Where can I get more information?">
      <p>The new study published in <a href="https://www.science.org/doi/10.1126/science.abi7339" target="_blank" rel="noopener noreferrer">Science</a> and the accompanying report by the NGO <a href="https://resourcecentre.savethechildren.net/library/born-climate-crisis-why-we-must-act-now-secure-childrens-rights"target="_blank" rel="noopener noreferrer">Save the Children</a> provide the technical details to understand the results shown on this website. For further enquiries, you are welcome to send an email to <a href="mailto:myclimatefuture@vub.be">Wim Thiery</a>.</p>
    </AccordionItem>
    <AccordionItem title="Why can’t I share my results on Instagram and TikTok?">
      <p>We are working to improve functionality of this site – for now you can download the image yourself and then share.</p>
    </AccordionItem>
  </Accordion>
</section>

<style lang="scss">

</style>
