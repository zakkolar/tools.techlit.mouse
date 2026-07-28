<script setup>
useHead({
  title: 'Mouse Practice Games'
})

const games = ref([
  {
    title: "Coin Chase",
    subtitle: "Click practice",
    description: "Click as many coins as you can before the time runs out.",
    page: "/click",
    customize: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/click.json",
    documentation: "https://docs.techlit.tools/mouse-games/click/",
    thumbnailPng: "/images/home/click-thumbnail.png",
    thumbnailWebp: "/images/home/click-thumbnail.webp",
    thumbnailAlt: "A glowing gold coin being clicked, against a dark starlit background",
    accent: "#FFC800"
  }, {
    title: "Apple Picker",
    subtitle: "Drag practice",
    description: "Drag as many apples to the basket as you can before the time runs out.",
    page: "/drag",
    customize: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/drag.json",
    documentation: "https://docs.techlit.tools/mouse-games/drag/",
    thumbnailPng: "/images/home/drag-thumbnail.png",
    thumbnailWebp: "/images/home/drag-thumbnail.webp",
    thumbnailAlt: "A red apple being dragged from a tree to a wooden crate",
    accent: "#5d922f"
  }, {
    title: "Scavenger Hunt",
    subtitle: "Scroll practice",
    description: "Scroll up and down to find the required items before time runs out.",
    page: "/scroll",
    customize: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/scroll.json",
    documentation: "https://docs.techlit.tools/mouse-games/scroll/",
    thumbnailPng: "/images/home/scroll-thumbnail.png",
    thumbnailWebp: "/images/home/scroll-thumbnail.webp",
    thumbnailAlt: "A cartoon rocket flying past planets and stars in a night sky",
    accent: "#28c2d1"
  }, {
    title: "Word Collector",
    subtitle: "Select practice",
    description: "Select as many words as you can before the time runs out.",
    page: "/select",
    customize: "https://customize.techlit.tools/#url=https://mouse.techlit.tools/customize/select.json",
    documentation: "https://docs.techlit.tools/mouse-games/select/",
    thumbnailPng: "/images/home/select-thumbnail.png",
    thumbnailWebp: "/images/home/select-thumbnail.webp",
    thumbnailAlt: "A line of text with one word highlighted in purple, with a text cursor",
    accent: "#8b5cf6"
  }
])
</script>
<template>
  <div id="home-bg" class="min-h-screen">
    <header class="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center sm:pt-20">
      <div class="accent-dashes mx-auto mb-5 flex w-fit gap-1.5">
        <span v-for="game of games" :key="game.title" class="h-1.5 w-8 rounded-full" :style="{ background: game.accent }"></span>
      </div>
      <h1 class="font-display text-4xl font-extrabold text-slate-800 sm:text-5xl">Mouse Practice Games</h1>
      <p class="mx-auto mt-4 max-w-xl text-lg text-slate-500">A playful set of games for practicing mouse and trackpad skills.</p>
      <nav class="mt-5 flex justify-center gap-4 text-slate-500">
        <a href="https://techlit.tools/about" class="hover:text-slate-700 hover:underline">About</a>
        <a href="https://docs.techlit.tools/mouse-games/privacy/" class="hover:text-slate-700 hover:underline">Privacy</a>
      </nav>
    </header>

    <main class="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-20 lg:grid-cols-2">
      <article v-for="game of games" :key="game.title" class="game-card group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl" :style="{ '--accent': game.accent }">
        <router-link :to="game.page" class="block overflow-hidden">
          <h2 class="sr-only">{{ game.title }} &mdash; {{ game.subtitle }}</h2>
          <picture>
            <source :srcset="game.thumbnailWebp" type="image/webp">
            <img :src="game.thumbnailPng" :alt="game.thumbnailAlt" class="block aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" width="1200" height="600" loading="lazy">
          </picture>
        </router-link>
        <div class="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <p class="flex-1 text-slate-600">{{ game.description }}</p>
          <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
            <router-link :to="game.page" class="play-button rounded-full px-6 py-2.5 font-display font-bold text-slate-800 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0">Play</router-link>
            <a class="link-action" :href="game.documentation">Documentation</a>
            <a class="link-action" :href="game.customize">Customize settings</a>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>
<style scoped>
#home-bg {
  background-color: #f8fafc;
  background-image: radial-gradient(circle, #e2e8f0 1.5px, transparent 1.5px);
  background-size: 28px 28px;
}

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

.link-action {
  @apply text-slate-500 hover:underline;
}

.link-action:hover {
  color: color-mix(in srgb, var(--accent) 70%, black);
}

.game-card {
  outline: 1px solid transparent;
}

.game-card:hover {
  outline-color: color-mix(in srgb, var(--accent) 35%, transparent);
}
</style>
