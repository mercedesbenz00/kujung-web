<script setup lang="ts">
import { Common } from '~/ts/_utils/common';

// meta
definePageMeta({
    layout: 'page',
    title: '부정부패 신고'
})

onMounted(() => {
})

const onCopyUrl = () => {
    var copyText = document.querySelector("#myinput");
    copyText?.select();
    document.execCommand('copy');
    Common.showSuccessToast("복사되었습니다.")
    emit('confirm')
}

</script>

<template>
    <div class="flex flex-col pt-[55px] md:pt-[80px] lg:md:pt-[126px]">
        <div class="w-full flex relative">
            <img src="/img/service/report_banner.png" class="w-full h-[400px] md:h-[600px] object-cover" />
            <div class="absolute left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center">
                <p class="text-[24px] leading-[36px] md:text-[34px] text-white font-bold">
                    부정부패 신고
                </p>
                <p
                    class="mx-[30px] text-center text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-white mt-[50px] break-keep">
                    구정마루는 투명한 경영을 위해 청탁금지, 부정부패 관련하여 위반행위를 익명으로 메일을 받습니다.
                </p>
            </div>
        </div>

        <div class="w-full flex flex-col md:max-w-[727px] lg:max-w-[1024px] px-[20px] md:px-0 self-center">
            <div class="w-full flex flex-col self-center relative">
                <span class="mt-[48px] lg:mt-[107px] text-[11px] leading-[15px] text-warmGray-600 self-end">
                    HOME <i class="las la-angle-right"></i>
                    서비스<i class="las la-angle-right"></i>
                    고객센터<i class="las la-angle-right"></i>
                    <span class="text-[#1A1A1A] font-bold"> 부정부패 신고</span>
                </span>
            </div>

            <section class="mt-[59px] md:mt-[110px] lg:mt-[89px] w-full pb-[50px] md:pb-[60px] lg:pb-[104px]">
                <p
                    class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black text-center font-bold break-keep px-[20px] whitespace-pre-line">
                    구정마루 부정부패 신고 게시판
                </p>
                <p
                    class="mt-[33px] text-[11px] md:text-[15px] leading-[18px] md:leading-[24px] text-center whitespace-pre-line break-keep">
                    구정마루는 투명한 경영을 위해 청탁금지, 부정부패 관련하여 위반행위를 익명으로 메일을 받습니다.<br />
                    구정마루는 신고자가 안심하고 위반행위를 신고할 수 있도록 신고자, 협조자 등에 대한 신분보장, 신변보호, 비밀보장 제도를 운영하고 있습니다.<br />
                    <br />
                    신고자의 비밀은 철저히 보장되며, 신고사항에 대하여 처리 후 원하시는 방법으로 통보하여 드리고 있습니다.
                </p>
            </section>
            <Line />

            <section
                class="w-full flex flex-col lg:flex-row items-center justify-center pt-[25px] md:pt-[50px] pb-[54px] gap-y-[100px] md:gap-y-[48px] lg:gap-y-[0px] lg:gap-x-[102px]">
                <img src="/img/service/report_desc_guide.png" class="w-full md:w-[512px]" />
                <div class="flex flex-col lg:flex-1 items-start">
                    <p
                        class="text-[22px] leading-[30px] md:text-[24px] md:leading-[36px] text-black text-center font-bold break-keep">
                        청탁금지 · 부정부패 신고 안내
                    </p>
                    <p class="mt-[50px] text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-black text-center">
                        신고 대상은 다음과 같습니다.
                    </p>
                    <p
                        class="mt-[50px] text-[11px] leading-[15px] md:text-[18px] md:leading-[24px] text-black text-start border-l-[3px] pl-[11px] border-black">
                        직무상 지위, 권한을 남용하거나 또는 비윤리적이거나<br />
                        사익에 반하여 개인 이익을 도모<br />
                        또는 회사에 재산상의 손해를 가하는 행위
                    </p>
                </div>
            </section>
            <Line />

            <section class="w-full flex flex-col py-[50px] md:py-[100px]">
                <p
                    class="text-[22px] leading-[30px] md:text-[24px] md:leading-[36px] text-black text-center font-bold break-keep">
                    신변 보호는 4가지 원칙으로 진행됩니다.
                </p>

                <div
                    class="grid grid-cols-2 lg:grid-cols-4 gap-x-[20px] md:gap-x-[92px] gap-y-[30px] md:gap-y-[60px] mt-[59px] lg:mt-[73px]">
                    <div class="flex flex-col items-center">
                        <div class="bg-warmGray-800 w-[150px] h-[150px] flex flex-col rounded-[50%] items-center">
                            <p class="mt-[20px] text-[18px] leading-[24px] text-white">
                                1
                            </p>
                            <div class="px-[10px] lg:px-[15px] w-full mt-[19px] mb-[11px]">
                                <div class="border-white border-b-[1px] w-full" />
                            </div>
                            <p class="mt-[5px] text-[24px] leading-[36px] text-white font-bold">
                                비밀보장</p>
                        </div>
                        <p
                            class="mt-[13px] md:mt-[18px] text-[11px] md:text-[18px] leading-[15px] md:leading-[24px] text-black text-center">
                            신고자 동의없이<br />
                            인적사항 등을 공개 금지
                        </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="bg-warmGray-800 w-[150px] h-[150px] flex flex-col rounded-[50%] items-center">
                            <p class="mt-[20px] text-[18px] leading-[24px] text-white">
                                2
                            </p>
                            <div class="px-[10px] lg:px-[15px] w-full mt-[19px] mb-[11px]">
                                <div class="border-white border-b-[1px] w-full" />
                            </div>
                            <p class="mt-[5px] text-[24px] leading-[36px] text-white font-bold">
                                보호조치</p>
                        </div>
                        <p
                            class="mt-[13px] md:mt-[18px] text-[11px] md:text-[18px] leading-[15px] md:leading-[24px] text-black text-center">
                            신고 등을 이유로<br />
                            불이익 조치 금지

                        </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="bg-warmGray-800 w-[150px] h-[150px] flex flex-col rounded-[50%] items-center">
                            <p class="mt-[20px] text-[18px] leading-[24px] text-white">
                                2
                            </p>
                            <div class="px-[10px] lg:px-[15px] w-full mt-[19px] mb-[11px]">
                                <div class="border-white border-b-[1px] w-full" />
                            </div>
                            <p class="mt-[5px] text-[24px] leading-[36px] text-white font-bold">
                                신변보호</p>
                        </div>
                        <p
                            class="mt-[13px] md:mt-[18px] text-[11px] md:text-[18px] leading-[15px] md:leading-[24px] text-black text-center">
                            신고 등을 이유로<br />
                            신변에 불안이 있는 경우 요청
                        </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="bg-warmGray-800 w-[150px] h-[150px] flex flex-col rounded-[50%] items-center">
                            <p class="mt-[20px] text-[18px] leading-[24px] text-white">
                                2
                            </p>
                            <div class="px-[10px] lg:px-[15px] w-full mt-[19px] mb-[11px]">
                                <div class="border-white border-b-[1px] w-full" />
                            </div>
                            <p class="mt-[5px] text-[24px] leading-[36px] text-white font-bold">
                                비밀보장</p>
                        </div>
                        <p
                            class="mt-[13px] md:mt-[18px] text-[11px] md:text-[18px] leading-[15px] md:leading-[24px] text-black text-center">
                            신고와 관련하여 신고자의<br />
                            범죄행위가 발견된 경우<br />
                            형벌, 징계 등의 감경<br />
                            또는 면제 가능
                        </p>
                    </div>
                </div>
            </section>
            <Line />


            <section class="w-full flex flex-col py-[50px] md:py-[100px]">
                <p
                    class="text-[22px] leading-[30px] md:text-[24px] md:leading-[36px] text-black text-center font-bold break-keep">
                    청탁금지 · 부정부패 신고 안내
                </p>
                <p
                    class="mt-[50px] text-[11px] leading-[15px] md:text-[18px] md:leading-[24px] text-black text-center break-keep">
                    1. 신고로 인하여 사내에 직접적인 수입의 회복 또는 증대가 있는 경우<br />
                    2. 직접적 재산상 이익을 가져오지 않아도 공적 이익에 기여한 경우
                </p>

                <div
                    class="mt-[50px] flex flex-col md:flex-row gap-y-[9px] md:gap-y-0 md:gap-x-[25px] items-center justify-center">
                    <p
                        class="text-[11px] leading-[15px] md:text-[18px] md:leading-[24px] text-black text-center break-keep">
                        신고 방법 : junwood@kujungmaru.com
                    </p>
                    <input type="text" class="h-0 w-1" value="junwood@kujungmaru.com" readonly id="myinput" />
                    <!-- <BtnWithLA class="" laName="lar la-file-alt" text="신고하기" :onClick="() => { onCopyUrl() }" /> -->
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss"></style>