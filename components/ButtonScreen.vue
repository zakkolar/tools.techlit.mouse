<script setup>
defineProps({
    buttonText: String,
    title: String,
    button: {
        type: Boolean,
        default: true
    },
    accent: {
        type: String,
        default: '#a3e635'
    }
})

const emit = defineEmits(['buttonPress']);

function buttonPress() {
    emit('buttonPress');
}

</script>
<template>
  <div class="absolute inset-0 z-30 flex items-center justify-center p-4">
    <div
        class="relative w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl"
        :style="{ '--accent': accent }"
    >
      <div class="absolute inset-x-8 top-0 h-2 -translate-y-1/2 rounded-full" :style="{ background: 'var(--accent)' }"></div>
      <h1 class="font-display text-4xl font-bold text-slate-800">{{ title }}</h1>
      <div class="mt-3 text-xl text-slate-600">
        <slot></slot>
      </div>
      <button
          v-if="button"
          class="button-screen-cta mt-6 block w-full rounded-2xl p-4 font-display text-3xl font-bold text-slate-800 shadow-md transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md"
          @click="buttonPress"
      >{{ buttonText }}</button>
    </div>
  </div>
</template>

<style scoped>
.button-screen-cta {
  background: var(--accent);
}

.button-screen-cta:hover {
  background: color-mix(in srgb, var(--accent) 88%, black);
}

.button-screen-cta:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent) 60%, black);
  outline-offset: 3px;
}
</style>
