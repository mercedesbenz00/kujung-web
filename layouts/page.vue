<script lang="ts" setup>
import { useStore } from '~/stores/common';
import { ModalsContainer } from 'vue-final-modal'
const route = useRoute();
useHead({
    titleTemplate: () => `구정마루 ${route.meta.title ? '- ' + route.meta.title : ''}`,
    meta: [
        {
            property: 'og:title',
            content: `구정마루 ${route.meta.title ? '- ' + route.meta.title : ''}`
        },
        {
            property: 'og:description',
            content: `구정마루 - 30여년간 마루만 연구해온 친환경 바닥재 전문기업. 250여가지의 강마루, 온돌마루, 원목마루 자체 생산`
        }
    ]
});

const store = useStore();
const showNavbar = computed(() => store.showNavbar);
const lastScrollPosition = ref(0)

onMounted(() => {
    window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
})

window.onpopstate = function () {
    if (store.curModalIndicator) {
        store.curModalIndicator.close()
    }
};

const onScroll = () => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
    if (currentScrollPosition < 0) {
        return
    }
    // Here we determine whether we need to show or hide the navbar
    store.setshowNavbar(currentScrollPosition < lastScrollPosition.value)
    // Set the current scroll position as the last scroll position
    lastScrollPosition.value = currentScrollPosition

}

</script>
<template>
    <div class="bg-warmGray-400">
        <slot name="app-before" />
        <div id="app-before"></div>
        <div class="flex flex-col min-h-screen">
            <el-collapse-transition>
                <slot name="header">
                    <PageNavbar />
                </slot>
            </el-collapse-transition>
            <div class="flex-1 w-full flex flex-col">
                <div class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full overflow-hidden">
                    <slot />
                    <ModalsContainer />
                </div>
            </div>
            <slot name="footer">
                <PageFooter />
            </slot>
            <slot name="app-after" />
            <div id="app-after"></div>
        </div>
    </div>
</template>