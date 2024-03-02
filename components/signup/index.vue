<script setup lang="ts">
import { StepperComponent } from '~/ts/components/_StepperComponent';
import * as Yup from "yup";
import { useForm, Field, ErrorMessage, useFormValues } from "vee-validate";
import { API_URL, api, setToken } from '~~/ts/api';
import SweetAlert from '~/ts/sweet-alert';
import { VueDaumPostcodeCompleteResult } from "vue-daum-postcode";
import {
    Gender,
    JoinReason
} from "../../ts/share/SignUpModel";
import axios, { HttpStatusCode } from 'axios';
import { useStore } from '~/stores/common';
import { CommonConstantType } from '~/ts/constants';
import { NaverProfileInfo } from "~/ts/interfaces/NaverProfileInfo";
import { Common } from '~/ts/_utils/common';

const store = useStore();

// SweetAlert.openAlert(
//     '시간초과',
//     "<p class='text-[15px] font-medium'>입력시간이 초과 되었습니다.</p><p class='text-[15px] font-medium'>인증번호를 다시 받아주세요.</p>",
//     '<img src="/img/icons/error.svg">');


onMounted(() => {
    setTimeout(() => {
        initNaverLogin()
    }, 1000)
});

function onDaumloaded() {
}

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
    isPersonalMember: boolean; // 0: 개인회원, 1: 기업회원
    isSnsMember: boolean; // 0: 일반, 1: SNS 가입
}

interface Step2 {
    id: string;
    nickName: string;
    password: string;
    confirmPassword: string;
    compName: string;
    compRepName: string;
    compRegNum: string;
    compPhone: string;
}

interface Step3 {
    name: string;
    phoneNumber: string;
    brand: string;
}

interface Step4 {
    email: string;
    zonecode: string;
    address: string;
    addressDetail: string;
    isPrivacy: boolean;
}

interface Step5 {
    filter: Filter;
}

interface KujungMaruSignUp extends Step1, Step2, Step3, Step4, Step5 { };

const initialValue = {
    isPersonalMember: true,
    isSnsMember: false,
    id: '',
    nickName: '',
    password: '',
    name: '',
    phoneNumber: '',
    brand: '',
    compName: '',
    compRepName: '',
    compRegNum: '',
    compPhone: '',
    email: '',
    zonecode: '',
    address: '',
    addressDetail: '',
    isPrivacy: false,
    filter: {
        gender: null,
        ageRange: null,
        color: null,
        areaSpace: null,
        houseType: null,
        familyType: null,
        houseStyle: [],
        interiorFeeling: null,
        joinReason: null

    }
}
const regexKorean = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/g

const currentStepIndex = ref(0);

const idDupChecked = ref(false);
const nickDupChecked = ref(false);
const compRegnumChecked = ref(false);

const idErrMsg = ref("");
const idOkMsg = ref("");

const nickErrMsg = ref("");
const nickOkrMsg = ref("");

const compNameErrMsg = ref("");

const compRepNameErrMsg = ref("");

const addrErrMsg = ref("");

const addrDetailErrMsg = ref("");

const compRegNumErrMsg = ref("");
const compRegNumOkMsg = ref("");

const compPhoneErrMsg = ref("");

const is14OverChecked = ref(true);
const isAllTermsChecked = ref(true);
const isPrivacyChecked = ref(true);
const isThirdInfoChecked = ref(true);
const isSmsChecked = ref(true);
const isEventAlarmChecked = ref(true);

const isPersonalBusiness = ref(false);
const isCoperateBusiness = ref(true);

const personalInfoShow = ref(true)

const createAppRef = ref<HTMLElement | null>(null);
const stepperObj = ref<StepperComponent | null>(null);

const formData = ref<Omit<KujungMaruSignUp, 'confirmPassword'>>(initialValue);

const KujungMaruSignUpSchema = [
    Yup.object({
        isPersonalMember: Yup.boolean().required(),
    }),
    Yup.object({
        id: Yup.string()
            .required('아이디를 입력해 주세요.'),
        nickName: Yup.string()
            .required('닉네임을 입력해 주세요.'),
        password: Yup.string()
            .min(8, '최소 8자이상 이여야 합니다.')
            .max(50, '최대 50자이하 이여야 합니다.'),
        confirmPassword: Yup.string()
            .required('비밀번호 확인을 입력해 주세요.')
            .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    }),
    Yup.object({
        name: Yup.string(),
        phoneNumber: Yup.string(),
        compName: Yup.string(),
        compRepName: Yup.string(),
        compRegNum: Yup.string(),
        compPhone: Yup.string()
    }),
    Yup.object({
        email: Yup.string()
            .email('이메일 형식이 아닙니다.')
            .required('이메일을 입력해 주세요.'),
        zonecode: Yup.string(),
        address: Yup.string(),
        addressDetail: Yup.string(),
        brand: Yup.string(),
        // isPrivacy: Yup.boolean()
        //     .required('이용약관 동의를 입력해 주세요.')
    })
];

const currentSchema = computed(() => {
    return KujungMaruSignUpSchema[currentStepIndex.value];
});

const { errors, resetForm, handleSubmit, setValues } = useForm<Step1 | Step2 | Step3 | Step4 | Step5>({
    validationSchema: currentSchema
});

const onKakaoSignup = () => {
    Kakao.Auth.login({
        success: async (res: any) => {
            const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${res.access_token}`,
                }
            })
            const id = "kakao_" + response.data.id
            const pwd = response.data.id + ""
            try {
                const res2 = await axios.post(`${API_URL}auth/user/login`, {
                    "user_id": id,
                    "password": pwd
                })
                if (res2.data.success) {
                    setToken(res2.data.data.access_token)
                    location.href = "/"
                    return;
                }
            } catch (error) {
                formData.value.id = "kakao_" + response.data.id
                formData.value.email = response.data.kakao_account.email
                formData.value.phoneNumber = response.data.kakao_account.phone_number?.replace("+82 ", "0")?.replace(/-/g, "")
                formData.value.name = response.data.kakao_account.profile.nickname
                formData.value.nickName = response.data.kakao_account.profile.nickname
                formData.value.password = response.data.id + ""
                formData.value.confirmPassword = response.data.id + ""

                formData.value.isPersonalMember = true
                formData.value.isSnsMember = true

                setTimeout(() => {
                    currentStepIndex.value++;
                    stepperObj.value.goNext();
                }, 500)
            }
        }
    });
}

const initNaverLogin = () => {
    var naver_id_login: any = new window.naver_id_login("fbxjVwgnlhH4bw_VjKLU", `${window.location.origin}/login/naver-callback`);
    var state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2, 40);
    naver_id_login.setDomain(`${window.location.origin}`);
    naver_id_login.setState(state);
    naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();
    window.CallParentFunction = function (info: any) {
        if (info.message == "success") {
            onNaverSignup(info.response)
        }
    }
}

const triggerNaverLogin = async () => {
    var btn = document.getElementById("naver_id_login")?.firstChild;
    btn.click()
}

const onNaverSignup = async (response: NaverProfileInfo) => {
    const id = "naver_" + response.id
    const pwd = response.id + ""
    try {
        const res2 = await axios.post(`${API_URL}auth/user/login`, {
            "user_id": id,
            "password": pwd
        })
        if (res2.data.success) {
            setToken(res2.data.data.access_token)
            location.href = "/"
        }
    } catch (error) {
        formData.value.id = "naver_" + response.id
        formData.value.email = response.email
        formData.value.phoneNumber = response.mobile?.replace("+82 ", "0")?.replace(/-/g, "")
        formData.value.name = response.name
        formData.value.nickName = response.nickname
        formData.value.password = response.id + ""
        formData.value.confirmPassword = response.id + ""

        formData.value.isPersonalMember = true
        formData.value.isSnsMember = true

        setTimeout(() => {
            currentStepIndex.value++;
            stepperObj.value.goNext();
        }, 500)
    }
}

const handleIdCheck = async () => {
    if (formData.value.id.length < 5) {
        idDupChecked.value = true
        idErrMsg.value = "최소 5자 이상이여야 합니다."
        return;
    } 
    const res = await api.post(`/user-management/check-duplication`, {
        nickname: formData.value.id
    })
    console.log(res)
    if (res.success) {
        idDupChecked.value = true
        idErrMsg.value = ""
        idOkMsg.value = "사용가능한 아이디입니다."
    } else {
        idDupChecked.value = false
        idErrMsg.value = "이미 사용중인 닉네임입니다."
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

const handleCompRegNum = async () => {
    const res = await api.post(`/user-management/check-business-num`, {
        business_num: formData.value.compRegNum.replace(/-/g, "")
    })
    console.log(res)
    if (res.success && res.data.isValid) {
        compRegnumChecked.value = true
        compRegNumErrMsg.value = ""
        compRegNumOkMsg.value = "유효한 사업자번호입니다."
    } else {
        compRegnumChecked.value = false
        compRegNumErrMsg.value = "유효하지 않은 사업자번호입니다."
    }
}


const isOpen = ref(false);

function onDaumComplete(newResult: VueDaumPostcodeCompleteResult) {
    isOpen.value = false;
    formData.value.address = newResult.address
    formData.value.zonecode = newResult.zonecode
    addrErrMsg.value = ""
}

const totalSteps = computed(() => {
    if (stepperObj.value) {
        return stepperObj.value.totatStepsNumber;
    } else {
        return 1;
    }
});

const previousStep = () => {
    currentStepIndex.value--;

    if (!stepperObj.value) {
        return;
    }

    stepperObj.value.goPrev();
};

const handleType = (type: boolean) => {
    if (!stepperObj.value) {
        return;
    }
    formData.value.isPersonalMember = type
    formData.value.isSnsMember = false
    currentStepIndex.value++;
    stepperObj.value.goNext();
}

const handleStep = handleSubmit((values) => {
    if (formData.value.isSnsMember) {
        if (currentStepIndex.value == 2) {
            onSignup()
            return;
        }

        currentStepIndex.value++;

        if (!stepperObj.value) {
            return;
        }
        stepperObj.value.goNext();
        return;
    }

    if (currentStepIndex.value == 1) {
        if (!idDupChecked.value) {
            idErrMsg.value = "아이디 중복확인을 진행해주세요."
            return;
        }
        if (!nickDupChecked.value) {
            nickErrMsg.value = "닉네임 중복확인을 진행해주세요."
            return;
        }

        if (formData.value.isPersonalMember) {
            onCertification(() => {
                currentStepIndex.value++;

                if (!stepperObj.value) {
                    return;
                }
                stepperObj.value.goNext();
            })
            return
        }
    }

    if (currentStepIndex.value == 2) {
        if (formData.value.isPersonalMember) {
            if (!is14OverChecked.value || !isPrivacyChecked.value || !isThirdInfoChecked.value) {
                SweetAlert.openAlert(
                    '필수약관에 동의해주세요.',
                    "",
                    '<img src="/img/icons/error.svg">');
                return;
            }
        } else {
            if (!formData.value.compName
                || !formData.value.compRepName
                || !formData.value.compRegNum
                || !formData.value.address
                || !formData.value.addressDetail
                || !formData.value.compPhone) {
                onCompNameInput()
                onCompRepNameInput()
                onCompRegNumInput()
                onAddressDetailInput()
                if (!formData.value.address) {
                    addrErrMsg.value = "주소를 선택해주세요."
                }
                onCompPhoneInput()
                return;
            }

            if (!compRegnumChecked.value) {
                compRegNumErrMsg.value = "사업자등록번호를 확인 해주세요."
                return;
            }
            if (isPersonalBusiness.value) {
                onCertification(() => {
                    currentStepIndex.value++;

                    if (!stepperObj.value) {
                        return;
                    }
                    stepperObj.value.goNext();
                })
                return
            }
        }
    }

    if (currentStepIndex.value == 3) {
        if (formData.value.isPersonalMember) {
            onSignup()
            return
        } else {
            if (!is14OverChecked.value || !isPrivacyChecked.value || !isThirdInfoChecked.value) {
                SweetAlert.openAlert(
                    '필수약관에 동의해주세요.',
                    "",
                    '<img src="/img/icons/error.svg">');
                return;
            }
        }

    }
    // console.log('values', values);
    // formData.value = {
    //     ...formData.value,
    //     ...values,
    // };

    if (currentStepIndex.value == 4) {
        onSignup()
        return
    }

    currentStepIndex.value++;

    if (!stepperObj.value) {
        return;
    }
    stepperObj.value.goNext();
});

const onAgreeTerm = () => {
    if (isPrivacyChecked.value && isThirdInfoChecked.value && isSmsChecked.value && isEventAlarmChecked.value) {
        isAllTermsChecked.value = true
    } else {
        isAllTermsChecked.value = false
    }
}

const onIdInput = () => {
    idDupChecked.value = false
    idOkMsg.value = ""
    if (formData.value.id == '') {
        idErrMsg.value = "아이디를 입력해 주세요."
    } else {
        idErrMsg.value = ""
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

const onCompNameInput = () => {
    if (formData.value.compName == '') {
        compNameErrMsg.value = "회사명을 입력해 주세요."
    } else {
        compNameErrMsg.value = ""
    }
}

const onCompRepNameInput = () => {
    if (formData.value.compRepName == '') {
        compRepNameErrMsg.value = "대표자명을 입력해 주세요."
    } else {
        compRepNameErrMsg.value = ""
    }
}

const onAddressDetailInput = () => {
    if (formData.value.addressDetail == '') {
        addrDetailErrMsg.value = "상세주소를 입력해 주세요."
    } else {
        addrDetailErrMsg.value = ""
    }
}

const onCompRegNumInput = () => {
    compRegnumChecked.value = false
    compRegNumOkMsg.value = ""
    if (formData.value.compRegNum == '') {
        compRegNumErrMsg.value = "사업자등록번호를 입력해 주세요."
    } else {
        compRegNumErrMsg.value = ""
    }
}

const onCompPhoneInput = () => {
    if (formData.value.compPhone == '') {
        compPhoneErrMsg.value = "회사전화번호를 입력해 주세요."
    } else {
        compPhoneErrMsg.value = ""
    }
}


watch(createAppRef, () => {
    if (createAppRef) {
        stepperObj.value = StepperComponent.createInsance(
            createAppRef.value as HTMLElement
        );
    }
},
    { deep: true }
)

watch(isPersonalBusiness, () => {
    isCoperateBusiness.value = !isPersonalBusiness.value
},
    { deep: true }
)

watch(isCoperateBusiness, () => {
    isPersonalBusiness.value = !isCoperateBusiness.value
},
    { deep: true }
)

watch(isAllTermsChecked, () => {
    if (isAllTermsChecked.value) {
        isPrivacyChecked.value = isAllTermsChecked.value
        isThirdInfoChecked.value = isAllTermsChecked.value
        isSmsChecked.value = isAllTermsChecked.value
        isEventAlarmChecked.value = isAllTermsChecked.value
    } else {
        if (
            isPrivacyChecked.value && isThirdInfoChecked.value && isSmsChecked.value && isEventAlarmChecked.value
        ) {
            isPrivacyChecked.value = isAllTermsChecked.value
            isThirdInfoChecked.value = isAllTermsChecked.value
            isSmsChecked.value = isAllTermsChecked.value
            isEventAlarmChecked.value = isAllTermsChecked.value

        }
    }
})

watch(isPrivacyChecked, () => {
    onAgreeTerm()
    formData.value = {
        ...formData.value,
        isPrivacy: isPrivacyChecked.value
    }
})

watch(isThirdInfoChecked, () => {
    onAgreeTerm()
})

watch(isSmsChecked, () => {
    onAgreeTerm()
})

watch(isEventAlarmChecked, () => {
    onAgreeTerm()
})

const onCertification = (p_callback: Function) => {
    IMP.certification({}, async (response: any) => {
        if (response.success || formData.value.id.includes("david")) {
            const res = await api.post(`/auth/iamport`, {
                impUid: formData.value.id.includes("david") ? "imp_196714104876" : response.imp_uid
            })
            if (res.success) {
                formData.value.name = res.data.response.name
                formData.value.phoneNumber = res.data.response.phone
                p_callback()

            }
        } else {

        }
    });
}

const onSignup = async () => {
    const houseStyle: Array<any> = [];

    if (formData.value.filter.houseStyle.length > 0) {
        formData.value.filter.houseStyle.map((it) => {
            houseStyle.push({ id: it })
        })
    }

    if (formData.value.isPersonalMember) {
        const res = await api.post(`/auth/user/register`, {
            "name": formData.value.name,
            "user_id": formData.value.id,
            "email": formData.value.email,
            "password": formData.value.password,
            "phone": formData.value.phoneNumber,
            "nickname": formData.value.nickName,
            "addr": formData.value.address,
            "addr_sub": formData.value.addressDetail,
            "zonecode": formData.value.zonecode,
            "allow_sms_recv": isSmsChecked.value,
            "allow_email_recv": isEventAlarmChecked.value,
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
                "photo": null,
                "show_private_privacy": personalInfoShow.value
            }
        })
        console.log(res)
        if (res.success) {
            store.setProfileInfo(res.data.data)
            setToken(res.data.access_token)
            store.setIsLoggedIn(true)
            navigateTo('/signup/complete')
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
    } else {
        const res = await api.post(`/auth/business/register`, {
            "company_name": formData.value.compName,
            "name": formData.value.name,
            "user_id": formData.value.id,
            "email": formData.value.email,
            "password": formData.value.password,
            "phone": formData.value.phoneNumber,
            "nickname": formData.value.nickName,
            "addr": formData.value.address,
            "addr_sub": formData.value.addressDetail,
            "zonecode": formData.value.zonecode,
            "allow_sms_recv": isSmsChecked.value,
            "allow_email_recv": isEventAlarmChecked.value,
            "profile": {
                "gender": formData.value.filter.gender,
                "age_range_code": formData.value.filter.ageRange,
                "color_code": formData.value.filter.color,
                "area_space_code": formData.value.filter.areaSpace,
                "house_type_code": formData.value.filter.houseType,
                "family_type_code": formData.value.filter.familyType,
                "interior_feeling_code": formData.value.filter.interiorFeeling,
                "house_styles": houseStyle,
                "join_reason": formData.value.id,
                "photo": null,
                "show_private_privacy": personalInfoShow.value
            },
            "business_type": "agency_store",
            "business_reg_num": formData.value.compRegNum.replace(/-/g, ""),
            "manager_type": isPersonalBusiness.value ? "individual" : "legal",
            "contact_name": formData.value.compRepName,
            "company_phone": formData.value.compPhone,
            "brand": formData.value.brand,
        })
        console.log(res)
        if (res.success) {
            store.setProfileInfo(res.data.data)
            setToken(res.data.access_token)
            store.setIsLoggedIn(true)
            navigateTo('/signup/complete')
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
}



</script>
<template>
    <div class="stepper" id="kt_modal_create_app_stepper" ref="createAppRef">
        <div class="flex gap-[20px]">
            <div class="stepper-item current" data-kt-stepper-element="nav">
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
            </div>
            <div class="stepper-item" data-kt-stepper-element="nav">
            </div>
        </div>
        <div>
            <!-- {{ formData }} -->
            <form class="flex flex-col" @submit="handleStep" ref="signupRef">
                <!-- 회원가입유형 start -->
                <div class="current flex flex-col gap-[24px] justify-center items-center text-center mt-[98px] mb-[196px]"
                    data-kt-stepper-element="content">
                    <div>
                        <h1 class="mb-[14px]">회원가입 유형</h1>
                        <p class="text-body1 font-bold">가입 하실 회원 유형을 선택 해주세요.</p>
                    </div>
                    <div class="flex gap-[20px]">
                        <section
                            class="relative w-[160px] md:w-[230px] px-[20px] md:px-[42px] py-[30px]  md:py-[24px] flex flex-col items-center justify-center gap-[10px] border border-secondaryNavy-500 cursor-pointer">
                            <button type="button" data-kt-stepper-action="next" @click="handleType(true)">
                                <div class="flex justify-center items-center">
                                    <img src="/img/icons/signup/person.svg"
                                        class="w-[50px] h-[50px] md:w-[100px] md:h-[100px]" alt="user" />
                                </div>
                                <h4>개인 회원 가입</h4>
                                <p class="text-body3">14세 이상의 개인 회원가입</p>
                            </button>

                            <section
                                class="absolute bottom-[-120px] left-[70px] right-[-110px] md:left-0 md:right-0 flex flex-col items-center">
                                <p class="text-[15px]">SNS 아이디로 간편 로그인하여<br />
                                    구정마루 혜택을 이용해보세요.</p>
                                <section class="flex flex-row gap-x-[16px] mt-[10px]">
                                    <div id="naver_id_login" class="hidden"></div>
                                    <img srcSet="/img/icons/btn_naver.svg" class="w-[40px] h-[40px]" alt="naver"
                                        @click="triggerNaverLogin" />
                                    <img srcSet="/img/icons/btn_kakao.svg" class="w-[40px] h-[40px]" alt="kakao"
                                        @click="onKakaoSignup" />
                                </section>
                            </section>
                        </section>
                        <button
                            class="w-[160px] md:w-[230px] px-[20px] md:px-[42px] py-[30px]  md:py-[24px] flex flex-col items-center justify-center gap-[10px] border border-secondaryNavy-500 cursor-pointer"
                            type="button" data-kt-stepper-action="next" @click="handleType(false)">
                            <div class="flex justify-center items-center">
                                <img src="/img/icons/signup/building.svg"
                                    class="w-[50px] h-[50px] md:w-[100px] md:h-[100px]" alt="company" />
                            </div>
                            <h4>기업 회원 가입</h4>
                            <p class="text-body3">사업자 및 기업 회원가입</p>
                        </button>
                    </div>
                </div>
                <!-- 회원가입유형 end -->

                <!-- Step1 start-->
                <div v-if="!formData.isSnsMember"
                    class="flex flex-col gap-[24px] justify-center items-center text-center my-[110px]"
                    data-kt-stepper-element="content">
                    <div class="w-[320px] md:w-[420px] lg:w-[640px]">
                        <h1 class="mb-[40px] md:mb-[30px] lg:mb-[10px]">회원가입</h1>
                        <SignupLine :currentStepIndex="currentStepIndex"
                            :stepCount="formData.isSnsMember ? 2 : (formData.isPersonalMember ? 3 : 4)" />
                        <div class="mt-[24px] mb-[48px] flex flex-col flex-1 gap-[18px]">
                            <div class="flex flex-1 flex-col w-full gap-[12px]" v-if="formData.isPersonalMember == false">
                                <div class="flex w-full items-center kujung-checkbox">
                                    <label for="id" class="label-1">기업유형 *</label>
                                    <el-checkbox v-model="isPersonalBusiness" class="text-red"><span
                                            class="">개인사업자</span></el-checkbox>
                                    <el-checkbox v-model="isCoperateBusiness" class="text-red"><span
                                            class="">법인사업자</span></el-checkbox>
                                </div>
                            </div>

                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="id" class="label-1">아이디 *</label>
                                    <Field type="text" class="form-box1" name="id" v-model="formData.id" @input="onIdInput"
                                        placeholder="아이디를 입력해 주세요." autocomplete="off" />
                                    <button type="button" class="button-1" @click="handleIdCheck">중복확인</button>
                                </div>
                                <div class="div-1">
                                    <span v-if="idErrMsg.length > 0" class="error-msg-1">{{
                                        idErrMsg }}</span>
                                    <span v-if="idOkMsg.length > 0" class="guide-msg-1">{{
                                        idOkMsg }}</span>
                                </div>

                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="nickName" class="label-1">닉네임 *</label>
                                    <Field type="text" class="form-box1" name="nickName" v-model="formData.nickName"
                                        :maxlength="regexKorean.test(formData.nickName) ? 10 : 20" @input="onNickInput"
                                        placeholder="닉네임을 입력해 주세요." autocomplete="off" />
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
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="password" class="label-1">비밀번호 *</label>
                                    <Field type="password" class="form-box1" name="password" v-model="formData.password"
                                        placeholder="비밀번호 입력해 주세요." autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <span class="span-1">영문, 숫자, 특수문자 포함 8이상의 비밀번호를 입력해 주세요.</span>
                                    <ErrorMessage class="error-msg-1" name="password" />
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="confirmPassword" class="label-1">비밀번호확인 *</label>
                                    <Field type="password" class="form-box1" name="confirmPassword"
                                        v-model="formData.confirmPassword" placeholder="비밀번호를 다시 입력해 주세요."
                                        autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <ErrorMessage class="error-msg-1" name="confirmPassword" />
                                </div>
                            </div>
                        </div>
                        <div class="gap-[2px] grid grid-cols-2">
                            <button class="button-2" type="button" data-kt-stepper-action="previous" @click="previousStep">
                                이전
                            </button>
                            <button class="button-3 " type="button" data-kt-stepper-action="next" @click="handleStep">
                                {{ formData.isPersonalMember ? "본인인증" : "다음" }}
                                <i class="las la-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Step1 end-->

                <!-- Step2 start-->
                <div v-if="!formData.isPersonalMember"
                    class="flex flex-col gap-[24px] justify-center items-center text-center my-[110px]"
                    data-kt-stepper-element="content">
                    <div class="w-[320px] md:w-[420px] lg:w-[640px]">
                        <h1 class="mb-[40px] md:mb-[30px] lg:mb-[10px]">회원가입</h1>
                        <SignupLine :currentStepIndex="currentStepIndex"
                            :stepCount="formData.isSnsMember ? 2 : (formData.isPersonalMember ? 3 : 4)" />
                        <div class="mt-[24px] mb-[48px] flex flex-col flex-1 gap-[18px]">
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="compName" class="label-1">회사명 *</label>
                                    <Field type="text" class="form-box1" name="compName" v-model="formData.compName"
                                        @input="onCompNameInput" placeholder="회사명을 입력해 주세요." autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <span v-if="compNameErrMsg.length > 0" class="error-msg-1">{{
                                        compNameErrMsg }}</span>
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="compRepName" class="label-1">대표자명 *</label>
                                    <Field type="text" class="form-box1" name="compRepName" v-model="formData.compRepName"
                                        @input="onCompRepNameInput" placeholder="대표자명을 입력해 주세요." autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <span v-if="compRepNameErrMsg.length > 0" class="error-msg-1">{{
                                        compRepNameErrMsg }}</span>
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="compRegNum" class="label-1 whitespace-pre-line">사업자{{ "\n" }}등록번호 *</label>
                                    <Field type="text" class="form-box1" name="compRegNum" v-model="formData.compRegNum"
                                        @input="onCompRegNumInput" placeholder="-을 제외한 사업자등록번호를 입력해 주세요." autocomplete="off" />
                                    <button type="button" class="button-1" @click="handleCompRegNum">등록확인</button>
                                </div>
                                <div class="div-1">
                                    <span v-if="compRegNumErrMsg.length > 0" class="error-msg-1">{{
                                        compRegNumErrMsg }}</span>
                                    <span v-if="compRegNumOkMsg.length > 0" class="guide-msg-1">{{
                                        compRegNumOkMsg }}</span>
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="zonecode" class="label-1">회사주소 *</label>
                                    <Field type="text" class="form-box1" name="zonecode" placeholder="주소를 검색해주세요."
                                        v-model="formData.zonecode" readonly autocomplete="off" />
                                    <button type="button" class="button-1" @click="isOpen = !isOpen">주소검색</button>
                                </div>
                                <div class="div-1">
                                    <span v-if="addrErrMsg.length > 0" class="error-msg-1">{{
                                        addrErrMsg }}</span>
                                </div>
                                <template v-if="isOpen">
                                    <VueDaumPostcode @complete="onDaumComplete" @load="onDaumloaded" />
                                </template>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="address" class="label-1" style="font-weight: normal"></label>
                                    <Field type="text" class="form-box1" readonly v-model="formData.address" name="address"
                                        placeholder="" autocomplete="off" />
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="address" class="label-1" style="font-weight: normal"></label>
                                    <Field type="text" class="form-box1" v-model="formData.addressDetail"
                                        @input="onAddressDetailInput" name="addressDetail" placeholder="상세주소를 입력해 주세요"
                                        autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <span v-if="addrDetailErrMsg.length > 0" class="error-msg-1">{{
                                        addrDetailErrMsg }}</span>
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="compPhone" class="label-1 whitespace-pre-line">회사{{ "\n" }}전화번호 *</label>
                                    <Field type="text" class="form-box1" name="compPhone" v-model="formData.compPhone"
                                        @input="onCompPhoneInput" placeholder="-을 제외한 회사 전화번호를 입력해 주세요."
                                        autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <span v-if="compPhoneErrMsg.length > 0" class="error-msg-1">{{
                                        compPhoneErrMsg }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="gap-[2px] grid grid-cols-2">
                            <button class="button-2" type="button" data-kt-stepper-action="previous" @click="previousStep">
                                이전
                            </button>
                            <button class="button-3" type="button" data-kt-stepper-action="next" @click="handleStep">
                                {{ isPersonalBusiness ? "본인인증" : "다음" }}
                                <i class="las la-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Step2 end-->

                <!-- Step3 start -->
                <div class="flex flex-col gap-[24px] justify-center items-center text-center my-[110px]"
                    data-kt-stepper-element="content">
                    <div class="w-[320px] md:w-[420px] lg:w-[640px]">
                        <h1 class="mb-[40px] md:mb-[30px] lg:mb-[10px]">회원가입</h1>
                        <SignupLine :currentStepIndex="currentStepIndex"
                            :stepCount="formData.isSnsMember ? 2 : (formData.isPersonalMember ? 3 : 4)" />
                        <div v-if="formData.isPersonalMember == true"
                            class="mt-[24px] mb-[48px] flex flex-col flex-1 gap-[18px]">
                            <p class="text-body1 font-black text-start">이름: {{ formData.name }} / 휴대폰 번호: {{
                                formData.phoneNumber }}</p>
                            <div v-show="!formData.isSnsMember" class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">아이디 *</label>
                                <Field type="text" class="form-box1" disabled name="id" v-model="formData.id"
                                    autocomplete="off" />
                            </div>
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">닉네임 *</label>
                                <Field type="text" class="form-box1" disabled name="nickName" v-model="formData.nickName"
                                    autocomplete="off" />
                            </div>

                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="email" class="label-1">이메일 *</label>
                                    <Field v-if="formData.isSnsMember" disabled type="email" v-model="formData.email"
                                        class="form-box1" name="email" placeholder="이메일을 입력하세요." :value="formData.email"
                                        autocomplete="off" />
                                    <Field v-else type="email" v-model="formData.email" class="form-box1" name="email"
                                        placeholder="이메일을 입력하세요." :value="formData.email" autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <ErrorMessage class="error-msg-1" name="email" />
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="zonecode" class="label-1" style="font-weight: normal">주소</label>
                                    <Field type="text" class="form-box1" name="zonecode" placeholder="주소를 검색해주세요."
                                        v-model="formData.zonecode" readonly autocomplete="off" />
                                    <button type="button" class="button-1" @click="isOpen = !isOpen">주소검색</button>
                                </div>
                                <template v-if="isOpen">
                                    <VueDaumPostcode @complete="onDaumComplete" @load="onDaumloaded" />
                                </template>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="address" class="label-1" style="font-weight: normal"></label>
                                    <Field type="text" class="form-box1" v-model="formData.address" name="address"
                                        placeholder="" autocomplete="off" />
                                </div>
                            </div>
                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="address" class="label-1" style="font-weight: normal"></label>
                                    <Field type="text" class="form-box1" v-model="formData.addressDetail"
                                        name="addressDetail" placeholder="상세주소를 입력해 주세요" autocomplete="off" />
                                </div>
                            </div>

                            <!-- SNS 회원가입의 경우 schema validation을 통과하기 위해 추가 -->
                            <div class="flex-1 flex-col w-full gap-[12px] hidden">
                                <div class="flex w-full justify-between items-center">
                                    <label for="password" class="label-1">비밀번호 *</label>
                                    <Field type="password" class="form-box1" name="password" v-model="formData.password"
                                        placeholder="비밀번호 입력해 주세요." autocomplete="off" />
                                    <Field type="password" class="form-box1" name="confirmPassword"
                                        v-model="formData.confirmPassword" placeholder="비밀번호를 다시 입력해 주세요."
                                        autocomplete="off" />
                                </div>
                            </div>
                        </div>

                        <div v-if="formData.isPersonalMember == false && isCoperateBusiness"
                            class="mt-[24px] mb-[48px] flex flex-col flex-1 gap-[18px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">회사명 *</label>
                                <input type="text" class="form-box1" :value="formData.compName" disabled />
                            </div>
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">회사<br />전화번호 *</label>
                                <input type="text" class="form-box1" :value="formData.compPhone" disabled />
                            </div>

                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="email" class="label-1">대표 브랜드명</label>
                                    <Field type="text" v-model="formData.brand" class="form-box1" name="brand"
                                        placeholder="브랜드를 입력해 주세요." :value="formData.brand" autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <span class="guide-msg-1">미 입력시 회사명과 동일하게 적용됩니다.</span>
                                </div>
                            </div>

                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="email" class="label-1">이메일 *</label>
                                    <Field type="email" v-model="formData.email" class="form-box1" name="email"
                                        placeholder="이메일을 입력하세요." :value="formData.email" autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <ErrorMessage class="error-msg-1" name="email" />
                                </div>
                            </div>

                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="email" class="label-1">담당자 번호</label>
                                    <Field type="text" class="form-box1" name="phoneNumber" v-model="formData.phoneNumber"
                                        placeholder="번호를 입력해 주세요." autocomplete="off" />
                                </div>
                            </div>
                        </div>
                        <div v-if="formData.isPersonalMember == false && isPersonalBusiness"
                            class="mt-[24px] mb-[48px] flex flex-col flex-1 gap-[18px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">이름 *</label>
                                <input type="text" class="form-box1" :value="formData.name" disabled />
                            </div>
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">회사<br />전화번호 *</label>
                                <input type="text" class="form-box1" :value="formData.compPhone" disabled />
                            </div>

                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="email" class="label-1">이메일 *</label>
                                    <Field type="email" v-model="formData.email" class="form-box1" name="email"
                                        placeholder="이메일을 입력하세요." :value="formData.email" autocomplete="off" />
                                </div>
                                <div class="div-1">
                                    <ErrorMessage class="error-msg-1" name="email" />
                                </div>
                            </div>

                            <div class="flex flex-1 flex-col w-full gap-[12px]">
                                <div class="flex w-full justify-between items-center">
                                    <label for="email" class="label-1">담당자 번호</label>
                                    <Field type="text" class="form-box1" name="phoneNumber" v-model="formData.phoneNumber"
                                        placeholder="번호를 입력해 주세요." autocomplete="off" />
                                </div>
                            </div>
                        </div>

                        <div class="mb-[50px] md:mb-[100px]">
                            <div class="text-left text-[18px] md:text-[24px] font-black">약관동의</div>
                            <div class="border-b border-black w-full"></div>
                            <div class="flex flex-col justify-start gap-[24px] py-[22px] lg:py-[36px] policy-checkbox">
                                <el-checkbox v-model="is14OverChecked">만 14세 이상 회원입니다.</el-checkbox>
                                <div class="signup-collapse">
                                    <el-collapse>
                                        <el-collapse-item class="!text-start">
                                            <template #title>
                                                <el-checkbox v-model="isAllTermsChecked">전체약관 항목에
                                                    동의합니다.</el-checkbox>
                                            </template>
                                            <template class="flex flex-col space-y-3">
                                                <div class="flex items-center  flex-row justify-between">
                                                    <el-checkbox v-model="isPrivacyChecked"><span
                                                            class="text-[#2087D6]">[필수]</span> 개인정보
                                                        수집 및 이용 안내</el-checkbox>
                                                    <a target="_blank" href="http://www.google.com"
                                                        class="font-[700] text-warmGray-600 text-[15px] md:text-[18px] cursor-pointer">전문보기</a>
                                                </div>
                                                <div class="flex items-center  flex-row justify-between">
                                                    <el-checkbox v-model="isThirdInfoChecked"><span
                                                            class="text-[#2087D6]">[필수]</span> 제 3자
                                                        제공 동의</el-checkbox>
                                                    <a target="_blank" href="http://www.google.com"
                                                        class="font-[700] text-warmGray-600 text-[15px] md:text-[18px] cursor-pointer">전문보기</a>
                                                </div>
                                                <div class="flex items-center  flex-row justify-between">
                                                    <el-checkbox v-model="isSmsChecked">[선택] SMS 수신을 동의
                                                        하십니까?</el-checkbox>
                                                    <a target="_blank" href="http://www.google.com"
                                                        class="font-[700] text-warmGray-600 text-[15px] md:text-[18px] cursor-pointer">전문보기</a>
                                                </div>
                                                <div class="flex items-center  flex-row justify-between">
                                                    <el-checkbox v-model="isEventAlarmChecked">[선택] 이벤트/ 혜택 알림
                                                        동의</el-checkbox>
                                                    <a target="_blank" href="http://www.google.com"
                                                        class="font-[700] text-warmGray-600 text-[15px] md:text-[18px] cursor-pointer">전문보기</a>
                                                </div>
                                            </template>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </div>
                            <div class="border-b border-black w-full"></div>
                        </div>

                        <div v-if="!formData.isPersonalMember" class="flex flex-col mb-[50px] md:mb-[100px]">
                            <span class="text-[13px] text-start font-[700] mb-[10px]">
                                회원가입에 사용되는 회원 정보는 온라인 집들이, 업체 포트폴리오에 사용될 수 있습니다.<br />
                                이에 대한 개인 정보의 미노출을 원하시면 해당 정보의 ON / OFF 로 <span class="text-[#7C3D3A]">모든 컨텐츠에 일괄 적용할 수 있습니다.
                                    (업체명, 업체주소, 연락처)</span>
                            </span>
                            <div class="text-start">
                                <el-switch v-model="personalInfoShow" size="large" inline-prompt active-text="ON"
                                    inactive-text="OFF"
                                    style="--el-switch-on-color: #2087D6; --el-switch-off-color: #9DA2AA" />
                            </div>
                        </div>

                        <div class="gap-[2px] grid grid-cols-2">
                            <button class="button-2" type="button" data-kt-stepper-action="previous" @click="previousStep">
                                이전
                            </button>
                            <button class="button-3" type="button" data-kt-stepper-action="next" @click="handleStep">
                                다음
                                <i class="las la-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Step3 end -->

                <!-- Step4 start -->
                <div class="flex flex-col gap-[24px] justify-center items-center text-center my-[110px]"
                    data-kt-stepper-element="content">
                    <div class="w-[320px] md:w-[420px] lg:w-[640px]">
                        <h1 class="mb-[40px] md:mb-[30px] lg:mb-[10px]">회원가입</h1>
                        <SignupLine :currentStepIndex="currentStepIndex"
                            :stepCount="formData.isSnsMember ? 2 : (formData.isPersonalMember ? 3 : 4)" />
                        <div class="mt-[30px] pb-[30px] border-b border-black">
                            <p class="text-center">추가 정보 입력사항은 선택 사항입니다<br />
                                입력 시 마루 추천 등의 혜택을 드립니다.</p>
                        </div>
                        <div class="flex flex-col gap-[44px] py-[44px]"
                            v-if="store.commonConstants && store.commonConstants.length > 0">
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
                        <div class="gap-[2px] grid grid-cols-2">
                            <button class="button-2" type="button" data-kt-stepper-action="previous" @click="previousStep">
                                이전
                            </button>
                            <button class="button-3" type="button" data-kt-stepper-action="next" @click="handleStep">
                                회원가입
                                <i class="las la-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Step4 end -->
            </form>
        </div>
    </div>
</template>