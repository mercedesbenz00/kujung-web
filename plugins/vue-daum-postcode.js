import VueDaumPostcode from "vue-daum-postcode/src" // 여기 경로가 바뀝니다.

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(VueDaumPostcode);
})
