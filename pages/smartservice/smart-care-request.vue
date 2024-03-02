<script setup lang="ts">
import { FileCategoryType, SCREEN_WIDTH } from '~~/ts/constants';
import { useFileDialog } from '@vueuse/core'
import { VueDaumPostcodeCompleteResult } from "vue-daum-postcode";
import { api, uploadFiles } from '~/ts/api';
import SweetAlert from '~/ts/sweet-alert';
import { Common } from '~/ts/_utils/common';
import { useStore } from '~/stores/common';

const route = useRoute();
const store = useStore();

// meta
definePageMeta({
    layout: 'page',
    title: '스마트 케어 서비스 신청'
})

onMounted(() => {

})
const { files, open: openFileDialog, reset } = useFileDialog()

const serviceKnownFrom = ref("")
const name = ref("")
const phone = ref("")
const address = ref("")
const addressDetail = ref("")
const zonecode = ref("")
const desiredServices = ref<string[]>([])
const floorType = ref("")
const areaRange = ref("")
const time = ref("")


const isOpen = ref(false);
export interface ISelectedFile {
    file: File,
    url: string
}
const selectedFileList = ref<ISelectedFile[]>([])

onMounted(() => {
    if (store.profileInfo?.phone) {
        phone.value = store.profileInfo?.phone
    }
})

watch(files, async (newFiles, oldFiles) => {
    for (var i = 0; i < (newFiles?.length || 0); i++) {
        const tmp = newFiles?.item(i)
        if (tmp) {
            selectedFileList.value.push({ file: tmp, url: URL.createObjectURL(tmp) })
        }
    }
}
)

watch(() => store.profileInfo, (newConst, oldConst) => {
    if (newConst != null) {
        phone.value = store.profileInfo?.phone
    }
})
const onDeleteFile = (index: number) => {
    selectedFileList.value.splice(index, 1)
}

function onDaumloaded() {
}

function onDaumComplete(newResult: VueDaumPostcodeCompleteResult) {
    isOpen.value = false;
    zonecode.value = newResult.zonecode
    address.value = newResult.address
}

const onRequest = async () => {
    if (!serviceKnownFrom.value
        || !name.value
        || !name.value
        || !phone.value
        || !address.value
        || !addressDetail.value
        || !zonecode.value
        || desiredServices.value.length == 0
        || !floorType.value
        || !areaRange.value
        || !time.value
        || selectedFileList.value.length == 0) {
        SweetAlert.openAlert(
            '필수정보들을 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    const fileArr: Array<File> = []
    selectedFileList.value.map(it => {
        fileArr.push(it.file)
    })
    const fileRes = await uploadFiles(fileArr, FileCategoryType.SmartCare, "n")

    const images: Array<any> = [];
    fileRes.map((it: any) => {
        images.push({
            "image_url": it.Location
        })
    })

    const res = await api.post(`/homepage/smartcare-service`, {
        "name": name.value,
        "know_from": serviceKnownFrom.value,
        "phone": phone.value,
        "addr": address.value,
        "addr_sub": addressDetail.value,
        "zonecode": zonecode.value,
        "desired_services": desiredServices.value,
        "current_floor": floorType.value,
        "area_range": areaRange.value,
        "contact_time": time.value,
        "smartcareServiceImages": images
    }
    )

    if (res.success) {
        navigateTo('#complete')
    }
}

</script>

<template>
    <div class="flex flex-col pt-[55px] md:pt-[80px] lg:md:pt-[126px]">
        <section class="w-full flex relative">
            <img src="/img/smartservice/smart_care_request_banner.png"
                class="w-full h-[400px] md:h-[600px] object-cover block" />
            <div class="absolute left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center">
                <p
                    class="text-[24px] leading-[36px] md:text-[34px] text-white font-bold mt-[10px] md:mt-[16px] lg:mt-[27px]">
                    스마트 케어 서비스 상담지
                </p>
                <p
                    class="md:hidden mx-[20px] text-center text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-white mt-[26px] md:mt-[36px] lg:mt-[25px] break-keep">
                    '스마트케어'는 '이사 없이, 지금 집  그대로' 살면서 <br />
                    마루 철거 및 마루 재시공, 보수가 가능한 구정마루만의 특별한 마루케어서비스 입니다.<br />
                    (신축,구축 전체 리모델링에는 해당되지 않으며 전체 리모델링시에는 대리점으로 문의주시기 바랍니다.)
                </p>
                <p
                    class="hidden md:flex mx-[30px] text-center text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-white mt-[26px] md:mt-[36px] lg:mt-[25px] break-keep">
                    '스마트케어'는 '이사 없이, 지금 집  그대로' 살면서  마루 철거 및 마루 재시공, 보수가 가능한 구정마루만의 특별한 마루케어서비스 입니다.<br />
                    (신축,구축 전체 리모델링에는 해당되지 않으며 전체 리모델링시에는 대리점으로 문의주시기 바랍니다.)
                </p>
            </div>
        </section>

        <div v-if="route.hash != '#complete'" class="flex flex-col">
            <section class="w-full bg-white flex flex-col">
                <div class="max-w-[1280px] w-full flex flex-col self-center relative items-center">
                    <span
                        class="mt-[48px] lg:mt-[107px] mr-[20px] lg:mr-[125px] text-[11px] leading-[15px] text-warmGray-600 self-end">
                        HOME <i class="las la-angle-right"></i>
                        스마트 마루 케어<i class="las la-angle-right"></i>
                        <span class="text-[#1A1A1A] font-bold"> 스마트 마루 케어 서비스</span>
                    </span>

                    <div class="w-full ml-[-1000px] mr-[-1000px] h-[30px] bg-primary-400 mt-[74px] lg:mt-[120px]">
                    </div>

                    <p
                        class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black font-bold mt-[93px] lg:mt-[72px] mx-[25px]">
                        구정마루 '스마트케어' 상담지
                    </p>
                    <p
                        class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-black text-center mt-[50px] lg:mt-[33px] mx-[25px]">
                        ‘스마트케어'는 '이사 없이, 지금 집  그대로' 살면서<br />
                        마루 철거 및 마루 재시공, 보수가 가능한 구정마루만의 특별한 마루케어서비스 입니다.<br />
                        (신축,구축 전체 리모델링에는 해당되지 않으며 전체 리모델링시에는 대리점으로 문의주시기 바랍니다.)
                    </p>

                    <p
                        class="text-[18px] leading-[24px] md:text-[24px] md:leading-[36px] text-black text-center font-bold mt-[93px] lg:mt-[72px] mx-[15px] whitespace-pre-line">
                        구정마루 스마트케어란?{{ SCREEN_WIDTH > 600 ? "" : "\n" }} 스마트케어 과정을 영상으로 먼저 만나보세요!
                    </p>
                    <div class="px-[15px] lg:px-[210px] w-full mt-[50px] mb-[110px] md:mb-[50px] relative">
                        <iframe :src="Common.getYoutubeUrl('s0G226uBY3g')" class="w-full h-[220px] md:h-[560px] "
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen />
                    </div>
                </div>
            </section>


            <section class="w-full flex flex-row relative justify-center">
                <div class="flex flex-col flex-1 max-w-[1024px]">
                    <div
                        class="mt-[30px] md:mt-[80px] md:max-w-[726px] lg:max-w-[512px] w-full flex flex-col relative px-[8px] gap-y-[50px] md:gap-y-[80px]">
                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 01</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                스마트케어 서비스를 어떻게 알게 되셨나요?
                            </p>
                            <div class="mt-[10px] md:mt-[30px] kujung-radio-vertical">
                                <el-radio-group v-model="serviceKnownFrom">
                                    <el-radio :label="'블로그/SNS를 보고'">블로그/SNS를 보고</el-radio>
                                    <el-radio :label="'인터넷 검색을 통해서'">인터넷 검색을 통해서</el-radio>
                                    <el-radio :label="'대리점 또는 인테리어 소개로'">대리점 또는 인테리어 소개로</el-radio>
                                    <el-radio :label="'주변소개로'">주변소개로</el-radio>
                                    <el-radio :label="'기타'">기타</el-radio>
                                </el-radio-group>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 02</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                성함을 입력 해주세요.
                            </p>
                            <div class="mt-[10px] md:mt-[30px]">
                                <input type="text" class="form-box1 w-full" v-model="name" placeholder="본인의 성함을 입력해주세요." />
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 03</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                상담받으실 연락처를 입력 해주세요.
                            </p>
                            <div class="mt-[10px] md:mt-[30px]">
                                <input type="text" class="form-box1 w-full" :readonly="store.profileInfo?.phone"
                                    v-model="phone" placeholder="연락처를 입력해주세요." />
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 04</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                스마트케어를 진행할 고객님의 주소를 남겨주세요.
                            </p>
                            <div class="mt-[10px] md:mt-[30px]">
                                <div class="flex flex-col w-full">
                                    <div class="flex w-full justify-between items-center">
                                        <input type="text" class="form-box1" name="address" placeholder="주소를 검색해주세요."
                                            v-model="zonecode" readonly autocomplete="off" />
                                        <button type="button" class="button-1" @click="isOpen = !isOpen">주소검색</button>
                                    </div>
                                    <template v-if="isOpen">
                                        <VueDaumPostcode @complete="onDaumComplete" @load="onDaumloaded" />
                                    </template>
                                </div>
                                <div class="flex flex-col w-full mt-[15px]">
                                    <div class="flex w-full justify-between items-center">
                                        <input type="text" class="form-box1" v-model="address" name="addressDetail" readonly
                                            placeholder="" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="flex flex-col w-full mt-[15px]">
                                    <div class="flex w-full justify-between items-center">
                                        <input type="text" class="form-box1" v-model="addressDetail" name="addressDetail"
                                            placeholder="상세주소를 입력해주세요" autocomplete="off" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 05</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                희망하시는 서비스는 무엇인가요?
                            </p>
                            <div class="mt-[10px] md:mt-[30px]">
                                <div class="kujung-checkbox-vertical">
                                    <el-checkbox-group v-model="desiredServices" :max="3">
                                        <el-checkbox :label="'스마트케어1'" class="mb-[20px] md:mb-0 flex">
                                            <p
                                                class="w-[280px] md:w-[720px] whitespace-pre-wrap text-[13px] md:text-[18px]">
                                                <b>스마트케어1</b> -
                                                부분보수 및 교체
                                                서비스{{ SCREEN_WIDTH > 600 ? "" : "\n" }}<span
                                                    class="text-[11px] md:text-[15px]">(누수 및 기타 사유로
                                                    부분만 공사를 희망합니다)</span>
                                            </p>
                                        </el-checkbox>
                                        <el-checkbox :label="'스마트케어2'" class="mb-[20px] md:mb-0">
                                            <p
                                                class="w-[280px] md:w-[720px] whitespace-pre-wrap text-[13px] md:text-[18px]">
                                                <b>스마트케어2</b> -
                                                마루리모델링 서비스{{
                                                    SCREEN_WIDTH > 600 ? "" : "\n" }}<span class="text-[11px] md:text-[15px]">
                                                    (지금집 그대로 '이사없이' 마루교체를
                                                    희망합니다)</span>
                                            </p>
                                        </el-checkbox>
                                        <el-checkbox :label="'기타'">
                                            <p class="text-[13px] md:text-[18px]">기타</p>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 06</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                스마트케어가 필요한 부위의 사진을 올려주세요.
                            </p>
                            <div class="mt-[10px] md:mt-[30px]">
                                <div class="flex flex-row items-center">
                                    <p
                                        class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-black font-bold">
                                        사진 첨부 (최대 6장 까지 가능)
                                    </p>
                                    <button type="button" class="button-1 ml-[20px]" style="height:40px"
                                        @click="openFileDialog()">파일선택</button>
                                </div>
                            </div>
                            <div class="mt-[10px] md:mt-[30px]">
                                <p class="text-[13px] leading-[18px] text-secondaryNavy-300">
                                    (용량 : 20mb, 첨부가능한 파일 : jpeg, jpg, png, webp, gif)
                                </p>
                            </div>
                            <div class="grid grid-cols-3">
                                <div v-for="(item, index) in selectedFileList"
                                    class="relative w-[100px] h-[68px] md:w-[150px] md:h-[100px] mr-[px] md:mr-[24px] mt-[24px]">
                                    <img :src="item.url" class="w-full h-full object-cover" />
                                    <button type="button" @click="() => { onDeleteFile(index) }"
                                        class="absolute top-[-5px] right-[-5px] bg-[red] w-[17px] h-[17px] rounded-[50%] items-center justify-center flex">
                                        <i class="las la-times text-[12px] font-bold text-white"></i>
                                    </button>
                                </div>
                            </div>
                            <LineGray class="mt-[30px]" />
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 07</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                현재 시공되어 있는 바닥은 무엇인가요?
                            </p>
                            <div class="mt-[10px] md:mt-[30px] kujung-radio-vertical">
                                <el-radio-group v-model="floorType">
                                    <el-radio :label="'장판'">장판</el-radio>
                                    <el-radio :label="'마루'">마루</el-radio>
                                    <el-radio :label="'타일'">타일</el-radio>
                                    <el-radio :label="'잘 모르겠음'">잘 모르겠음.</el-radio>
                                </el-radio-group>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 08</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                고개님의 평형대를 남겨주세요.
                            </p>
                            <div class="mt-[10px] md:mt-[30px] kujung-radio-vertical">
                                <el-radio-group v-model="areaRange">
                                    <el-radio :label="'원룸 또는 10평대'">원룸 또는 10평대</el-radio>
                                    <el-radio :label="'20~30평대'">20~30평대</el-radio>
                                    <el-radio :label="'40~50평대'">40~50평대</el-radio>
                                    <el-radio :label="'60평대 이상'">60평대 이상</el-radio>
                                    <el-radio :label="'기타'">기타</el-radio>
                                </el-radio-group>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <div class="bg-primary-400 h-[30px] w-[80px] flex justify-center items-center rounded-r-[15px]">
                                <p class="text-[11px] text-white font-bold">질문 09</p>
                            </div>
                            <p
                                class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold mt-[20px] md:mt-[30px]">
                                상담 가능한 시간대를 남겨주세요.
                            </p>
                            <div class="mt-[10px] md:mt-[30px] kujung-radio-vertical">
                                <el-radio-group v-model="time">
                                    <el-radio :label="'오전'">오전</el-radio>
                                    <el-radio :label="'오후'">오후</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[420px] absolute right-0 top-0 bottom-0">
                    <img src="/img/smartservice/smart_care_request_banner2.png"
                        class="w-full h-full object-cover hidden lg:block" />
                </div>
            </section>

            <button class="w-[320px] h-[70px] bg-primary-600 text-white text-[15px] font-bold self-center my-[100px]"
                @click="onRequest">
                제출하기
            </button>
        </div>

        <div v-else class="flex flex-col">
            <section class="w-full flex flex-col">
                <div class="max-w-[1280px] w-full flex flex-col self-center relative items-center">
                    <span
                        class="mt-[48px] lg:mt-[107px] mr-[20px] lg:mr-[125px] text-[11px] leading-[15px] text-warmGray-600 self-end">
                        HOME <i class="las la-angle-right"></i>
                        스마트 마루 케어<i class="las la-angle-right"></i>
                        <span class="text-[#1A1A1A] font-bold"> 스마트 마루 케어 서비스</span>
                    </span>
                </div>
            </section>

            <img src="/img/smartservice/smart_care_request_banner3.png"
                class="w-full h-[100px] md:h-[230px] object-cover block mt-[60px] md:mt-[120px]" />
            <p
                class="text-[13px] leading-[18px] md:text-[24px] md:leading-[36px] font-bold text-black text-center mt-[100px] md:mt-[120px] mx-[5px]">
                구정마루 마루마스터가 고객님의 고민을 접수했습니다. <br />
                24시간 이내 유선으로 상담 도와드리겠습니다. 감사합니다. <br />
                (031-766-0700 대표번호로 전화드립니다. 전화를 꼭 받아주세요)
            </p>

            <NuxtLink class="my-[100px] w-[160px] md:w-[420px] self-center" to="/">
                <button class="button-3" type="button" data-kt-stepper-action="next" @click="">
                    <i class="la la-home"></i>
                    홈으로
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="scss"></style>