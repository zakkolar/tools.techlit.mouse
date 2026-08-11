<script setup>
defineProps({
  question: {
    type: String,
    required: true
  }
});
</script>
<template>
  <details>
    <summary class="cursor-pointer font-display text-xl font-bold text-slate-800 sm:text-2xl">{{ question }}</summary>
    <div class="mt-4 space-y-4 text-lg text-slate-600 [&_a]:font-bold [&_a]:underline [&_a:hover]:no-underline">
      <slot></slot>
    </div>
  </details>
</template>
