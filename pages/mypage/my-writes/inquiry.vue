<script setup lang="ts">
import { useStore } from '~/stores/common';
import { CommonConstantType } from '~/ts/constants';
import { QuestionAndAnswer } from '~/ts/interfaces/QuestionAndAnswer';
import { api } from '~~/ts/api';

const route = useRoute();
const store = useStore()
// meta
definePageMeta({
    layout: 'page',
    title: '1:1 문의 내역'
});

const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

const list = ref<QuestionAndAnswer[]>([])

const commandList = ref(
    [{ name: "전체", selected: true, type: 0 },
    ])


onMounted(() => {
    initCommandList()
    loadList(1)
})

watch(() => store.commonConstants, (newConst, oldConst) => {
    if (newConst != null) {
        initCommandList()
    }
})

watch(() => store.profileInfo, (newConst, oldConst) => {
    if (newConst != null) {
        loadList(1)
    }
})

const loadList = (p_page: number) => {
    if (!store.profileInfo) {
        return
    }

    currentPage.value = p_page
    api.post(
        `/question-and-answer/list`, {
        take: TAKE_COUNT,
        page: p_page,
        question_type_list: commandList.value.find(it => it.selected)?.type != 0 ? [commandList.value.find(it => it.selected)?.type] : [],
        requester_id: store.profileInfo.id
    }
    )
        .then(response => {
            if (response.success) {
                list.value = response.data.items
                totalCnt.value = response.data.meta.totalCount
            }
        })
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    loadList(1)
}

const initCommandList = () => {
    if (store.commonConstants != null) {
        commandList.value = [{ name: "전체", selected: true, type: 0 }]
        const tmp = store.commonConstants.find(it => it.type == CommonConstantType.QuestionType)?.items
        tmp?.map(it => {
            commandList.value.push({ name: it.name, selected: false, type: it.id })
        })
    }
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadList(val)
}
</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1">
                <section class="flex flex-col flex-1">
                    <div class="flex flex-row items-center">
                        <p class="text-[18px] md:text-[30px] text-black font-bold">
                            1:1 문의 내역
                        </p>
                        <div class="flex-1" />
                        <BtnWithLA laName="las la-file-alt" text="1:1 문의하기"
                            :onClick="() => { navigateTo('/mypage/my-writes/inquiry-write') }" />
                    </div>
                    <div class="w-full mt-[30px] lg:mt-[70px]">
                        <el-dropdown class="w-full" trigger="click" @command="handleCommand">
                            <button class="dropdown-btn el-dropdown-link"
                                :class="commandList.find(it => it.selected) ? 'text-warmGray-900' : 'text-secondarynavy-300'">
                                <span>
                                    {{ commandList.find(it => it.selected)?.name || "전체" }}
                                </span>
                                <span>▼</span>
                            </button>
                            <template #dropdown>
                                <el-dropdown-menu v-for="(command, index) in commandList" :key="index">
                                    <el-dropdown-item :command="command.name">
                                        <button class="w-[300px] md:w-[690px] lg:w-[840px]">
                                            <span>
                                                {{ command.name }}
                                            </span>
                                        </button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <Line class="mt-[18px] border-b-[2px]" />
                    <div class="flex flex-row py-[20px] md:py-[24px] gap-x-[10px]">
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[98]">
                            분류
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[266]">
                            제목
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[142]">
                            등록일시
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[93]">
                            상태
                        </p>
                    </div>
                    <LineGray />
                    <div class="grid grid-cols-1">
                        <CardInquiry v-for="item in list" :item="item" />
                    </div>
                </section>

                <section class="flex flex-row justify-center mt-[100px] items-center">
                    <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background
                        layout="prev, jumper, next" :total="totalCnt" @current-change="handleCurrentChange" />
                    <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                        {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
                </section>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss">
.progress-tag-normal {
    @apply bg-secondaryNavy-100 text-[12px] text-[#FFFEF2] w-[82px] h-[24px] items-center justify-center rounded-[12px]
}

.progress-tag-on {
    @apply text-[12px] w-[82px] h-[24px] flex items-center justify-center rounded-[12px]
}
</style>