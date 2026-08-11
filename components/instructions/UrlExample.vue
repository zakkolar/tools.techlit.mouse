<script setup>
import { computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const parsed = computed(() => {
  const hashIndex = props.url.indexOf('#');
  const base = props.url.slice(0, hashIndex);
  const hash = props.url.slice(hashIndex + 1);

  const params = hash.split('&').map(segment => {
    const eqIndex = segment.indexOf('=');
    if (eqIndex === -1) {
      return { key: segment, value: null };
    }
    return { key: segment.slice(0, eqIndex), value: segment.slice(eqIndex + 1) };
  });

  return { base, params };
});
</script>
<template><pre class="overflow-x-auto whitespace-pre rounded-xl bg-slate-800 px-4 py-3 font-mono text-base text-slate-100"><span class="text-slate-500">{{ parsed.base }}</span><span>#</span><template v-for="(param, i) in parsed.params" :key="i"><span v-if="i > 0">&amp;</span><span class="font-semibold text-sky-300">{{ param.key }}</span><template v-if="param.value !== null">=<span class="text-emerald-300">{{ param.value }}</span></template></template></pre></template>
