<script setup>
import { computed } from 'vue';
import CustomizeSection from '~/components/instructions/CustomizeSection.vue';
import Faq from '~/components/instructions/Faq.vue';

const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  secondParamExample: {
    type: String,
    default: 'showPlayAgain=true'
  }
});

const playHref = computed(() => `/${props.game.slug}#play`);
const schemaUrl = computed(() => `/customize/${props.game.slug}.json`);
</script>
<template>
  <div class="teacher-instructions fixed inset-0 z-40 overflow-y-auto">
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
    <div class="relative mx-auto max-w-3xl px-4 py-10 sm:py-16">

      <section class="info-card relative w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl" :style="{ '--accent': game.accent }">
        <div class="absolute inset-x-8 top-0 h-2 -translate-y-1/2 rounded-full" :style="{ background: 'var(--accent)' }"></div>
        <div class="p-8 sm:p-10">
          <p class="font-display text-xl font-bold uppercase tracking-wide" :style="{ color: 'var(--accent)' }">{{ game.subtitle }}</p>
          <div class="mt-1 flex flex-wrap items-center justify-between gap-4">
            <h1 class="font-display text-4xl font-bold text-slate-800 sm:text-5xl">{{ game.title }}</h1>
            <a :href="playHref" class="play-button shrink-0 inline-block rounded-2xl px-8 py-3 font-display text-2xl font-bold shadow-md transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0" :class="game.accentTextColor === 'black' ? 'text-slate-800' : 'text-white'">Play</a>
          </div>
          <p class="mt-4 max-w-sm text-xl text-slate-600">{{ game.description }}</p>

          <div class="mt-8 divide-y divide-slate-100 border-t border-slate-100">
            <Faq class="py-6" question="Can I customize the game?">
              <CustomizeSection :game-slug="game.slug" :second-param-example="secondParamExample" :customize-url="game.customizeUrl" :schema-url="schemaUrl" :accent="game.accent" />
            </Faq>
            <Faq class="py-6" question="Is this privacy-friendly?">
              <p>Yes! This game runs entirely in your browser. No data is transmitted to me or any third parties.</p>
              <p>If you choose to customize the game, the URL parameters are all stored after the <code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-base text-slate-700">#</code>. This information is kept in the browser. It is not sent back to the server.</p>
            </Faq>
            <Faq class="py-6" question="Is this open-source?">
              <p>Yes! The source code is <a href="https://github.com/zakkolar/tools.techlit.mouse" target="_blank">here</a>.</p>
            </Faq>
            <Faq class="py-6" question="Who made this?">
              <p>My name is Zak Kolar and I'm an educator. See more information <a href="https://techlit.tools/about/" target="_blank">here</a>.</p>
            </Faq>
            <Faq class="py-6" question="Are there activities for other skills?">
              <p>Yes! Check out the collection <a href="https://techlit.tools/" target="_blank">here</a>.</p>
            </Faq>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
<style scoped>
.play-button {
  background: var(--accent);
}

.play-button:hover {
  background: color-mix(in srgb, var(--accent) 88%, black);
}

.play-button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent) 60%, black);
  outline-offset: 3px;
}

</style>
