<script lang="ts" setup>
import { QuestionAndAnswer } from '~/ts/interfaces/QuestionAndAnswer';
import dayjs from 'dayjs';
import { QuestionStatus } from '~/ts/constants';


// props
const props = defineProps({
    item: {
        type: Object as PropType<QuestionAndAnswer>,
        default: null
    },
});

const onItemClick = () => {
    navigateTo(`/mypage/my-writes/inquiry-detail?id=${props.item.id}`)
}

</script>
<template>
    <div class="flex flex-row py-[20px] md:py-[24px] gap-x-[10px] md:gap-x-[20px] items-center cursor-pointer"
        @click="onItemClick()">
        <p class="text-[8px] md:text-[13px] lg:text-[18px] text-black text-center flex-[98]">
            {{ item.question_type_info.name }}
        </p>
        <p class="text-[8px] md:text-[13px] lg:text-[18px] text-black text-center flex-[266] line-clamp-2">
            {{ item.question_title }}
        </p>
        <p class="text-[8px] md:text-[13px] lg:text-[18px] text-black text-center flex-[142]">
            {{ dayjs(item?.requested_at).format("YYYY/MM/DD HH:MM") }}
        </p>
        <p class="text-[8px] md:text-[13px] lg:text-[18px] text-black text-center flex-[93]">
            {{ item.status == QuestionStatus.COMPLETED ? "답변완료" : item.status == QuestionStatus.WAITING ? "답변대기" : "답변보류" }}
        </p>
    </div>
    <LineGray />
</template>