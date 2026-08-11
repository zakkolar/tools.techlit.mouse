<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  schemaUrl: {
    type: String,
    required: true
  },
  accent: {
    type: String,
    default: '#a3e635'
  }
});

const fields = ref(null);
const loadFailed = ref(false);

onMounted(async () => {
  try {
    const schema = await $fetch(props.schemaUrl);
    fields.value = schema.fields || [];
  } catch (e) {
    loadFailed.value = true;
  }
});
</script>
<template>
  <section :style="{ '--accent': accent }">
    <h3 class="font-display text-xl font-bold text-slate-800">Available parameters</h3>

    <p v-if="loadFailed" class="mt-4 text-slate-500">Couldn't load the parameter list. Please try refreshing the page.</p>
    <p v-else-if="!fields" class="mt-4 text-slate-500">Loading parameter details&hellip;</p>

    <div v-else class="mt-4 overflow-x-auto">
      <table class="w-full min-w-[36rem] border-collapse text-left">
        <thead>
          <tr class="border-b-2 border-slate-100 text-sm uppercase tracking-wide text-slate-400">
            <th class="py-2 pr-4 font-display">Setting</th>
            <th class="py-2 pr-4 font-display">Key</th>
            <th class="py-2 pr-4 font-display">Type</th>
            <th class="py-2 pr-4 font-display">Default</th>
            <th class="py-2 font-display">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field of fields" :key="field.key" class="border-b border-slate-100 align-baseline text-base leading-6 last:border-0">
            <td class="py-2.5 pr-4 font-semibold text-slate-700">{{ field.label }}</td>
            <td class="py-2.5 pr-4 font-mono text-sm font-semibold text-sky-600">{{ field.key }}</td>
            <td class="py-2.5 pr-4 text-slate-500">{{ field.type }}</td>
            <td class="py-2.5 pr-4 font-mono text-sm text-emerald-600">{{ String(field.default) }}</td>
            <td class="py-2.5 text-slate-600">{{ field.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
