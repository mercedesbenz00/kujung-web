<script setup lang="ts">
const route = useRoute();
import { SCREEN_WIDTH, PRIVACY_TERM_URL, CATEGORY_PRICE_LIST } from '~~/ts/constants';
import { useFileDialog } from '@vueuse/core'
import { api, uploadFiles } from '~~/ts/api';
import { useStore } from '~/stores/common';
import SweetAlert from '~/ts/sweet-alert';
import { FileCategoryType } from '~~/ts/constants';
import { Common } from '~/ts/_utils/common';
import { Category } from '~/ts/interfaces/Category';
const router = useRouter();


const { files, open, reset } = useFileDialog()

const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '견적 내기'
});

onMounted(() => {
    loadCategoryList()
})

export interface ISelectedFile {
    file: File,
    url: string
}

const selectedFileList = ref<ISelectedFile[]>([])

const address = ref('')
const remark = ref('')
const roomCount = ref('')

const areaList = ref<any>(
    [
        { name: "20평 이하", selected: false, },
        { name: "20평형대", selected: false, },
        { name: "30평형대", selected: false, },
        { name: "40평형대", selected: false, },
        { name: "50평형대", selected: false, },
        { name: "기타", selected: false, },
    ]
)
const radioAreaSpaceVal = ref('')
const radioAreaSpaceTxt = ref('')

const areaTypeList = ref<any>(
    [
        { name: "아파트", selected: false, },
        { name: "오피스텔", selected: false, },
        { name: "빌라", selected: false, },
        { name: "단독주택", selected: false, },
        { name: "기타", selected: false, },
    ]
)
const radioHouseStyleVal = ref('')
const radioHouseStyleTxt = ref('')

const styleList = ref<any>(
    [
        { name: "거실", selected: false, },
        { name: "부엌", selected: false, },
        { name: "방", selected: false, },
    ]
)
const checkStyleVal = ref<string[]>([])

const checkPersonalTerm = ref<boolean>(false)

const largeCategoryList = ref<Category[]>([])
const selectedCategory = ref<string>(route.query.selectedCategory)

const loadCategoryList = () => {
    api.get('/category?order=ASC&sortBy=created_at')
        .then(response => {
            if (response.success) {
                largeCategoryList.value = response.data.items
                largeCategoryList.value.forEach(it => {
                    it.name = it.name.replace("비스포크 마루", "믹스매치")
                    it.minPrice = CATEGORY_PRICE_LIST.find(a => it.name.includes(a.name))?.minPrice
                    it.maxPrice = CATEGORY_PRICE_LIST.find(a => it.name.includes(a.name))?.maxPrice
                })
            }
        })
}


watch(files, async (newFiles, oldFiles) => {
    for (var i = 0; i < (newFiles?.length || 0); i++) {
        const tmp = newFiles?.item(i)
        if (tmp) {
            selectedFileList.value.push({ file: tmp, url: URL.createObjectURL(tmp) })
        }
    }
}
)

const onDeleteFile = (index: number) => {
    selectedFileList.value.splice(index, 1)
}

const onEstimateRequest = async () => {
    if (!address.value || !radioAreaSpaceVal.value || !radioHouseStyleVal.value || checkStyleVal.value.length == 0) {
        SweetAlert.openAlert(
            '필수정보들을 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;

    }
    if (radioHouseStyleVal.value == "기타" && radioHouseStyleTxt.value == "") {
        SweetAlert.openAlert(
            '주거공간 정보를 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    if (radioAreaSpaceVal.value == "기타" && radioAreaSpaceTxt.value == "") {
        SweetAlert.openAlert(
            '집유형 정보를 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    if (checkStyleVal.value.includes("방") && !roomCount.value) {
        SweetAlert.openAlert(
            '방 개수를 입력해주세요',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    if (!checkPersonalTerm.value) {
        SweetAlert.openAlert(
            '개인정보처리방침에 동의해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    const images: Array<any> = [];
    if (selectedFileList.value.length > 0) {
        const fileArr: Array<File> = []
        selectedFileList.value.map(it => {
            fileArr.push(it.file)
        })
        const fileRes = await uploadFiles(fileArr, FileCategoryType.Estimate, "y")

        fileRes.map((it: any) => {
            images.push({
                "image_url": it.Location
            })
        })
    }
    const res = await api.post(`/detailed-quotation`, {
        "name": store.profileInfo?.name,
        "phone": store.profileInfo?.phone,
        "addr": address.value,
        "house_style_text": radioHouseStyleVal.value == "기타" ? radioHouseStyleTxt.value : radioHouseStyleVal.value,
        "area_space_text": radioAreaSpaceVal.value == "기타" ? radioAreaSpaceTxt.value : radioAreaSpaceVal.value,
        "remark": remark.value,
        "living_room_count": checkStyleVal.value.includes("거실") ? 1 : 0,
        "kitchen_count": checkStyleVal.value.includes("부엌") ? 1 : 0,
        "room_count": !roomCount.value ? 0 : parseInt(roomCount.value),
        "detailedQuotationImages": images,
        "category_id": largeCategoryList.value.find(it => it.name == selectedCategory.value)?.id
    })
    if (res.success) {
        Common.showAlert("상세 견적 신청이 완료되었습니다.<br/>남겨주신 연락처로 5영업일 내에 연락드리겠습니다.", () => {
            router.go(0)
        })
    }
}

</script>

<template>
    <PageContainer>
        <div class="w-full items-center justify-center flex">
            <div
                class="relative flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
                <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                    상세 견적내기
                </p>
                <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                    몇 가지 항목을 체크하시고 바닥재 시공 견적을 받아보세요.
                <p class="text-[#2087D6] font-bold whitespace-pre-line">
                    ※ 확장에 대한 평수는 추가 시공이 필요합니다. {{ SCREEN_WIDTH > 768 ? "" : "\n" }} 자세한 내용은 실측시 상담 가능합니다.
                </p>
                </p>

                <section class="w-full mt-[80px] flex flex-col px-[20px] md:px-0">
                    <p class="text-black text-[15px] md:text-[24px] leading-[20px] md:leading-[30px] font-bold">
                        견적내기 정보
                    </p>
                    <div class="flex flex-col md:flex-row mt-[5px] md:justify-between">
                        <p class="text-black text-[13px] leading-[18px]">
                            기본 회원정보가 일치하지 않으면, 마이페이지 > 회원정보 수정을 통해 변경해주세요.
                        </p>
                        <p class="text-black text-[11px] leading-[15px] font-bold mt-[6px] md:mt-0 self-end">
                            *필수입력사항
                        </p>
                    </div>
                </section>

                <Line class="mt-[5px]" />

                <div class="w-full flex flex-col px-[20px] md:px-0 mt-[50px] lg:mt-[60px] space-y-[40px]">
                    <section class="flex flex-col lg:flex-row w-full space-y-[40px] lg:space-y-[0px] lg:space-x-[10px]">
                        <div class="flex-1">
                            <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                                이름 *
                            </p>
                            <input type="text" :value="store.profileInfo?.name" readonly class="form-box1 w-full mt-[10px]"
                                placeholder="이름을 입력해 주세요." />
                        </div>
                        <div class="flex-1">
                            <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                                휴대폰 번호*
                            </p>
                            <input type="text" :value="store.profileInfo?.phone" readonly class="form-box1 w-full mt-[10px]"
                                placeholder="휴대폰 번호를 입력하세요." />
                        </div>
                    </section>

                    <section class="flex flex-col lg:flex-row w-full space-y-[40px] lg:space-y-[0px] lg:space-x-[10px]">
                        <div class="flex-1">
                            <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                                주소 *
                            </p>
                            <input type="text" v-model="address" class="form-box1 w-full mt-[10px]"
                                placeholder="주소를 입력해 주세요." />
                        </div>
                    </section>

                    <section class="flex flex-col lg:flex-row w-full space-y-[10px] lg:space-y-[0px] lg:space-x-[10px]">
                        <div class="flex flex-col flex-1 items-start gap-[12px]">
                            <span class="text-body4">주거 공간*</span>
                            <div class="kujung-radio">
                                <el-radio-group v-model="radioHouseStyleVal">
                                    <el-radio v-for="(item, index) in areaTypeList" :label="item.name">{{ item.name
                                    }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">

                            </p>
                            <input type="text" v-model="radioHouseStyleTxt" :readonly="radioHouseStyleVal != '기타'"
                                class="form-box1 w-full mt-[10px] lg:mt-[24px]" placeholder="기타 선택 시 집 유형을 입력해주세요." />
                        </div>
                    </section>

                    <section class="flex flex-col lg:flex-row w-full space-y-[10px] lg:space-y-[0px] lg:space-x-[10px]">
                        <div class="flex flex-col flex-1 items-start gap-[12px]">
                            <span class="text-body4">집 유형*</span>
                            <div class="kujung-radio">
                                <el-radio-group v-model="radioAreaSpaceVal">
                                    <el-radio v-for="(item, index) in areaList" :label="item.name">{{ item.name
                                    }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex-1 lg:max-w-[340px]">
                            <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">

                            </p>
                            <input type="text" v-model="radioAreaSpaceTxt" :readonly="radioAreaSpaceVal != '기타'"
                                class="form-box1 w-full mt-[10px] lg:mt-[24px]" placeholder="기타 선택 시 집 평 형을 입력해주세요." />
                        </div>
                    </section>

                    <section class="flex flex-col lg:flex-row w-full space-y-[10px] lg:space-y-[0px] lg:space-x-[10px]">
                        <div class="flex flex-col flex-1 items-start gap-[12px]">
                            <span class="text-body4">시공범위*</span>
                            <div class="flex flex-row flex-1 items-center">
                                <div class="kujung-checkbox mr-[18px]">
                                    <el-checkbox-group v-model="checkStyleVal">
                                        <el-checkbox v-for="(item, index) in styleList" :label="item.name">{{ item.name
                                        }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div class="w-[135px] md:w-[155px] flex flex-row items-center">
                                    <input type="text" v-model="roomCount" :readonly="!checkStyleVal.includes('방')"
                                        class="form-box1 w-full mt-[0] mr-[6px]" placeholder="개수를 입력하세요." />
                                    <p class="text-[15px] text-warmGray-900 font-bold">개</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col flex-1 items-start gap-[12px]">
                            <span class="text-body4">마루 종류</span>
                            <div class="w-full">
                                <Dropdown v-model="selectedCategory" :options="largeCategoryList" optionLabel="name"
                                    optionValue="name" placeholder="마루 선택" inputClass="text-black"
                                    class="w-full rounded-0 bg-transparent border-black border-[1px] text-black" />
                            </div>
                        </div>
                    </section>

                    <section class="flex flex-col lg:flex-row w-full space-y-[40px] lg:space-y-[0px] lg:space-x-[10px]">
                        <div class="flex-1">
                            <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                                특이사항
                            </p>
                            <textarea type="text" v-model="remark"
                                class="border p-[10px] border-secondaryNavy-600 outline-none bg-transparent w-full h-[120px] md:h-[150px] lg:h-[220px] mt-[10px]"
                                placeholder="특이사항이 있을 경우 작성해 주세요." />
                        </div>
                    </section>

                    <section class="flex flex-col">
                        <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                            평면도
                        </p>
                        <div class="flex flex-col md:flex-row md:items-center mt-[8px]">
                            <button class="bg-secondaryNavy-500 text-white h-[40px] w-[120px] text-[13px] font-bold"
                                @click="open()">
                                파일선택
                            </button>
                            <p class="text-[13px] text-secondaryNavy-300 leading-[18px] md:ml-[5px] mt-[4px] md:mt-0">
                                (용량 : 20mb, 첨부가능한 파일 : jpeg, jpg, png)
                            </p>
                        </div>
                        <el-scrollbar>
                            <div class="flex flex-row mt-[30px]">
                                <div v-for="(item, index) in selectedFileList"
                                    class="relative w-[120px] h-[80px] mr-[30px]">
                                    <img :src="item.url" class="w-full h-full object-cover" />
                                    <button type="button" @click="() => { onDeleteFile(index) }"
                                        class="absolute top-[-5px] right-[-5px] bg-[red] w-[17px] h-[17px] rounded-[50%] items-center justify-center flex">
                                        <i class="las la-times text-[12px] font-bold text-white"></i>
                                    </button>
                                </div>
                            </div>
                        </el-scrollbar>
                    </section>
                </div>
            </div>
        </div>

        <div
            class="w-full items-center justify-center flex bg-warmGray-600 mt-[110px] md:mt-[32px] pt-[54px] pb-[50px] md:pb-[110px]">
            <div class="relative flex flex-col max-w-[728px] lg:max-w-[1024px] w-full self-center px-[26px] md:px-0">
                <div class="kujung-checkbox mr-[18px]">
                    <el-checkbox v-model="checkPersonalTerm">[필수] 개인정보처리방침</el-checkbox>
                </div>

                <div class="relative mt-[12px]">
                    <iframe :src="PRIVACY_TERM_URL" class="w-full h-[280px] bg-warmGray-400 border-warmGray-800 border" />
                    <div class="absolute top-0 left-0 right-[20px] h-[50px] bg-white">

                    </div>
                </div>

                <button
                    class="bg-secondaryNavy-600 w-full h-[70px] md:w-[420px] text-white text-[15px] font-bold self-center mt-[50px] mb-[110px] lg:mb-[120px]"
                    @click="onEstimateRequest()">보내기</button>
            </div>
        </div>

    </PageContainer>
</template>

<style lang="scss"></style>