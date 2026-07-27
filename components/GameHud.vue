<script setup>
defineProps({
    minutes: {
        type: [String, Number],
        required: true
    },
    seconds: {
        type: [String, Number],
        required: true
    },
    label: {
        type: String,
        required: true
    },
    count: {
        type: [String, Number],
        required: true
    },
    accent: {
        type: String,
        default: '#a3e635'
    },
    counterId: {
        type: String,
        default: undefined
    }
})
</script>

<template>
  <div class="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3 sm:p-4">
    <div class="hud-pill" :style="{ '--accent': accent }">
      <span>{{ minutes }}:{{ seconds }}</span>
    </div>
    <div :id="counterId" class="hud-pill" :style="{ '--accent': accent }">
      <span>{{ label }}: {{ count }}</span>
    </div>
  </div>
</template>

<style scoped>
.hud-pill {
  display: flex;
  align-items: center;
  gap: 0.4em;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  padding: 0.4em 0.9em;
  font-family: theme('fontFamily.display');
  font-weight: 700;
  font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  color: color-mix(in srgb, var(--accent) 55%, black);
  border: 2px solid var(--accent);
}
</style>
