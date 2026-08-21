<script setup>
/*
3D Spinning Coin Using CSS Animation

Copyright (c) 2026 by Helkyle (https://codepen.io/HelKyle/pen/vEEOwyg)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

import {onMounted} from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 50
  },
  xMin: {
    type: Number,
    required: true
  },
  xMax: {
    type: Number,
    required: true
  },
  yMin: {
    type: Number,
    required: true
  },
  yMax: {
    type: Number,
    required: true
  }
});

const x = ref(-1), y = ref(-1);

function moveCoin() {
  x.value = ((props.xMax - props.xMin - props.size) * Math.random()) + props.xMin;
  y.value = ((props.yMax - props.yMin - props.size) * Math.random()) + props.yMin;
}

const emit = defineEmits(['caught']);

function caught() {
  moveCoin();
  emit('caught');
}

onMounted(() => {
  moveCoin();
})

watch([() => props.yMin, () => props.yMax, () => props.xMin, () => props.xMax], (values) => {
  const [yMin, yMax, xMin, xMax] = values;
  if (y.value < yMin || y.value > yMax - props.size || x.value < xMin || x.value > xMax - props.size) {
    moveCoin();
  }


})

</script>
<template>
  <div class="coin"  v-if="x > -1 && y > -1" @click="caught" :style="{top:`${y}px`, left: `${x}px`, '--coin-size':`${props.size}px`}">
    <div class="coin-side">
      <div class="coin-side-inner"></div>
    </div>
    <div class="coin-body">
      <div class="front">
        <img src="/images/click/coin.svg">
      </div>
      <div class="front-background"></div>
      <div class="back">
        <img src="/images/click/coin.svg">
      </div>
      <div class="back-background"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.coin {
  --coin-size: 128px;
  --coin-thickness: calc(var(--coin-size) / 16);
  --animation-duration: 2s;
  --coin-side-color: #F99300;
  position: absolute;
  cursor: pointer;
}

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

svg {
  width: var(--coin-size);
  height: var(--coin-size);
}

.coin-body {
  will-change: transform;
  height: var(--coin-size);
  width: var(--coin-size);
  transform-style: preserve-3d;
  position: relative;
  animation: spin var(--animation-duration) linear infinite;
}

.front {
  height: var(--coin-size);
  width: var(--coin-size);
  position: absolute;
  transform: rotateY(0deg) translateZ(calc(var(--coin-thickness) * -1));
}

.back {
  height: var(--coin-size);
  width: var(--coin-size);
  position: absolute;
  transform: rotateY(180deg) translateZ(calc(var(--coin-thickness) * -1));
}

.front-background {
  height: var(--coin-size);
  width: var(--coin-size);
  background: var(--coin-side-color);
  position: absolute;
  transform: rotateY(0deg) translateZ(calc(var(--coin-thickness) * -1));
  border-radius: 50%;
  backface-visibility: hidden;
}

.back-background {
  height: var(--coin-size);
  width: var(--coin-size);
  background: var(--coin-side-color);
  position: absolute;
  transform: rotateY(180deg) translateZ(calc(var(--coin-thickness) * -1));
  border-radius: 50%;
  backface-visibility: hidden;
}

.coin-side {
  height: var(--coin-size);
  width: var(--coin-size);
  position: absolute;
  transform-style: preserve-3d;
  animation: spin var(--animation-duration) linear infinite;
}

.coin-side-inner {
  height: var(--coin-size);
  width: calc(var(--coin-thickness) * 2);
  transform: translateX(calc(var(--coin-size) * 0.5 - var(--coin-thickness))) rotateY(90deg);
  background: var(--coin-side-color);
}
</style>