<script setup>
/*
Spinning coin CSS:

Copyright (c) 2023 by Michael Lai (https://codepen.io/keiwo/pen/ZONRgx)

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
        type:Number,
        required:true
    },
    xMax: {
        type:Number,
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

const EDGE_SEGMENTS = 24;
const edgeAngles = Array.from({length: EDGE_SEGMENTS}, (_, i) => i * (360 / EDGE_SEGMENTS));

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
    if(y.value < yMin || y.value > yMax - props.size || x.value < xMin || x.value > xMax - props.size) {
        moveCoin();
    }


})

</script>
<template>
  <div v-if="x > -1 && y > -1" @click="caught" class="coin" :style="{top:`${y}px`, left: `${x}px`, '--coin-size':`${props.size}px`}">
    <div class="tails"></div>
    <div class="heads"></div>
    <div v-for="(angle, i) in edgeAngles" :key="i" class="edge-segment" :class="{'edge-segment--dark': i % 2 === 0}"
         :style="{transform: `rotateZ(${angle}deg) translateX(calc(var(--coin-size) / 2)) rotateY(90deg)`}"></div>
  </div>
</template>

<style scoped lang="scss">
:root {
  --coin-size: 50px;
}
.coin{
	--coin-face: #ffd54a;
	--coin-edge: #c97f00;
	--coin-thickness: calc(var(--coin-size) * 0.14);
	width: var(--coin-size);
	height: var(--coin-size);
	position: absolute;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
	animation: spin 2.46s linear infinite;
  cursor: pointer;

	@keyframes spin{
		0%{
			transform: rotateY(0deg);
		}
		100%{
			transform: rotateY(360deg);
		}
	}
}

.tails,
.heads{
	background: radial-gradient(circle at 35% 30%, #fff6d8 0%, var(--coin-face) 45%, var(--coin-edge) 100%);
	position: absolute;
	border-radius: 50%;
	content: '';
	height: var(--coin-size);
	width: var(--coin-size);
	border: 1px solid var(--coin-edge);
	box-shadow:
		0 6px 10px rgba(0, 0, 0, 0.35),
		0 0 calc(var(--coin-size) * 0.3) rgba(255, 200, 0, 0.55),
		inset 0 0 0 calc(var(--coin-size) * 0.07) rgba(0, 0, 0, 0.12);
}

.tails{
	transform: translateZ(calc(var(--coin-thickness) / 2));
}

.heads{
	transform: translateZ(calc(var(--coin-thickness) / -2));
}

.edge-segment{
	position: absolute;
	top: 50%;
	left: 50%;
	width: var(--coin-thickness);
	height: calc(var(--coin-size) * 0.145);
	margin-left: calc(var(--coin-thickness) / -2);
	margin-top: calc(var(--coin-size) * -0.0725);
	background: var(--coin-edge);
}

.edge-segment--dark{
	background: color-mix(in srgb, var(--coin-edge) 78%, black);
}
</style>