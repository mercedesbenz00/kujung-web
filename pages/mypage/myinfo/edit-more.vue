<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import {
    AgeRange,
    FailyMember,
    FavFloorColor,
    FavInterioStyle,
    FavMood,
    Gender,
    HomeSize,
    HomeStyle,
    JoinReason
} from "~/ts/share/SignUpModel";
import { useStore } from '~/stores/common';
import SweetAlert from '~/ts/sweet-alert';
import { api } from '~/ts/api';
import { Common } from '~/ts/_utils/common';
import { CommonConstantType } from '~/ts/constants';

const route = useRoute();
const router = useRouter();

const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '추가정보 수정'
});

const { files, open: openFileDialog, reset } = useFileDialog()

type Filter = {
    gender: string;
    ageRange: string;
    color: string;
    areaSpace: string;
    houseType: string;
    familyType: string;
    houseStyle: string[];
    interiorFeeling: string;
    joinReason: string;
}

interface Step1 {
    type: number; // 0: 개인회원, 1: 기업회원
}

interface Step2 {
    id: string;
    nickName: string;
    password: string;
    confirmPassword: string;
}

interface Step3 {
    name: string;
    phoneNumber: string;
    compPhoneNumber: string;
    sms: string;
}

interface Step4 {
    email: string;
    emailRecvYN: string;
    snsRecvYN: string;
    address: string;
    addressDetail: string;
    zonecode: string;
    isPrivacy: boolean;
}

interface Step5 {
    filter: Filter;
}

interface KujungMaruSignUp extends Step1, Step2, Step3, Step4, Step5 { };

const initialValue = {
    type: 0,
    id: '인테리어',
    businessId: 'dkdleldlqfur',
    nickName: '그라미',
    password: 'Test1q2w!',
    companyName: '구정마루',
    name: '조준오',
    compNumber: '9880011667422464',
    compPhoneNumber: '031-766-0700',
    phoneNumber: '010-1111-2222',
    email: 'ehdrmfkal1234@naver.com',
    emailRecvYN: "Y",
    snsRecvYN: "Y",
    privacy: "Y",
    address: '경기 광주시 도척면 마도로 178-13',
    addressDetail: '유정리 100-5 우)12810',
    zonecode: '12818',
    isPrivacy: false,
    filter: {
        gender: '',
        ageRange: '',
        favFloorColor: '',
        homeSize: '',
        homeStyle: '',
        failyMember: '',
        favInterioStyle: [],
        favMood: '',
        joinReason: ''

    }
}

const formData = ref<Omit<KujungMaruSignUp, 'confirmPassword' | 'sms'>>(initialValue);

export interface ISelectedFile {
    file: File,
    url: string
}
const selectedFileList = ref<ISelectedFile[]>([])

watch(files, async (newFiles, oldFiles) => {
    for (var i = 0; i < (newFiles?.length || 0); i++) {
        const tmp = newFiles?.item(i)
        if (tmp) {
            selectedFileList.value.push({ file: tmp, url: URL.createObjectURL(tmp) })
        }
    }
}
)

onMounted(() => {
    loadInfo()
})

watch(() => store.profileInfo, (newConst, oldConst) => {
    if (newConst != null) {
        loadInfo()
    }
})


const commandList = ref([{ name: "사진 변경", selected: true }, { name: "기본 이미지로 변경", selected: false }])

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    if (i == 0) {
        openFileDialog()
    } else {
        selectedFileList.value = []
    }
}

const loadInfo = () => {
    if (!store.profileInfo)
        return
    selectedFileList.value = []

    if (store.profileInfo.profile.photo) {
        selectedFileList.value.push({ url: store.profileInfo.profile?.photo })
    }
    const houseStyles: string[] = []
    store.profileInfo.profile.house_styles?.map(it => {
        houseStyles.push(it.id)
    })
    formData.value.filter = {
        gender: store.profileInfo.profile.gender,
        ageRange: store.profileInfo.profile.age_range_info?.id,
        color: store.profileInfo.profile.color_info?.id,
        areaSpace: store.profileInfo.profile.area_space_info?.id,
        houseType: store.profileInfo.profile.house_type_info?.id,
        familyType: store.profileInfo.profile.family_type_info?.id,
        houseStyle: houseStyles,
        interiorFeeling: store.profileInfo.profile.interior_feeling_info?.id,
        joinReason: store.profileInfo.profile.join_reason
    }
}

const onUpdateProfile = async () => {
    const houseStyle: Array<any> = [];
    if (formData.value.filter.houseStyle.length > 0) {
        formData.value.filter.houseStyle.map((it) => {
            houseStyle.push({ id: it })
        })
    }

    var res

    if (Common.isBusinessMember()) {
        res = await api.put(`/user-management/business/${store.profileInfo?.id}`, {
            "profile": {
                "gender": formData.value.filter.gender,
                "age_range_code": formData.value.filter.ageRange,
                "color_code": formData.value.filter.color,
                "area_space_code": formData.value.filter.areaSpace,
                "house_type_code": formData.value.filter.houseType,
                "family_type_code": formData.value.filter.familyType,
                "interior_feeling_code": formData.value.filter.interiorFeeling,
                "house_styles": houseStyle,
                "join_reason": formData.value.filter.joinReason,
            },
        })
    } else {
        res = await api.put(`/user-management/user/${store.profileInfo?.id}`, {
            "profile": {
                "gender": formData.value.filter.gender,
                "age_range_code": formData.value.filter.ageRange,
                "color_code": formData.value.filter.color,
                "area_space_code": formData.value.filter.areaSpace,
                "house_type_code": formData.value.filter.houseType,
                "family_type_code": formData.value.filter.familyType,
                "interior_feeling_code": formData.value.filter.interiorFeeling,
                "house_styles": houseStyle,
                "join_reason": formData.value.filter.joinReason,
            }
        })
    }
    if (res.success) {
        Common.getProfile()
        Common.showAlert("회원정보가 변경되었습니다.")
        loadInfo()
    } else {
        if (res.errMsg) {
            SweetAlert.openAlert(
                res.errMsg,
                "",
                '<img src="/img/icons/error.svg">');
        } else {
            SweetAlert.openAlert(
                "네트워크 오류가 발생하였습니다.\n잠시후 다시 시도해주세요.",
                "",
                '<img src="/img/icons/error.svg">');
        }
    }
}

</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1">
                <section class="flex flex-col">
                    <p class="text-[18px] md:text-[30px] text-black font-bold">
                        회원정보 수정
                    </p>
                </section>
                <div class="flex flex-col items-center mt-[54px] md:mt-[48px] lg:mt-[36px]">
                    <div
                        class="w-[80px] h-[80px] md:w-[128px] md:h-[128px] lg:w-[150px] lg:h-[150px] bg-warmGray-600 rounded-[50%] flex items-center justify-center relative">
                        <font-awesome-icon icon="fa-regular fa-user"
                            class="text-[33px] md:text-[55px] lg:text-[64px] text-white" />
                        <img v-if="selectedFileList.length > 0" :src="selectedFileList[0].url"
                            class="w-full h-full object-cover absolute left-0 right-0 top-0 bottom-0 rounded-[50%]" />
                    </div>

                    <div v-if="store.commonConstants && store.commonConstants.length > 0" class="w-[320px] md:w-[420px]">
                        <div class="mt-[30px] py-[30px] border-b border-t border-black">
                            <p class="text-center">추가 정보 입력사항은 선택 사항입니다<br />
                                입력 시 마루 추천 등의 혜택을 드립니다.</p>
                        </div>
                        <div class="flex flex-col gap-[44px] py-[44px]">
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">1. 성별은 어떻게 되나요?</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.filter.gender">
                                        <el-radio :label="Gender.MALE">남</el-radio>
                                        <el-radio :label="Gender.FEMALE">여</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">2. 연령대는 어떻게 되나요?</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.filter.ageRange">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.AgeRange)?.items"
                                            :label="item.id">{{ item.name }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">3. 선호하는 바닥재의 컬러를 알려주세요.</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.filter.color">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.Color)?.items"
                                            :label="item.id">{{ item.name }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">4. 주거 공간의 면적을 알려주세요</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.filter.areaSpace">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.AreaSpace)?.items"
                                            :label="item.id">{{ item.name }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">5. 어떤 집을 꾸미고 있나요?</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.filter.houseType">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.HouseType)?.items"
                                            :label="item.id">{{ item.name }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">6. 누구와 함께 지내는 집인가요?</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.filter.familyType">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.FamilyType)?.items"
                                            :label="item.id">{{ item.name }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">7. 좋아하는 인테리어 스타일을 알려주세요.<span class="font-normal">(복수 선택 가능, 최대
                                        3가지)</span></span>
                                <div class="kujung-checkbox">
                                    <el-checkbox-group v-model="formData.filter.houseStyle" :max="3">
                                        <el-checkbox
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.HouseStyle)?.items"
                                            :label="item.id">{{ item.name }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">8. 선호하는 인테리어 분위기를 선택해주세요.</span>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.filter.interiorFeeling">
                                        <el-radio
                                            v-for="(item, index) in store.commonConstants.find(it => it.type == CommonConstantType.InteriorFeeling)?.items"
                                            :label="item.id">{{ item.name }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="flex flex-col items-start gap-[12px]">
                                <span class="text-body4">9. 회원가입 이유는 무엇인가요?</span>
                                <div class="kujung-radio text-start">
                                    <el-radio-group v-model="formData.filter.joinReason"
                                        class="flex flex-col gap-2 text-start !items-start">
                                        <el-radio :label="JoinReason.GETINFO">마루 및 시공사례 정보를 얻기 위해</el-radio>
                                        <el-radio :label="JoinReason.POINT">시공사례를 등록하여 포인트의 적립 및 사용을 위해</el-radio>
                                        <el-radio :label="JoinReason.AS_SERVICE">구정마루를 시공하였고 AS 서비스를 위하여</el-radio>
                                        <el-radio :label="JoinReason.OTHER">기타</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="button-3 max-w-[520px] mt-[20px] md:mt-[80px]" type="button"
                        data-kt-stepper-action="next" @click="onUpdateProfile">
                        수정완료
                    </button>
                </div>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>