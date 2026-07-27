<script setup>
defineProps({
    buttonText: {
        type: String,
        default: 'Start'
    },
    title: {
        type: String,
        default: 'Get ready'
    },
    accent: {
        type: String,
        default: '#a3e635'
    }
});

const emit = defineEmits(['start']);

function start() {
    emit('start');
}

</script>
<template>
    <ButtonScreen :title="title" :button-text="buttonText" :accent="accent" @button-press="start">
        <slot></slot>
    </ButtonScreen>
</template>