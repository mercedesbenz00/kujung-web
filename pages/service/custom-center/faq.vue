<script setup lang="ts">
const route = useRoute();
import { Faq } from '~/ts/interfaces/Faq';
import { api } from '~~/ts/api';

// meta
definePageMeta({
    layout: 'page',
    title: '자주 묻는 질문'
});

onMounted(() => {
    loadList()
})

const activeName = ref('1')

const list = ref<Faq[]>([])

const loadList = () => {
    api.get(
        `/homepage/faq?sortBy=created_at&orderBy=DESC`
    )
        .then(response => {
            if (response.success) {
                list.value = response.data.items
            }
        })
}
</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                자주 묻는 질문
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루 고객님들이 자주묻는 질문을 정리하였습니다.
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

            <section class="flex flex-col w-full mt-[25px] md:mt-[75px] lg:mt-[60px]">
                <div class="max-w-[1024px] w-full flex items-center justify-center mb-[110px]">
                    <div class="responsibility-collapse w-full px-[8px] max-w-[728px]">
                        <el-collapse v-model="activeName" class="" accordion>
                            <el-collapse-item :name="item.title" v-for="(item, index) in list" :key="index">
                                <template #title class="flex flex-col">
                                    <div class="flex flex-col py-[10px] md:py-[20px]">
                                        <div class="flex flex-row items-center md:items-center h-[38px] md:h-[58px]">
                                            <div
                                                class="w-[25px] md:w-[42px] h-[25px] md:h-[42px] flex items-center justify-center bg-primary-600 rounded-[50%]">
                                                <span class="text-center text-white text-[14px] md:text-[22px]">
                                                    {{ index + 1 }}
                                                </span>
                                            </div>
                                            <p
                                                class="flex-1 text-[17px] md:text-[22px] ml-[18px] font-bold leading-[22px] md:leading-[30px]">
                                                {{ item.question }}
                                            </p>
                                        </div>
                                    </div>
                                </template>
                                <template class="flex flex-col">
                                    <div class="p-[20px] md:p-[40px] bg-[#FFFEF2] rounded-[10px]">
                                        <div :innerHTML="item.answer.replaceAll('background-color: rgb(250, 250, 250)', '')"></div>
                                    </div>
                                </template>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>