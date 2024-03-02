<script setup lang="ts">
const router = useRouter();
const route = useRoute();
import { api } from '~~/ts/api';
import SweetAlert from '~/ts/sweet-alert';
import { VueDaumPostcodeCompleteResult } from "vue-daum-postcode";
import { PointProduct } from '~/ts/interfaces/PointProduct';
import { useStore } from '~/stores/common';
import Swal from 'sweetalert2'
import { Common } from '~/ts/_utils/common';

// meta
definePageMeta({
    layout: 'page',
    title: '배송지 입력'
});

const id = ref(route.query.id)
const info = ref<PointProduct>()
const store = useStore()

const commandList = ref([{ name: "문 앞", selected: false },
{ name: "직접 받음", selected: false },
{ name: "경비실", selected: false },
{ name: "택배함 선택", selected: false }])

const recipient_name = ref("")
const recipient_phone = ref("")
const delivery_addr = ref("")
const delivery_addr_sub = ref("")
const delivery_zonecode = ref("")
const delivery_memo = ref("")

onMounted(() => {
    loadInfo()
})
const loadInfo = () => {
    api.get(
        `/point-product/${id.value}`
    )
        .then(response => {
            if (response.success) {
                info.value = response.data
            }
        })
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    delivery_memo.value = commandList.value[i].name
}

function onDaumloaded() { }

const isOpen = ref(false);

function onDaumComplete(newResult: VueDaumPostcodeCompleteResult) {
    isOpen.value = false;
    delivery_addr.value = newResult.address
    delivery_zonecode.value = newResult.zonecode
}

const onCancel = () => {
    router.back()
}

const onDone = async () => {
    if (store.profileInfo?.point! < info.value?.point!) {
        SweetAlert.openAlert(
            '',
            "포인트가 부족합니다.",
            '<img src="/img/icons/error.svg">');
        return;
    }

    if (!recipient_name.value || !recipient_phone.value || !delivery_addr.value || !delivery_zonecode.value || !delivery_addr_sub.value) {
        SweetAlert.openAlert(
            '',
            "필수정보들을 입력해주세요.",
            '<img src="/img/icons/error.svg">');
        return;
    }
    const res = await api.post(`/point-product-order`, {
        "requester_id": store.profileInfo?.id,
        "product_id": info.value?.id,
        "recipient_name": recipient_name.value,
        "recipient_phone": recipient_phone.value,
        "delivery_addr": delivery_addr.value,
        "delivery_addr_sub": delivery_addr_sub.value,
        "delivery_zonecode": delivery_zonecode.value,
        "delivery_memo": delivery_memo.value,
    })
    if (res.success) {
        Swal.fire({
            title: "배송 알림",
            html: "상품 출고일까지 약 1주일 정도의<br/>시간이 소요됩니다.",
            iconHtml: '<img src="/img/icons/error.svg">',
            showCancelButton: false,
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            if (result.isDismissed) {
                navigateTo('/service/point-mall')
            }
        });
    }

}
</script>

<template>
    <PageContainer>
        <div class="w-full items-center justify-center flex">
            <div
                class="relative flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
                <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                    배송지 입력
                </p>
                <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                    구정마루가 준비한 상품을 받으실 배송지를 입력해주세요.
                </p>

                <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

                <section class="mt-[38px] w-full flex flex-col">
                    <p class="text-[18px] md:text-[24px] text-black font-bold">
                        선택 상품
                    </p>
                    <div
                        class="mt-[10px] border border-secondaryNavy-600 px-[20px] md:px-[40px] lg:px-[50px] py-[23px] flex flex-col md:flex-row gap-y-[30px] md:gap-y-0 md:gap-x-[27px]">
                        <img :src="info?.thumb_url" class="w-[200px] h-[140px]" />
                        <div class="flex flex-col">
                            <div class="flex-1">
                                <p class="text-[15px] leading-[20px] md:text-[22px] md:leading-[30px] text-black font-bold">
                                    {{ info?.name }}
                                </p>
                                <div :innerHTML="info?.summary"
                                    class="mt-[8px] md:mt-[10px] text-[11px] leading-[15px] md:text-[15px] md:leading-[20px] text-black line-clamp-2">
                                </div>
                            </div>
                            <div class="mt-[20px] md:mt-[35px] flex flex-row">
                                <div class="relative flex items-center justify-center">
                                    <img src="/img/bg_point.png" class="w-[22px] h-[22px]" />
                                    <p class="absolute text-[13px] leading-[18px] text-white font-bold">P</p>
                                </div>
                                <p
                                    class="text-[18px] leading-[22px] text-primary-500 font-bold ml-[7px] md:ml-[10px] lg:ml-[3px] lg:self-end">
                                    -{{ info?.point?.toLocaleString() }}P</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="mt-[60px] w-full flex flex-col">
                    <div class="flex flex-row justify-between items-center">
                        <p class="text-[18px] md:text-[24px] text-black font-bold">
                            주문자 정보
                        </p>
                    </div>
                    <Line class="mt-[5px]" />

                    <div class="flex flex-col gap-y-[17px] mt-[30px] px-[20px] md:px-0">
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">이름</p>
                            <div class="flex-1 bg-warmGray-600">
                                <input class="w-full form-box1" :value="store.profileInfo?.name" readonly />
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">휴대폰번호</p>
                            <div class="flex-1 bg-warmGray-600">
                                <input class="w-full form-box1" :value="store.profileInfo?.phone" readonly />
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">이메일 주소</p>
                            <div class="flex-1 bg-warmGray-600">
                                <input class="w-full form-box1" :value="store.profileInfo?.email" readonly />
                            </div>
                        </div>
                    </div>
                </section>

                <section class="mt-[60px] w-full flex flex-col">
                    <div class="flex flex-row justify-between items-center">
                        <p class="text-[18px] md:text-[24px] text-black font-bold">
                            배송지 정보
                        </p>
                        <p class="text-[11px] text-black font-bold">
                            *필수 입력 사항
                        </p>
                    </div>
                    <Line class="mt-[5px]" />

                    <div class="flex flex-col gap-y-[17px] mt-[30px] px-[20px] md:px-0">
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">수령인 *</p>
                            <div class="flex-1">
                                <input class="w-full form-box1" v-model="recipient_name" placeholder="이름을 입력해 주세요." />
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">휴대폰번호 *</p>
                            <div class="flex-1">
                                <input class="w-full form-box1" v-model="recipient_phone"
                                    placeholder="-을 제외한 휴대폰번호를 입력해 주세요." />
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">배송 주소 *</p>
                            <div class="flex-1 flex flex-row items-center">
                                <input class="w-full form-box1" v-model="delivery_zonecode"
                                    placeholder="배송 주소를 입력해 주세요. (주소 검색 하면 우편 번호 자동 입력)" readonly />
                                <button @click="() => {
                                    isOpen = !isOpen
                                }"
                                    class="bg-secondaryNavy-800 text-white h-[50px] md:h-[54px] text-[13px] font-[700] w-[76px] md:w-[130px]">
                                    주소 검색
                                </button>
                            </div>
                        </div>
                        <template v-if="isOpen">
                            <VueDaumPostcode @complete="onDaumComplete" @load="onDaumloaded" />
                        </template>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]"></p>
                            <div class="flex-1">
                                <input class="w-full form-box1" v-model="delivery_addr"
                                    placeholder="배송 주소를 입력해 주세요. (주소 검색 하면 주소 자동 입력)" readonly />
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]"></p>
                            <div class="flex-1">
                                <input class="w-full form-box1" v-model="delivery_addr_sub" placeholder="상세 주소를 입력해 주세요." />
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black w-[90px] md:w-[164px]">배송 메모</p>
                            <div class="flex-1">
                                <el-dropdown class="w-full max-w-[352px]" trigger="click" @command="handleCommand">
                                    <button class="dropdown-btn el-dropdown-link"
                                        :class="commandList.find(it => it.selected) ? 'text-warmGray-900' : 'text-secondarynavy-300'">
                                        <span>
                                            {{ commandList.find(it => it.selected)?.name || "배송 시 요청사항" }}
                                        </span>
                                        <span>▼</span>
                                    </button>
                                    <template #dropdown>
                                        <el-dropdown-menu v-for="(command, index) in commandList" :key="index">
                                            <el-dropdown-item :command="command.name">
                                                <button class="w-[180px] md:w-[320px]">
                                                    {{ command.name }}
                                                </button>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="mt-[60px] w-full flex flex-col">
                    <div class="flex flex-row justify-between items-center">
                        <p class="text-[18px] md:text-[24px] text-black font-bold">
                            포인트 사용
                        </p>
                    </div>
                    <Line class="mt-[5px]" />

                    <div class="flex flex-col gap-y-[17px] mt-[30px] px-[20px] md:px-0">
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">보유</p>
                            <div class="flex-1 bg-warmGray-600">
                                <input class="w-full form-box1" :value="store.profileInfo?.point?.toLocaleString() + 'P'"
                                    readonly />
                            </div>
                        </div>
                        <div class="flex flex-row items-center justify-between w-full">
                            <p class="text-[13px] md:text-[18px] text-black font-bold w-[90px] md:w-[164px]">사용</p>
                            <div class="flex-1">
                                <input class="w-full form-box1" :value="info?.point?.toLocaleString() + 'P'" readonly />
                            </div>
                        </div>
                    </div>
                </section>

                <div class="my-[100px] flex flex-row w-[320px] md:w-[640px]">
                    <button @click="() => {
                        onCancel()
                    }"
                        class="border border-secondaryNavy-800 text-secondaryNavy-600 h-[60px] md:h-[70px] text-[15px] flex-1">
                        취소
                    </button>
                    <button @click="() => {
                        onDone()
                    }" class="bg-secondaryNavy-800 text-white h-[60px] md:h-[70px] text-[15px] font-[700] flex-1">
                        완료
                    </button>
                </div>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>