<script setup>
defineProps({
    buttonText: {
        type: String,
        default: 'Play again'
    },
    title: {
        type: String,
        default: 'Game over'
    },
    button: {
        type: Boolean,
        default: true
    },
    accent: {
        type: String,
        default: '#a3e635'
    },
    accentTextColor: {
        type: String,
        default: 'white'
    }
})

const emit = defineEmits(['playAgain']);

function playAgain() {
    emit('playAgain');
}

</script>

<template>
  <ButtonScreen @button-press="playAgain" :button="button" :title="title" :button-text="buttonText" :accent="accent" :accent-text-color="accentTextColor">
      <slot></slot>
  </ButtonScreen>
</template>