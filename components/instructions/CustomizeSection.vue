<script setup>
import {ref} from 'vue';
import ParametersTable from '~/components/instructions/ParametersTable.vue';
import UrlExample from '~/components/instructions/UrlExample.vue';

const props = defineProps({
  gameSlug: {
    type: String,
    required: true
  },
  secondParamExample: {
    type: String,
    default: 'showPlayAgain=true'
  },
  customizeUrl: {
    type: String,
    required: true
  },
  schemaUrl: {
    type: String,
    required: true
  },
  accent: {
    type: String,
    default: '#a3e635'
  }
});

const baseUrl = `https://mouse.techlit.tools/${props.gameSlug}`;
const singleExampleUrl = `${baseUrl}#timeLimit=120`;
const combinedExampleUrl = `${baseUrl}#timeLimit=120&${props.secondParamExample}`;
const allDefaultsUrl = `${baseUrl}#play`;

const activeTab = ref('builder');
</script>
<template>
  <section :style="{ '--accent': accent }">
    <div class="flex gap-6 border-b border-slate-200" role="tablist">
      <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'builder'"
          class="tab-button pb-3 font-semibold"
          :class="activeTab === 'builder' ? 'active text-slate-800' : 'text-slate-400 hover:text-slate-600'"
          @click="activeTab = 'builder'"
      >Link builder
      </button>
      <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'manual'"
          class="tab-button pb-3 font-semibold"
          :class="activeTab === 'manual' ? 'active text-slate-800' : 'text-slate-400 hover:text-slate-600'"
          @click="activeTab = 'manual'"
      >Build it yourself
      </button>
    </div>

    <div v-if="activeTab === 'builder'" role="tabpanel" class="mt-6 space-y-4 text-lg text-slate-600">
      <p>Yes! Game settings, such as the time limit, are set in the URL. Use this <a :href="customizeUrl">link builder</a> to
        set up your game. Customize the settings on the form, click "Share link", and copy the URL to share the game
        with your settings.</p>
    </div>

    <div v-else role="tabpanel" class="mt-6 space-y-4 text-lg text-slate-600">
      <p>Add settings after a <code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-base text-slate-700">#</code>,
        written as <code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-base text-slate-700">settingName=settingValue</code>.
        For example, this sets the time limit to 120 seconds:</p>
      <UrlExample :url="singleExampleUrl" />
      <p>Separate multiple parameters with <code
          class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-base text-slate-700">&amp;</code>:</p>
      <UrlExample :url="combinedExampleUrl" />
      <p>Any parameter you leave out uses its default value. For a link that plays with all defaults and skips this
        page entirely, use <code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-base text-slate-700">#play</code>
        on its own:</p>
      <UrlExample :url="allDefaultsUrl" />
      <ParametersTable class="mt-6 border-t border-slate-100 pt-6" :schema-url="schemaUrl" :accent="accent"/>
    </div>
  </section>
</template>
<style scoped>
.tab-button {
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 150ms, border-color 150ms;
}

.tab-button.active {
  border-color: var(--accent);
}

</style>
