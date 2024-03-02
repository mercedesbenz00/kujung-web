<script setup lang="ts">
import { initVeeValidate } from './ts/vee-validate';
import { api } from '~~/ts/api';
import { useStore } from '~/stores/common';
import { SESSION_PARAMS } from './ts/constants';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { Common } from './ts/_utils/common';

const store = useStore();

initVeeValidate();

onMounted(() => {
  getCommonConstants()
  getTagList()
  Common.getProfile()
  // TODO - 도메인 나온후
  Kakao.init('b3bb3da541b8beefb4dbd90da1f3eb41');

  IMP.init('imp26345382');
});

const getCommonConstants = async () => {
  api.get('/common-constant')
    .then(response => {
      store.setCommonConstants(response.data)
    })
}

const getTagList = async () => {
  api.get('/tag')
    .then(response => {
      store.setTagList(response.data.items)
    })
}

window.addEventListener('contextmenu', function (e) { 
  // do something here... 
  e.preventDefault(); 
}, false);

</script>

<template>
  <Html lang="ko">

  <Body class="antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>

  <loading v-if="store.isLoading" v-model:active="store.isLoading" :can-cancel="false" :is-full-page="true" />

  </Html>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
