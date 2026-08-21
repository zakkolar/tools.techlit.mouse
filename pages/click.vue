<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getParam, hashToParams, hasHashParams, PARAM_TYPES} from "~/utilities/UrlParams";
import Coin from "~/components/click/Coin.vue";
import {getMinutes, getSeconds} from "~/utilities/MinutesAndSeconds";
import Instructions from "~/components/instructions/Instructions.vue";
import {games} from "~/data/games";

const gameMeta = games.find(g => g.slug === 'click');

useHead({
  title: gameMeta.title,
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/images/click/coin.svg'
    }
  ]
})

enum GAME_STATES {LOADING, INSTRUCTIONS, READY, PLAYING, GAME_OVER}

const defaults = {
  coinSize: 100,
  timeLimit: 60,
  newCoinInterval: 0,
  startingCoins: 1,
  showPlayAgain: false,
  useSound: true,
  disableTouchScreen: false
}

// user settings
const coinSize = ref(defaults.coinSize),
    timeLimit = ref(defaults.timeLimit),
    newCoinInterval = ref(defaults.newCoinInterval),
    startingCoins = ref(defaults.startingCoins),
    showPlayAgain = ref(defaults.showPlayAgain),
    useSound = ref(defaults.useSound),
    disableTouchScreen = ref(defaults.disableTouchScreen),

    // internal data
    gameState = ref(GAME_STATES.LOADING),

    timeRemaining = ref(timeLimit.value),
    minutes = computed(() => getMinutes(timeRemaining.value)),
    seconds = computed(() => getSeconds(timeRemaining.value)),

    collectedCoins = ref(0),
    numCoins = ref(1),
    newCoinCounter = ref(0),

    xMax = ref(-1),
    yMax = ref(-1),
    xMin = ref(-1),
    yMin = ref(-1);

onMounted(() => {

  window.addEventListener('resize', updateBounds);
  window.addEventListener('hashchange', updateGameSettingsFromHash)

  updateBounds();
  updateGameSettingsFromHash();


  const touchEvents = [
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel'
  ];

  touchEvents.forEach(eventType => {
    document.addEventListener(eventType, (e) => {
      if (disableTouchScreen.value) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, {passive: false});
  });

})

function collectCoin() {
  collectedCoins.value++;
  playSound('coin');
}

function updateBounds() {
  xMax.value = window.innerWidth;
  xMin.value = 0;
  yMax.value = window.innerHeight;
  yMin.value = document.getElementById('coinCount')?.offsetHeight || 0;
}

function playSound(s: string) {
  if (useSound.value) {
    const sound = new Audio(`/sounds/${s}.mp3`)
    sound.play();
  }
}

function updateGameSettingsFromHash() {
  const params = hashToParams();
  // width and height of each coin in pixels
  coinSize.value = getParam(params, 'coinSize', PARAM_TYPES.INTEGER, defaults.coinSize);
  // initial time on the countdown timer
  timeLimit.value = getParam(params, 'timeLimit', PARAM_TYPES.INTEGER, defaults.timeLimit);
  // add a new coin every newCoinInterval seconds. set to 0 for no new coins
  newCoinInterval.value = getParam(params, 'newCoinInterval', PARAM_TYPES.INTEGER, defaults.newCoinInterval);
  // number of coins to start with on the screen
  startingCoins.value = getParam(params, 'startingCoins', PARAM_TYPES.INTEGER, defaults.startingCoins);
  // show the player a "play again" button after the game ends
  showPlayAgain.value = getParam(params, 'showPlayAgain', PARAM_TYPES.BOOLEAN, defaults.showPlayAgain);
  // play sound effects
  useSound.value = getParam(params, 'useSound', PARAM_TYPES.BOOLEAN, defaults.useSound);

  // disable any touch events
  disableTouchScreen.value = getParam(params, 'disableTouchScreen', PARAM_TYPES.BOOLEAN, defaults.disableTouchScreen);

  resetGame();

  gameState.value = hasHashParams() ? GAME_STATES.READY : GAME_STATES.INSTRUCTIONS;

}

function resetGame() {
  collectedCoins.value = 0;
  numCoins.value = startingCoins.value;
  timeRemaining.value = timeLimit.value;
}

function startGame() {
  resetGame();
  gameState.value = GAME_STATES.PLAYING;
  updateTimer();
}

function updateTimer() {
  if (gameState.value === GAME_STATES.PLAYING) {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
      if (newCoinInterval.value > 0) {
        newCoinCounter.value++;
        if (newCoinCounter.value === newCoinInterval.value) {
          numCoins.value++;
          newCoinCounter.value = 0;
        }
      }
      setTimeout(updateTimer, 1000);
    } else {
      gameState.value = GAME_STATES.GAME_OVER;
    }
  }

}

</script>
<template>
  <GameHud v-if="![GAME_STATES.GAME_OVER, GAME_STATES.INSTRUCTIONS].includes(gameState)" :minutes="minutes"
           :seconds="seconds" label="Coins"
           :count="collectedCoins" :accent="gameMeta.accent" counter-id="coinCount"/>

  <Instructions v-if="gameState === GAME_STATES.INSTRUCTIONS" :game="gameMeta"
                second-param-example="showPlayAgain=true"/>

  <StartScreen @start="startGame" v-if="gameState === GAME_STATES.READY" :title="gameMeta.title"
               :accent="gameMeta.accent" :accent-text-color="gameMeta.accentTextColor">
    {{ gameMeta.description }}
  </StartScreen>

  <EndScreen v-if="gameState === GAME_STATES.GAME_OVER" @play-again="startGame" :button="showPlayAgain"
             :accent="gameMeta.accent" :accent-text-color="gameMeta.accentTextColor">
    You collected {{ collectedCoins }} coin<span v-if="collectedCoins !== 1">s</span>!
  </EndScreen>

  <div class="game" v-if="gameState !== GAME_STATES.LOADING">
    <Coin v-if="gameState === GAME_STATES.PLAYING" v-for="coin of numCoins" :x-min="xMin" :x-max="xMax" :y-min="yMin"
          :y-max="yMax" :size="coinSize"
          @caught="collectCoin">
    </Coin>
  </div>
</template>

<style>

.game {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #AEE5FF;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23AEE5FF'/%3E%3Cstop offset='1' stop-color='%23028FFF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23AEE5FF'/%3E%3Cstop offset='1' stop-color='%231FB1FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;

}

</style>