<script setup lang="ts">
import dayjs from 'dayjs';
import { Common } from '~/ts/_utils/common';
import { QuestionStatus } from '~/ts/constants';
import { QuestionAndAnswer } from '~/ts/interfaces/QuestionAndAnswer';
import { api } from '~~/ts/api';
import Swal from "sweetalert2";
const router = useRouter();

const route = useRoute();

// meta
definePageMeta({
    layout: 'page',
    title: '1:1 문의 내역'
});

const id = Number(route.query.id);
const info = ref<QuestionAndAnswer>()

onMounted(() => {
    loadInfo()
})

const loadInfo = () => {
    api.get(
        `/question-and-answer/${id}`
    )
        .then(response => {
            if (response.success) {
                info.value = response.data
            }
        })
}

const onDelete = () => {
    Swal.fire({
        title: "",
        html: "정말 삭제하시겠습니까?",
        // iconHtml: '<img src="/img/icons/error.svg">',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: `아니오`,
        confirmButtonText: '예',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            api.delete(
                `/question-and-answer/${id}`
            )
                .then(response => {
                    if (response.success) {
                        router.back()
                    }
                })
        }
    });

}

</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1 items-center">
                <section class="flex flex-col flex-1 w-full">
                    <div class="hidden lg:flex flex-row items-center">
                        <p class="text-[18px] md:text-[30px] text-black font-bold">
                            1:1 문의 내역
                        </p>
                        <div class="flex-1" />
                    </div>
                    <Line class="lg:mt-[40px] border-b-[2px]" />
                    <div class="flex flex-col px-[37px] lg:px-[5px] py-[15px] md:py-[20px]">
                        <p class="text-[18px] md:text-[24px] text-warmGray-900 font-bold">
                            [{{ info?.question_type_info.name }}] {{ info?.question_title }}
                        </p>
                        <p class="text-[11px] md:text-[12px] text-warmGray-900">
                            {{ dayjs(info?.created_at).format("YYYY년 MM월 DD일 HH:MM") }}
                        </p>
                    </div>
                    <LineGray />
                    <div class="flex flex-col px-[37px] lg:px-[10px] py-[15px] md:py-[20px]">
                        <p class="text-[13px] lg:text-[18px] text-warmGray-900 whitespace-pre-line">
                            {{ info?.question_content }}
                        </p>
                        <el-scrollbar class="mt-[24px] md:mt-[13px]">
                            <div class="flex flex-row">
                                <img :src="item.image_url" @click="() => { Common.onShowPreview(item.image_url) }"
                                    class="w-[110px] h-[90px] md:w-[170px] md:h-[140px] mr-[20px] object-cover"
                                    v-for="item in info?.questionImages" />
                            </div>
                        </el-scrollbar>
                    </div>
                    <LineGray class="mt-[50px] md:mt-[30px]" />
                    <div v-if="info?.answer_created_at">
                        <div class="flex flex-col px-[37px] lg:px-[5px] py-[15px] md:py-[20px]">
                            <p class="text-[18px] md:text-[24px] text-warmGray-900 font-bold">
                                A. {{ info.answer_title }}
                            </p>
                        </div>
                        <LineGray />
                        <div class="flex flex-col px-[37px] lg:px-[10px] py-[15px] md:py-[20px]">
                            <p class="text-[13px] lg:text-[18px] text-warmGray-900 whitespace-pre-line">
                                {{ info.answer_content }}
                            </p>
                            <el-scrollbar class="mt-[24px] md:mt-[13px]">
                                <div class="flex flex-row">
                                    <img :src="item.image_url" @click="() => { Common.onShowPreview(item.image_url) }"
                                        class="w-[110px] h-[90px] md:w-[170px] md:h-[140px] mr-[20px] object-cover"
                                        v-for="item in info.answerImages" />
                                </div>
                            </el-scrollbar>
                        </div>
                        <LineGray class="mt-[20px]" />
                    </div>
                </section>

                <div class="flex flex-row mt-[50px] md:mt-[35px] md:w-full">
                    <button class="hidden md:block text-[13px] text-white bg-primary-600 w-[122px] h-[40px] md:h-[40px]" @click="navigateTo('/mypage/my-writes/inquiry')">
                        목록
                    </button>
                    <div class="flex-1" />
                    <button v-if="info?.status == QuestionStatus.WAITING" @click="() => {
                        navigateTo(`/mypage/my-writes/inquiry-write?editId=${info?.id}`)
                    }"
                        class="text-[13px] text-black bg-warmGray-400 border border-secondaryNavy-500 w-[122px] h-[40px] md:h-[40px] mr-[8px]">
                        수정
                        <i class="las la-pen"></i>
                    </button>
                    <button class="text-[13px] text-white bg-secondaryNavy-500 w-[122px] h-[40px] md:h-[40px]"
                        @click="onDelete">
                        삭제
                        <i class="las la-trash"></i>
                    </button>
                </div>

                <button
                    class="md:hidden mt-[30px] md:mt-[50px] lg:mt-[60px] text-[15px] text-white bg-primary-600 w-[320px] md:w-[420px] h-[55px] md:h-[70px]">
                    목록
                </button>

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