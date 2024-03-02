<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import { EventStatus } from '~~/ts/constants';
import { Common } from '~~/ts/_utils/common';
import { IEvent } from '~/ts/interfaces/IEvent';

// meta
definePageMeta({
    layout: 'page',
    title: '이벤트'
});

const commandList = ref([{ name: "최신순", selected: true, order: "DESC", sortBy: "created_at" }])

const type = ref(1)

const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

const list = ref<IEvent[]>([])

onMounted(() => {
    loadList(1)
})

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadList(val)
}

const loadList = (p_page: number) => {
    currentPage.value = p_page
    api.get(
        `/homepage/event?page=${p_page}&take=${TAKE_COUNT}&order=${commandList.value.find(it => it.selected)?.order}&sortBy=${commandList.value.find(it => it.selected)?.sortBy}&enabled=true&status=${type.value}`
    )
        .then(response => {
            if (response.success) {
                list.value = response.data.items
                totalCnt.value = response.data.meta.totalCount
            }
        })
}

const onChangeTab = (p_type: number) => {
    type.value = p_type
    loadList(1)
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    loadList(1)
}

</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                이벤트
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루에서 진행하는 이벤트를 확인하세요.
            </p>

            <div class="flex flex-col lg:flex-row w-full md:w-[508px] mt-[30px] md:mt-[74px] items-center">
                <BtnEventTab text="진행중 이벤트" class="lg:flex-1 w-full max-w-[256px]" :selected="type == EventStatus.PROGRESS"
                    :onClick="() => { onChangeTab(EventStatus.PROGRESS) }" />
                <BtnEventTab text="종료된 이벤트" class="lg:flex-1 w-full max-w-[256px]" :selected="type == EventStatus.FINISHED"
                    :onClick="() => { onChangeTab(EventStatus.FINISHED) }" />
            </div>

            <section class="flex flex-col w-full mt-[65px] md:mt-[112px] lg:mt-[138px]">
                <div class="flex flex-row justify-between items-center">
                    <p class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-black font-bold">전체
                        {{ totalCnt }}개</p>
                    <!-- <div class="self-end">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <button class="dropdown-btn-small w-[120px] el-dropdown-link"
                                :class="commandList.find(it => it.selected) ? 'text-warmGray-900' : 'text-secondarynavy-300'">
                                <span>
                                    {{ commandList.find(it => it.selected)?.name || "마루 선택" }}
                                </span>
                                <span>▼</span>
                            </button>
                            <template #dropdown>
                                <el-dropdown-menu v-for="command in commandList" :key="command.name">
                                    <el-dropdown-item :command="command.name">{{ command.name }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div> -->
                </div>

                <Line class="mt-[10px]" />

                <div v-if="list.length > 0"
                    class="mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="(slide, index) in list" :key="slide.id" class="flex justify-center">
                        <CardEvent :item="slide" :index="index" :onClick="() => { navigateTo(`/service/event-detail?id=${slide.id}`) }" />
                    </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center pb-[90px]">
                    <i
                        class="las la-exclamation-circle text-[#FE5151] text-[28px] md:text-[83px] font-bold mt-[53px] md:mt-[90px]"></i>
                    <p
                        class="mt-[10px] md:mt-[37px] text-[13px] leading-[18px] md:text-[30px] md:leading-[40px] text-black font-bold">
                        {{ type == EventStatus.PROGRESS ? "진행중인 이벤트가 없습니다." : "종료된 이벤트가 없습니다." }}
                    </p>
                </div>
            </section>

            <section class="flex flex-row justify-center mb-[110px] items-center">
                <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background layout="prev, jumper, next"
                    :total="totalCnt" @current-change="handleCurrentChange" />
                <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                    {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>~/ts/interfaces/IEvent