<script setup lang="ts">
const route = useRoute();
const router = useRouter();
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useModal } from 'vue-final-modal'
import ModalConstructionExGuide from '~~/components/ModalConstructionExGuide.vue';
import ModalSelectFloorInfo from '~~/components/ModalSelectFloorInfo.vue';
import { useFileDialog } from '@vueuse/core'
import { CommonConstantType } from '~/ts/constants';
import { useStore } from '~/stores/common';
import { Product } from "~/ts/interfaces/Product";
import { api, uploadFiles } from '~/ts/api';
import SweetAlert from '~/ts/sweet-alert';
import { FileCategoryType } from '~/ts/constants';
import Swal from 'sweetalert2';
import { Common } from '~/ts/_utils/common';
import { House } from '~/ts/interfaces/House';
import { OnlineHouse } from '~/ts/interfaces/OnlineHouse';
import { ExpertHouse } from '~/ts/interfaces/ExpertHouse';

// meta
definePageMeta({
    layout: 'page',
    title: '집들이 글쓰기'
});

const store = useStore();

const type = Number(route.query.type);
const editId = Number(route.query.editId);

const { files, open: openFileDialog, reset } = useFileDialog({ multiple: type == 1 })

const detailInfo = ref<OnlineHouse & ExpertHouse>()

const radioColorVal = ref('')
const radioAreaSpaceVal = ref('')
const radioHouseTypeVal = ref('')
const radioFamilyTypeVal = ref('')
const radioHouseStyleVal = ref('')
const checkTagVal = ref<string[]>([])

const buildingAddr = ref('')
const title = ref('')
const content = ref('')

const selectedProduct = ref<Product | null>(null)

onMounted(() => {
    if (editId) {
        loadHouseDetail(editId)
    }
})
export interface ISelectedFile {
    file: File,
    url: string
}

const selectedFileList = ref<ISelectedFile[]>([])

watch(files, async (newFiles, oldFiles) => {
    if (type == 1) { // 온라인 집들이는 여러장
        for (var i = 0; i < (newFiles?.length || 0); i++) {
            const tmp = newFiles?.item(i)
            if (tmp) {
                selectedFileList.value.push({ file: tmp, url: URL.createObjectURL(tmp) })
            }
        }
    } else { // 전문가 집들이는 커버사진 1장만
        for (var i = 0; i < (newFiles?.length || 0); i++) {
            const tmp = newFiles?.item(i)
            if (tmp) {
                selectedFileList.value = [{ file: tmp, url: URL.createObjectURL(tmp) }]
            }
        }
    }
}
)

const onDeleteFile = (index: number) => {
    selectedFileList.value.splice(index, 1)
}

const { open: openConstructionExGuideModal, close: closeConstructionExGuideModal } = useModal({
    component: ModalConstructionExGuide,
    attrs: {
        onConfirm() {
            closeConstructionExGuideModal()
        },
    },
    slots: {
        default: ``,
    },
})

const { open: openSelectFloorInfoModal, close: closeSelectFloorInfoModal } = useModal({
    component: ModalSelectFloorInfo,
    attrs: {
        onConfirm() {
            closeSelectFloorInfoModal()
        },
        onSelectedFloor(p_item: Product | null) {
            closeSelectFloorInfoModal()
            selectedProduct.value = p_item
        },
    },
    slots: {
        default: ``,
    },
})


const loadHouseDetail = (p_id: any) => {
    const url = type == 2 ? `/expert-house/${p_id}` : `/online-house/${p_id}`
    api.get(url)
        .then(response => {
            if (response.success) {

                detailInfo.value = response.data
                radioColorVal.value = detailInfo.value?.color_info.id
                radioAreaSpaceVal.value = detailInfo.value?.area_space_info.id
                radioHouseTypeVal.value = detailInfo.value?.house_type_info.id
                radioFamilyTypeVal.value = detailInfo.value?.family_type_info.id
                radioHouseStyleVal.value = detailInfo.value?.house_style_info.id
                detailInfo.value?.tags.map(it => {
                    checkTagVal.value.push(it.id)
                })
                selectedProduct.value = detailInfo.value?.product



                if (type == 1) {
                    detailInfo.value?.onlineHouseImages?.map(it => {
                        selectedFileList.value.push({ url: it.image_url })
                    })
                } else {
                    buildingAddr.value = detailInfo.value?.building_addr
                    title.value = detailInfo.value?.title
                    selectedFileList.value.push({ url: detailInfo.value?.thumb_url })
                    content.value = detailInfo.value?.content
                }
            }
        })
}


const onRequest = () => {
    if (editId) { // 수정의 경우
        if (type == 1) {
            onUpdateNormalHouse()
        } else {
            onUpdateExpertHouse()
        }
    } else {
        if (type == 1) {
            onWriteNormalHouse()
        } else {
            onWriteExpertHouse()
        }
    }
}

const onWriteNormalHouse = async () => {
    if (!radioColorVal.value
        // || !radioAreaSpaceVal.value
        // || !radioHouseTypeVal.value
        // || !radioFamilyTypeVal.value
        || !radioHouseStyleVal.value
        || checkTagVal.value.length == 0
        || !selectedProduct.value
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
    const fileRes = await uploadFiles(fileArr, FileCategoryType.OnlineHouse, "n")

    const images: Array<any> = [];
    fileRes.map((it: any) => {
        images.push({
            "image_url": it.Location
        })
    })

    const tags: Array<any> = [];
    checkTagVal.value.map((it) => {
        tags.push({ id: it })
    })

    const res = await api.post(`/online-house`, {
        "color_code": radioColorVal.value,
        // "family_type_code": radioFamilyTypeVal.value,
        "house_style_code": radioHouseStyleVal.value,
        // "house_type_code": radioHouseTypeVal.value,
        // "area_space_code": radioAreaSpaceVal.value,
        "reason": "",
        "main_display": false,
        "onlineHouseImages": images,
        "tags": tags,
        "product_id": selectedProduct.value.id,
        "label_id": null
    })


    if (res.success) {
        Common.showAlert("집들이 발행 신청이 완료되었습니다.<br/>구정마루에서 검토후 업로드가 진행됩니다.", () => {
            router.back()
        })
    }
}

const onWriteExpertHouse = async () => {
    if (!radioColorVal.value
        // || !radioAreaSpaceVal.value
        // || !radioHouseTypeVal.value
        // || !radioFamilyTypeVal.value
        || !radioHouseStyleVal.value
        || checkTagVal.value.length == 0
        || !selectedProduct.value
        || selectedFileList.value.length == 0
        || !title.value
        || !content.value) {
        SweetAlert.openAlert(
            '필수정보들을 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    const uploadSize = content.value.length / 1024 / 1024
    console.log("컨텐트 업로드 사이즈(MB)", uploadSize)
    if (uploadSize > 200) {
        Common.showErrorToast("업로드 크기가 초과되어 업로드 제한됩니다.")
        return;
    }
    const fileArr: Array<File> = []
    selectedFileList.value.map(it => {
        fileArr.push(it.file)
    })
    const fileRes = await uploadFiles(fileArr, FileCategoryType.ExpertHouse, "y")

    const images: Array<any> = [];
    fileRes.map((it: any) => {
        images.push({
            "image_url": it.Location,
            "thumb_url": it.thumbLocation,
        })
    })

    const tags: Array<any> = [];
    checkTagVal.value.map((it) => {
        tags.push({ id: it })
    })

    const res = await api.post(`/expert-house`, {
        "title": title.value,
        "color_code": radioColorVal.value,
        // "family_type_code": radioFamilyTypeVal.value,
        "house_style_code": radioHouseStyleVal.value,
        // "house_type_code": radioHouseTypeVal.value,
        // "area_space_code": radioAreaSpaceVal.value,
        "reason": "",
        "main_display": false,
        "image_url": images[0].image_url,
        "thumb_url": images[0].thumb_url,
        "building_addr": buildingAddr.value,
        "content": content.value,
        "tags": tags,
        "product_id": selectedProduct.value.id,
        "label_id": null
    })

    if (res.success) {
        Common.showAlert("집들이 발행 신청이 완료되었습니다.<br/>구정마루에서 검토후 업로드가 진행됩니다.", () => {
            router.back()
        })
    }
}

const onUpdateNormalHouse = async () => {
    if (!radioColorVal.value
        || !radioAreaSpaceVal.value
        || !radioHouseTypeVal.value
        || !radioFamilyTypeVal.value
        || !radioHouseStyleVal.value
        || checkTagVal.value.length == 0
        || !selectedProduct.value
        || selectedFileList.value.length == 0) {
        SweetAlert.openAlert(
            '필수정보들을 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    const fileArr: Array<File> = []
    const images: Array<any> = [];
    selectedFileList.value.map(it => {
        if (it.file) {
            fileArr.push(it.file)
        } else {
            images.push({ "image_url": it.url })
        }
    })
    var fileRes = [];
    if (fileArr.length > 0) {
        fileRes = await uploadFiles(fileArr, FileCategoryType.OnlineHouse, "n")
    }

    fileRes.map((it: any) => {
        images.push({
            "image_url": it.Location
        })
    })

    const tags: Array<any> = [];
    checkTagVal.value.map((it) => {
        tags.push({ id: it })
    })

    const res = await api.put(`/online-house/${editId}`, {
        "color_code": radioColorVal.value,
        "family_type_code": radioFamilyTypeVal.value,
        "house_style_code": radioHouseStyleVal.value,
        "house_type_code": radioHouseTypeVal.value,
        "area_space_code": radioAreaSpaceVal.value,
        "reason": "",
        "main_display": false,
        "onlineHouseImages": images,
        "tags": tags,
        "product_id": selectedProduct.value.id,
        "label_id": null
    })

    if (res.success) {
        Common.showAlert("집들이 재발행 신청이 완료되었습니다.<br/>구정마루에서 검토후 업로드가 진행됩니다.", () => {
            navigateTo(`/construction-ex/detail?id=${editId}&isExpertType=false`)
        })
    }
}

const onUpdateExpertHouse = async () => {
    if (!radioColorVal.value
        || !radioAreaSpaceVal.value
        || !radioHouseTypeVal.value
        || !radioFamilyTypeVal.value
        || !radioHouseStyleVal.value
        || checkTagVal.value.length == 0
        || !selectedProduct.value
        || selectedFileList.value.length == 0
        || !title.value
        || !content.value) {
        SweetAlert.openAlert(
            '필수정보들을 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    const uploadSize = content.value.length / 1024 / 1024
    console.log("컨텐트 업로드 사이즈(MB)", uploadSize)
    if (uploadSize > 200) {
        Common.showErrorToast("업로드 크기가 초과되어 업로드 제한됩니다.")
        return;
    }
    const fileArr: Array<File> = []
    const images: Array<any> = [];
    selectedFileList.value.map(it => {
        if (it.file) {
            fileArr.push(it.file)
        } else {
            images.push({ "image_url": it.url, "thumb_url": it.url })
        }
    })
    var fileRes = [];
    if (fileArr.length > 0) {
        fileRes = await uploadFiles(fileArr, FileCategoryType.ExpertHouse, "y")
    }

    fileRes.map((it: any) => {
        images.push({
            "image_url": it.Location,
            "thumb_url": it.thumbLocation,
        })
    })

    const tags: Array<any> = [];
    checkTagVal.value.map((it) => {
        tags.push({ id: it })
    })

    const res = await api.put(`/expert-house/${editId}`, {
        "title": title.value,
        "color_code": radioColorVal.value,
        "family_type_code": radioFamilyTypeVal.value,
        "house_style_code": radioHouseStyleVal.value,
        "house_type_code": radioHouseTypeVal.value,
        "area_space_code": radioAreaSpaceVal.value,
        "reason": "",
        "main_display": false,
        "image_url": images[0].image_url,
        "thumb_url": images[0].thumb_url,
        "building_addr": buildingAddr.value,
        "content": content.value,
        "tags": tags,
        "product_id": selectedProduct.value.id,
        "label_id": null
    })

    if (res.success) {
        Common.showAlert("집들이 재발행 신청이 완료되었습니다.<br/>구정마루에서 검토후 업로드가 진행됩니다.", () => {
            navigateTo(`/construction-ex/detail?id=${editId}&isExpertType=true`)
        })
    }
}

</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                {{ type == 1 ? "랜선" : "전문가" }} 집들이 글쓰기
            </p>

            <div class="w-full px-[20px] md:px-0">
                <div
                    class="mt-[20px] md:mt-[30px] px-[10px] md:px-[30px] pt-[32px] md:pt-[24px] pb-[15px] md:pb-[32px] border border-[#071222] flex flex-col">
                    <p class="text-[15px] md:text-[18px] leading-[20px] md:leading-[24px] font-bold">
                        ※ 집들이 작성 가이드
                    </p>
                    <p
                        class="text-[11px] md:text-[15px] leading-[15px] md:leading-[20px] break-keep mt-[10px] md:mt-[20px]">
                        <b>1. 온라인 집들이</b><br />
                        - 온라인 집들이는 랜선, 전문가 집들이를 통합해서 부르는 명칭입니다.<br />
                        - 온라인 집들이(랜선, 전문가 집들이) 승인 완료 시 소정의 포인트를 제공합니다.<br />
                        (랜선 집들이 : 100 포인트, 전문가 집들이 : 200 포인트).<br />
                        - 온라인 집들이는 자신만의 인테리어를 다른 사람들에게 보여줄 수 있으며, 해당 업로드 된 사진들은 관리자의 검수를 통하여 업로드가 됩니다.<br />
                        - 업로드 승인 및 반려 여부는 마이페이지에서 안내 드립니다.<br />
                        - 업로드 승인 및 반려 여부 확인은 작성해주신 시점을 기준으로 14일 가량 소요됩니다.<br />
                        - 집들이 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해 주시기 바랍니다.<br />
                        - 미풍양속을 헤치는 내용 혹은 타인에게 불쾌함을 주는 내용은 동의 없이 삭제 될 수 있습니다.<br />
                        - 해당 내용을 관리자가 검수하였을 때, 내용이 부족한 경우 관리자가 추가 수정을 요청할 수 있습니다.<br />
                        - 사진은 수직, 수평을 맞추어 고화질의 사진을 올려주시기 바랍니다.<br />
                        - 온라인 집들이에 올라온 모든 내용은 (주) 구정마루에서 컨텐츠 혹은 기타 활동에 활용 하실 수 있습니다.<br />
                        - 온라인 집들이는 작성해주신 글을 바탕으로 관리자의 편집과 검수, 태그 작업을 거쳐서 발행되고 있습니다.<br />
                        &nbsp;&nbsp;&nbsp;커버 사진, 제목, 태그 등이 변경될 수 있습니다.<br />
                        <br />
                    <p v-if="type == 1">
                        <b>2. 랜선집들이</b><br />
                        - 랜선집들이는 사진만 올려서 간편하게 볼 수 있는 인터넷 집들이입니다.<br />
                        - 사진 첨부 시 용량은 장당 최대 5MB까지 업로드할 수 있고 jpg, jpeg, png 포맷을 지원합니다.<br />
                        - 방, 거실, 주방 등의 사진을 자유롭게 올려주시기 바랍니다(최대 7장).<br />
                        - 공간 별로 여러 각도의 사진도 가능합니다.<br />
                    </p>
                    <p v-else>
                        <b>2. 전문가 집들이</b><br />
                        - 전문가 집들이는 사진과 인테리어 설명을 올려서 남들과 다른 자신만의 인테리어를 뽐낼 수 있는 인터넷 집들이입니다.<br />
                        - 사진 첨부 시 용량은 장당 최대 5MB까지 업로드할 수 있고 jpg, jpeg, png 포맷을 지원합니다.<br />
                        - 방, 거실, 주방, 평면도 등 본인만의 인테리어의 컨셉 설명글과 사진을 올려주시기 바랍니다(최소 8장).<br />
                        - 공간 별로 여러 각도의 사진도 가능합니다.<br />
                    </p>
                    </p>
                    <!-- <button
                        class="bg-secondaryNavy-500 text-white text-[13px] h-[40px] w-[120px] mt-[20px] md:mt-[600x] lg:mt-[10px] md:self-end"
                        @click="openConstructionExGuideModal">
                        가이드 보기
                    </button> -->
                </div>
            </div>

            <div class="w-full flex flex-col px-[20px] md:px-[140px] lg:px-0 ">
                <section class="w-full">
                    <div class="mt-[25px] flex flex-row w-full justify-between items-end">
                        <p class="text-[18px] leading-[24px] md:text-[24px] md:leading-[30px] font-bold">
                            필수 정보 입력
                        </p>
                        <p class="text-[11px] leading-[15px]">
                            *필수 입력 사항
                        </p>
                    </div>
                    <Line class="mt-[10px] lg:mt-[16px]" />
                    <div class="my-[50px] md:my-[44px] lg:my-[30px]w-full">
                        <div class="flex flex-col gap-[44px]"
                            v-if="store.commonConstants && store.commonConstants.length > 0">
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">컬러별*</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="radioColorVal">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.Color)?.items"
                                            :label="item.id">{{ item.name
                                            }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <!-- <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">주거 면적*</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="radioAreaSpaceVal">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.AreaSpace)?.items"
                                            :label="item.id">{{ item.name
                                            }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">주거 공간*</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="radioHouseTypeVal">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.HouseType)?.items"
                                            :label="item.id">{{ item.name
                                            }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">가족형태*</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="radioFamilyTypeVal">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.FamilyType)?.items"
                                            :label="item.id">{{ item.name
                                            }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div> -->
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">스타일별*</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="radioHouseStyleVal">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.HouseStyle)?.items"
                                            :label="item.id">{{ item.name
                                            }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>

                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">태그선택<span class="font-normal">(복수 선택 가능)*</span></span>
                                <div class="kujung-checkbox">
                                    <el-checkbox-group v-model="checkTagVal">
                                        <el-checkbox v-for="(item, index) in store.tagList" :label="item.id">{{ item.name
                                        }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>

                            <div v-if="type == 2" class="flex flex-1 flex-col items-start gap-[12px]">
                                <span class="text-body4">시공주소*</span>
                                <div class="w-full">
                                    <input type="text" class="form-box1 w-full h-[50px]" v-model="buildingAddr"
                                        placeholder="주소를 입력해 주세요." />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="w-full">
                    <div class="mt-[25px] flex flex-row w-full justify-between items-center">
                        <div class="flex flex-row items-center">
                            <p class="text-[18px] w-[150px] leading-[24px] md:text-[24px] md:leading-[30px] font-bold">
                                마루 정보*
                            </p>
                            <button class="hidden lg:block bg-secondaryNavy-500 w-[120px] h-[40px] text-white"
                                @click="openSelectFloorInfoModal()">마루 선택</button>
                        </div>
                        <p class="text-[11px] leading-[15px]">
                            *필수 입력 사항
                        </p>
                    </div>
                    <Line class="mt-[10px] lg:mt-[16px]" />
                    <button class="block lg:hidden bg-secondaryNavy-500 w-[120px] h-[40px] text-white self-start mt-[23px]"
                        @click="openSelectFloorInfoModal()">마루 선택</button>

                    <div class="flex flex-col md:flex-row w-full mt-[24px] lg:mt-[30px] items-start">
                        <div class="flex flex-row items-center">
                            <p class="text-[15px] w-[150px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                                마루 종류*
                            </p>
                            <p v-if="!selectedProduct" class="text-[13px] leading-[18px]"
                                :class="true && 'text-secondaryNavy-300'">
                                마루를 선택해 주세요.
                            </p>
                        </div>
                        <CardSearchedFloor v-if="selectedProduct" :item="selectedProduct"
                            class="flex-1 mt-[13px] md:mt-[0px]" />
                    </div>
                    <LineGray class="mt-[26px]" />
                </section>

                <section class="w-full">
                    <div class="mt-[50px] flex flex-row w-full justify-between items-center">
                        <div class="flex flex-row items-center">
                            <p class="text-[18px] w-[150px] leading-[24px] md:text-[24px] md:leading-[30px] font-bold">
                                상세 내용*
                            </p>
                        </div>
                        <p class="text-[11px] leading-[15px]">
                            *필수 입력 사항
                        </p>
                    </div>
                    <Line class="mt-[10px] lg:mt-[16px]" />
                    <button
                        class="block lg:hidden bg-secondaryNavy-500 w-[120px] h-[40px] text-white self-start mt-[23px]">파일선택</button>
                    <div class="flex flex-col lg:flex-row w-full mt-[24px] lg:mt-[30px] lg:items-center">
                        <p class="text-[15px] w-[150px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                            {{ type == 1 ? "사진 첨부*" : "커버 사진 첨부*" }}
                        </p>
                        <button class="hidden lg:block bg-secondaryNavy-500 w-[120px] h-[40px] text-white mr-[30px]"
                            @click="openFileDialog()">파일선택</button>
                        <p class="text-[13px] leading-[18px] mt-[7px] lg:mt-0 flex-1"
                            :class="true && 'text-secondaryNavy-300'">
                            (용량 : 5mb, 첨부가능한 파일 : jpeg, jpg, png, webp, gif)
                        </p>
                    </div>
                    <el-scrollbar class="lg:ml-[150px]">
                        <div class="flex flex-row mt-[30px]">
                            <div v-for="(item, index) in selectedFileList" class="relative w-[120px] h-[80px] mr-[30px]">
                                <img :src="item.url" class="w-full h-full object-cover" />
                                <button type="button" @click="() => { onDeleteFile(index) }"
                                    class="absolute top-[-5px] right-[-5px] bg-[red] w-[17px] h-[17px] rounded-[50%] items-center justify-center flex">
                                    <i class="las la-times text-[12px] font-bold text-white"></i>
                                </button>
                            </div>
                        </div>
                    </el-scrollbar>
                    <LineGray class="mt-[16px]" />

                    <div v-if="type == 2">
                        <div class="flex flex-col lg:flex-row w-full mt-[20px] lg:mt-[13px] lg:items-center">
                            <p class="text-[15px] w-[150px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                                제목*
                            </p>
                            <div class="flex-1 mt-[17px] lg:mt-0">
                                <input type="text" class="form-box1 w-full h-[50px]" v-model="title"
                                    placeholder="제목을 입력해 주세요." />
                            </div>
                        </div>
                        <LineGray class="mt-[16px]" />
                    </div>

                    <div v-if="type == 2">
                        <div class="flex flex-col lg:flex-row w-full mt-[20px] lg:mt-[13px] lg:items-start">
                            <p class="text-[15px] w-[150px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                                내용*
                            </p>
                            <div class="lg:flex-1 mt-[17px] lg:mt-0 h-[300px]">
                                <QuillEditor theme="snow" toolbar="full" v-model:content="content" content-type="html" />
                            </div>
                        </div>
                    </div>
                </section>
                <div v-if="editId" class="w-full md:w-[640px] flex flex-row self-center">
                    <button
                        class="bg-warmGray-400 h-[70px] border-secondaryNavy-600 border-[1px] text-black text-[15px] mt-[180px] mb-[110px] lg:mb-[120px] flex-1"
                        @click="router.back()">취소</button>
                    <button
                        class="bg-secondaryNavy-500 h-[70px] text-white text-[15px] mt-[180px] mb-[110px] lg:mb-[120px] flex-1"
                        @click="onRequest">재발행</button>
                </div>
                <button v-else
                    class="bg-secondaryNavy-500 w-full h-[70px] md:w-[420px] text-white text-[15px] self-center mt-[180px] mb-[110px] lg:mb-[120px]"
                    @click="onRequest">발행신청</button>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>