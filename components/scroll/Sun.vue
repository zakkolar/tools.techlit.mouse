<script setup>
const props = defineProps({
    height: {
        required: true
    }
})
</script>

<template>
  <div class="sun" :style="`--height: ${height}`">
    <div class="halo halo-outer"></div>
    <div class="halo halo-inner"></div>
    <div class="core"></div>
  </div>
</template>

<style scoped>
    .sun {
        --sun-color: #ffd841;

        width: var(--height);
        height: var(--height);
        pointer-events: none;
    }

    .halo {
        position: absolute;
        border-radius: 50%;
        background: var(--sun-color);
        pointer-events: none;
        filter: blur(calc(var(--height) * 0.12));
    }

    .halo-outer {
        inset: -45%;
        opacity: 0.16;
    }

    .halo-inner {
        inset: -20%;
        opacity: 0.3;
    }

    .core {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: var(--sun-color);
        pointer-events: auto;
    }
</style>