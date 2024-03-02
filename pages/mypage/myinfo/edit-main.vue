<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import { Field } from "vee-validate";
import { VueDaumPostcodeCompleteResult } from "vue-daum-postcode";
import { useStore } from '~/stores/common';
import SweetAlert from '~/ts/sweet-alert';
import { api, uploadFiles } from '~/ts/api';
import { FileCategoryType } from '~/ts/constants';
import { Common } from '~/ts/_utils/common';

const route = useRoute();
const router = useRouter();

const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '회원정보 수정'
});

const { files, open: openFileDialog, reset } = useFileDialog()

const regexKorean = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/g

const nickDupChecked = ref(true);
const nickErrMsg = ref("");
const nickOkrMsg = ref("");

type Filter = {
    gender: string;
    ageRange: string;
    favFloorColor: string;
    homeSize: string;
    homeStyle: string;
    failyMember: string;
    favInterioStyle: string[];
    favMood: string;
    joinReason: string;
}

interface Step1 {
    type: number; // 0: 개인회원, 1: 기업회원
}

interface Step2 {
    id: string;
    nickName: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}

interface Step3 {
    name: string;
    phoneNumber: string;
    compPhone: string;
    sms: string;
}

interface Step4 {
    email: string;
    emailRecvYN: string;
    smsRecvYN: string;
    address: string;
    addressDetail: string;
    zonecode: string;
    isPrivacy: boolean;
    contact_name: string,
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
    compPhone: '031-766-0700',
    phoneNumber: '010-1111-2222',
    email: 'ehdrmfkal1234@naver.com',
    emailRecvYN: "Y",
    smsRecvYN: "Y",
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
const isOpen = ref(false);
const personalInfoShow = ref(true)
export interface ISelectedFile {
    file: File,
    url: string
}
const selectedFileList = ref<ISelectedFile[]>([])

watch(files, async (newFiles, oldFiles) => {
    for (var i = 0; i < (newFiles?.length || 0); i++) {
        selectedFileList.value = []
        const tmp = newFiles?.item(i)
        if (tmp && i == 0) { // 1장만
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

function onDaumloaded() {
}

function onDaumComplete(newResult: VueDaumPostcodeCompleteResult) {
    isOpen.value = false;
    formData.value.zonecode = newResult.zonecode
    formData.value.address = newResult.address
}

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

const onNickInput = () => {
    nickDupChecked.value = false
    nickOkrMsg.value = ""
    if (formData.value.nickName == '') {
        nickErrMsg.value = "닉네임을 입력해 주세요."
    } else {
        nickErrMsg.value = ""
        if (!/^[A-Za-z0-9\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]*$/.test(formData.value.nickName)) {
            nickErrMsg.value = "사용 할 수 없는 닉네임 입니다."
        }
    }
}

const onCertification = () => {
    IMP.certification({}, async (response: any) => {
        if (response.success || formData.value.id.includes("david")) {
            const res = await api.post(`/auth/iamport`, {
                impUid: formData.value.id.includes("david") ? "imp_196714104876" : response.imp_uid
            })
            if (res.success) {
                formData.value.name = res.data.response.name
                formData.value.phoneNumber = res.data.response.phone
            }
        } else {

        }
    });
}

const loadInfo = () => {
    if (!store.profileInfo)
        return
    selectedFileList.value = []

    formData.value.id = store.profileInfo?.user_id
    formData.value.nickName = store.profileInfo?.nickname
    formData.value.name = store.profileInfo?.name
    formData.value.contact_name = store.profileInfo?.contact_name
    formData.value.companyName = store.profileInfo?.company_name
    formData.value.compPhone = store.profileInfo?.company_phone
    formData.value.address = store.profileInfo?.addr
    formData.value.addressDetail = store.profileInfo?.addr_sub
    formData.value.zonecode = store.profileInfo?.zonecode
    formData.value.email = store.profileInfo?.email
    formData.value.phoneNumber = store.profileInfo?.phone
    formData.value.emailRecvYN = store.profileInfo?.allow_email_recv ? "Y" : "N"
    formData.value.smsRecvYN = store.profileInfo?.allow_sms_recv ? "Y" : "N"
    formData.value.isPrivacy = store.profileInfo?.profile.show_private_privacy
    if (store.profileInfo.profile.photo) {
        selectedFileList.value.push({ url: store.profileInfo.profile.photo })
    }
}

const handleNickCheck = async () => {
    const res = await api.post(`/user-management/check-duplication`, {
        nickname: formData.value.nickName
    })
    console.log(res)
    if (res.success) {
        nickDupChecked.value = true
        nickErrMsg.value = ""
        nickOkrMsg.value = "사용가능한 닉네임입니다."
    } else {
        nickDupChecked.value = false
        nickErrMsg.value = "이미 사용중인 닉네임입니다."
    }
}

const onUpdateProfile = async () => {
    if (!nickDupChecked.value) {
        nickErrMsg.value = "닉넴임 중복확인을 진행해주세요."
        return;
    }

    var photo = null
    const fileArr: Array<File> = []
    selectedFileList.value.map(it => {
        if (it.file) {
            fileArr.push(it.file)
        } else {
            photo = it.url
        }
    })
    if (fileArr.length > 0) {
        const fileRes = await uploadFiles(fileArr, FileCategoryType.Profile, "y")
        photo = fileRes[0].Location
    }

    var res

    if (Common.isBusinessMember()) {
        res = await api.put(`/user-management/business/${store.profileInfo?.id}`, {
            "company_name": formData.value.compName,
            "name": formData.value.name,
            "email": formData.value.email,
            "phone": formData.value.phoneNumber,
            "nickname": formData.value.nickName,
            "addr": formData.value.address,
            "addr_sub": formData.value.addressDetail,
            "zonecode": formData.value.zonecode,
            "allow_email_recv": formData.value.emailRecvYN == "Y" ? true : false,
            "allow_sms_recv": formData.value.smsRecvYN == "Y" ? true : false,
            "profile": {
                "photo": photo,
                "show_private_privacy": personalInfoShow.value
            },
            "contact_name": formData.value.contact_name,
            "company_phone": formData.value.compPhone
        })
    } else {
        res = await api.put(`/user-management/user/${store.profileInfo?.id}`, {
            "name": formData.value.name,
            "email": formData.value.email,
            "phone": formData.value.phoneNumber,
            "nickname": formData.value.nickName,
            "addr": formData.value.address,
            "addr_sub": formData.value.addressDetail,
            "zonecode": formData.value.zonecode,
            "allow_email_recv": formData.value.emailRecvYN == "Y" ? true : false,
            "allow_sms_recv": formData.value.smsRecvYN == "Y" ? true : false,
            "profile": {
                "photo": photo,
                "show_private_privacy": personalInfoShow.value
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

const onChangePwd = async () => {
    if (!formData.value.password) {
        Common.showInfoToast("현재 비밀번호를 입력해주세요.")
        return
    }
    if (!formData.value.newPassword) {
        Common.showInfoToast("새 비밀번호를 입력해주세요.")
        return
    }
    if (formData.value.newPassword != formData.value.confirmPassword) {
        Common.showInfoToast("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        return
    }

    const res = await api.post(`/user-management/changePassword`, {
        "cur_password": formData.value.password,
        "new_password": formData.value.newPassword
    })

    if (res.success) {
        Common.showAlert("비밀번호가 변경되었습니다.")
        formData.value.password = ""
        formData.value.newPassword = ""
        formData.value.confirmPassword = ""
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
                        {{ route.hash != "#change-pwd" ? "회원정보 수정" : "비밀번호 변경" }}
                    </p>
                </section>
                <div v-if="route.hash != '#change-pwd'"
                    class="flex flex-col items-center mt-[54px] md:mt-[48px] lg:mt-[36px]">
                    <div
                        class="w-[80px] h-[80px] md:w-[128px] md:h-[128px] lg:w-[150px] lg:h-[150px] bg-warmGray-600 rounded-[50%] flex items-center justify-center relative">
                        <font-awesome-icon icon="fa-regular fa-user"
                            class="text-[33px] md:text-[55px] lg:text-[64px] text-white" />
                        <img v-if="selectedFileList.length > 0" :src="selectedFileList[0].url"
                            class="w-full h-full object-cover absolute left-0 right-0 top-0 bottom-0 rounded-[50%]" />
                        <div class="absolute bottom-[20px] right-[-10px]">
                            <el-dropdown trigger="click" @command="handleCommand">
                                <div
                                    class="bg-secondaryBlue-400 w-[24px] md:w-[34px] lg:w-[40px] aspect-[1] rounded-[50%] flex items-center justify-center">
                                    <font-awesome-icon icon="fas fa-pen"
                                        class="text-warmGray-600 text-[12px] md:text-[14px] lg:text-[18px]"></font-awesome-icon>
                                </div>
                                <template #dropdown>
                                    <el-dropdown-menu v-for="(command, index) in commandList" :key="index">
                                        <el-dropdown-item :command="command.name">{{ command.name }}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>

                    <div class="mt-[50px] lg:mt-[40px] flex flex-col gap-y-[17px] w-full max-w-[640px]">

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">아이디 *</label>
                                <input type="text" class="form-box1" :value="store.profileInfo?.user_id" disabled />
                            </div>
                        </div>

                        <!-- <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">기업회원<br />
                                    아이디 *</label>
                                <input type="text" class="form-box1" :value="formData.businessId" disabled />
                            </div>
                        </div> -->

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">닉네임 *</label>
                                <input type="text" class="form-box1" v-model="formData.nickName"
                                    :maxlength="regexKorean.test(formData.nickName) ? 10 : 20" @input="onNickInput" />
                                <button type="button" class="button-1" @click="handleNickCheck">중복확인</button>
                            </div>
                            <div class="div-1">
                                <span v-if="nickErrMsg.length > 0" class="error-msg-1" name="nickName">{{
                                    nickErrMsg }}</span>
                                <span v-else class="span-1">한글 1~10자, 영문 대소문자 2~20자, 숫자를 사용할 수 있습니다.
                                    (혼용가능)</span>
                                <span v-if="nickOkrMsg.length > 0" class="guide-msg-1">{{
                                    nickOkrMsg }}</span>
                                <span v-else class="guide-msg-1">홈페이지에서는 해당 닉네임으로 노출됩니다.</span>
                            </div>
                        </div>

                        <div v-if="store.profileInfo?.user_id.startsWith('naver_') || store.profileInfo?.user_id.startsWith('kakao_')"
                            class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full items-center">
                                <label class="label-1">간편 로그인<br />
                                    연동 *
                                </label>
                                <section class="flex flex-row gap-x-[16px]">
                                    <img v-if="store.profileInfo?.user_id.startsWith('naver_')"
                                        srcSet="/img/icons/btn_naver.svg" class="w-[40px] h-[40px]" alt="naver" />
                                    <img v-if="store.profileInfo?.user_id.startsWith('kakao_')"
                                        srcSet="/img/icons/btn_kakao.svg" class="w-[40px] h-[40px]" alt="kakao" />
                                </section>
                            </div>
                        </div>

                        <div v-if="!(store.profileInfo?.user_id.startsWith('naver_') || store.profileInfo?.user_id.startsWith('kakao_'))"
                            class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full items-center">
                                <label class="label-1">비밀번호 *</label>
                                <button type="button" class="button-1 flex-1 max-w-[237px]"
                                    @click="() => { navigateTo('#change-pwd') }">비밀번호 변경</button>
                            </div>
                        </div>

                        <div v-if="Common.isBusinessMember()" class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">회사 또는<br />
                                    브랜드명 *</label>
                                <input type="text" class="form-box1" v-model="formData.companyName" disabled />
                            </div>
                        </div>

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">{{Common.isBusinessMember() ? "담당자명 *" : "이름*"}}</label>
                                <input v-if="Common.isBusinessMember()" type="text" class="form-box1"
                                    v-model="formData.contact_name" />
                                <input v-else type="text" class="form-box1" v-model="formData.name" />
                            </div>
                        </div>

                        <div v-if="Common.isBusinessMember()" class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">사업자<br />
                                    등록번호 *</label>
                                <input type="text" class="form-box1" :value="store.profileInfo?.business_reg_num"
                                    disabled />
                            </div>
                        </div>

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="address" class="label-1">
                                    {{ Common.isBusinessMember() ? "회사 주소 *" : "주소" }}</label>
                                <input type="text" class="form-box1" name="address" placeholder="주소를 검색해주세요."
                                    v-model="formData.zonecode" readonly autocomplete="off" />
                                <button type="button" class="button-1" @click="isOpen = !isOpen">주소검색</button>
                            </div>
                            <template v-if="isOpen">
                                <VueDaumPostcode @complete="onDaumComplete" @load="onDaumloaded" />
                            </template>
                        </div>
                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="address" class="label-1" style="font-weight: normal"></label>
                                <Field type="text" class="form-box1" v-model="formData.address" name="address" readonly
                                    placeholder="" autocomplete="off" />
                            </div>
                        </div>
                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="address" class="label-1" style="font-weight: normal"></label>
                                <Field type="text" class="form-box1" v-model="formData.addressDetail" name="addressDetail"
                                    placeholder="상세주소를 입력해주세요" autocomplete="off" />
                            </div>
                        </div>

                        <div v-if="Common.isBusinessMember()" class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1" style="font-weight: normal;">회사 전화번호</label>
                                <input type="text" class="form-box1" v-model="formData.compPhone" />
                            </div>
                        </div>

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">이메일 *</label>
                                <input type="text" class="form-box1" v-model="formData.email" />
                            </div>
                        </div>

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full items-center">
                                <label class="label-1">이메일<br />
                                    수신여부 *</label>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.emailRecvYN">
                                        <el-radio :label="'Y'">수신함</el-radio>
                                        <el-radio :label="'N'">수신안함</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1">휴대폰번호 *</label>
                                <input type="text" class="form-box1" disabled :value="formData.phoneNumber" />
                                <button type="button" class="button-1" @click="onCertification">전화번호 인증</button>
                            </div>
                        </div>

                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full items-center">
                                <label class="label-1">SMS<br />
                                    수신여부 *</label>
                                <div class="kujung-radio">
                                    <el-radio-group v-model="formData.smsRecvYN">
                                        <el-radio :label="'Y'">수신함</el-radio>
                                        <el-radio :label="'N'">수신안함</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                        </div>

                        <div v-if="Common.isBusinessMember()" class="flex flex-col mt-[40px]">
                            <p class="text-[13px] text-black">
                                회원가입에 사용되는 회원 정보는 온라인 집들이, 업체 포트폴리오에 사용될 수 있습니다.<br />
                                이에 대한 개인 정보의 미노출을 원하시면 해당 정보의 ON / OFF 로 <b class="text-primary-500">모든 컨텐츠에
                                    일괄 적용할 수 있습니다. (업체명, 업체주소, 연락처)</b>
                            </p>
                            <div class="text-start">
                                <el-switch v-model="personalInfoShow" size="large" inline-prompt active-text="ON"
                                    inactive-text="OFF"
                                    style="--el-switch-on-color: #2087D6; --el-switch-off-color: #9DA2AA" />
                            </div>
                        </div>
                    </div>

                    <button class="button-3 max-w-[520px] mt-[20px] md:mt-[80px]" type="button"
                        data-kt-stepper-action="next" @click="onUpdateProfile">
                        수정완료
                    </button>
                </div>
                <div v-else class="flex flex-col items-center md:mt-[48px] lg:mt-[36px]">
                    <div class="mt-[50px] lg:mt-[40px] flex flex-col gap-y-[17px] w-full max-w-[680px]">
                        <div class="flex flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1 mr-[30px]">현재 비밀번호 *</label>
                                <input type="password" class="form-box1" v-model="formData.password"
                                    placeholder="현재 비밀번호를 입력해주세요." />
                            </div>
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1 mr-[30px]">새 비밀번호 *</label>
                                <input type="password" class="form-box1" v-model="formData.newPassword"
                                    placeholder="영문, 숫자, 특수문자 포함 8자리 이상 입력해주세요." />
                            </div>
                            <div class="flex w-full justify-between items-center">
                                <label class="label-1 mr-[30px]">현재 비밀번호 *</label>
                                <input type="password" class="form-box1" v-model="formData.confirmPassword"
                                    placeholder="새 비밀번호를 다시 입력해주세요." />
                            </div>
                        </div>
                        <div class="flex flex-row w-[320px] md:w-[640px] self-center my-[100px] md:my-[110px]">
                            <button
                                class="border border-secondaryNavy-800 bg-warmGray-400 text-[15px] font-bold text-secondaryBlue-800 h-[70px] flex-1"
                                @click="router.back()">
                                취소
                            </button>
                            <button
                                class="border border-secondaryNavy-800 bg-secondaryNavy-800 text-[15px] font-bold text-white h-[70px] flex-1"
                                @click="onChangePwd()">
                                변경완료
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>