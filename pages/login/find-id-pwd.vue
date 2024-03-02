<script setup lang="ts">
import { useForm, Field, ErrorMessage, useFormValues } from "vee-validate";
import { Common } from "~/ts/_utils/common";
import { api } from "~/ts/api";
import SweetAlert from "~~/ts/sweet-alert";
// meta
definePageMeta({
    layout: 'page',
    title: '아이디/비밀번호 찾기'
});

const isIdTab = ref(true)
const name = ref("")
const nameInfoMsg = ref("")
const phone = ref("")
const phoneInfoMsg = ref("")
const userId = ref("")
const userIdInfoMsg = ref("")

const certCode = ref("")
const certCodeInfoMsg = ref("")
const remainSeconds = ref(0)

let timer: any

const clearAll = () => {
    name.value = ""
    nameInfoMsg.value = ""
    phone.value = ""
    phoneInfoMsg.value = ""
    userId.value = ""
    userIdInfoMsg.value = ""
    certCode.value = ""
    certCodeInfoMsg.value = ""
    remainSeconds.value = 0
    clearInterval(timer)
}

const onFindId = async () => {
    if (!name.value) {
        nameInfoMsg.value = "이름을 입력해주세요."
        return;
    }
    if (!phone.value) {
        phoneInfoMsg.value = "휴대폰번호를 입력해주세요."
        return;
    }
    if (!certCode.value) {
        certCodeInfoMsg.value = "인증번호를 입력해주세요."
        return;
    }

    const res = await api.post('auth/user/find-id', {
        name: name.value,
        phone: phone.value,
        sms_code: certCode.value,
    })
    if (res.success) {
        SweetAlert.openAlert(
            '아이디 찾기 완료',
            "<p class='text-[15px] font-medium'>입력하신 휴대폰번호로<br/> 아이디가 발송되었습니다.</p>",
            '<img src="/img/icons/error.svg">');
        navigateTo("/login")
    } else {

    }
}

const onFindPwd = async () => {

    if (!name.value) {
        nameInfoMsg.value = "이름을 입력해주세요."
        return;
    }
    if (!userId.value) {
        userIdInfoMsg.value = "아이디를 입력해주세요."
        return;
    }
    if (!phone.value) {
        phoneInfoMsg.value = "휴대폰번호를 입력해주세요."
        return;
    }
    if (!certCode.value) {
        certCodeInfoMsg.value = "인증번호를 입력해주세요."
        return;
    }

    const res = await api.post('auth/user/forgot-password', {
        name: name.value,
        user_id: userId.value,
        phone: phone.value,
        sms_code: certCode.value,
    })
    if (res.success) {
        SweetAlert.openAlert(
            '비밀번호 찾기 완료',
            "<p class='text-[15px] font-medium'>회원님께서 가입하신 이메일로<br/> 비밀번호가 발송되었습니다.</p>",
            '<img src="/img/icons/error.svg">');
        navigateTo("/login")
    } else {

    }
}

const onPhoneCertificate = async () => {
    if (!phone.value) {
        phoneInfoMsg.value = "휴대폰번호를 입력해주세요."
        return;
    }
    const res = await api.post('sms-delivery/sms/send', {
        phone: phone.value
    })
    if (res.success) {
        startCountdownTimer()
    }
}

const startCountdownTimer = () => {
    remainSeconds.value = 120
    timer = setInterval(() => {
        remainSeconds.value -= 1
        if (remainSeconds.value == 0) {
            clearInterval(timer)
        }
    }, 1000)
}

const onNameInput = () => {
    nameInfoMsg.value = ""
}

const onPhoneInput = () => {
    phoneInfoMsg.value = ""
}

const onCertCodeInput = () => {
    certCodeInfoMsg.value = ""
}

const onUserIdInput = () => {
    userIdInfoMsg.value = ""
}

const onIdTab = () => {
    clearAll()
    isIdTab.value = true
}

const onPwdTab = () => {
    clearAll()
    isIdTab.value = false
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col gap-[24px] justify-center items-center text-center my-[110px]"
            data-kt-stepper-element="content">
            <div class="w-[320px] md:w-[420px] lg:w-[640px]">
                <h1 class="mb-[40px] md:mb-[32px]">아이디/비밀번호 찾기</h1>

                <div class="gap-[2px] grid grid-cols-2 mt-[50px] md:mt-[34px]">
                    <button :class="isIdTab ? 'button-3' : 'button-2'" type="button" data-kt-stepper-action="previous"
                        @click="onIdTab">
                        아이디 찾기
                    </button>
                    <button :class="!isIdTab ? 'button-3' : 'button-2'" type="button" data-kt-stepper-action="next"
                        @click="onPwdTab">
                        비밀번호 찾기
                    </button>
                </div>
                <div v-if="isIdTab">
                    <p class="text-[11px] md:text-[15px] text-[#2C2B29] mt-[40px] md:mt-[24px]">
                        회원가입 시 입력하신 이름과 휴대폰 번호를 입력하여<br />
                        아이디 찾기를 요청하시면 아이디를 발송해드립니다.
                    </p>
                    <div class="mt-[45px] md:mt-[24px] flex flex-col flex-1 gap-[14px]">
                        <div class="flex flex-1 flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">이름 *</label>
                                <Field type="text" class="form-box1" name="name" v-model="name" placeholder="이름을 입력해 주세요."
                                    autocomplete="off" @input="onNameInput()" />
                            </div>
                            <div class="div-1">
                                <p class="error-msg-1">{{ nameInfoMsg }}</p>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="phoneNumber" class="label-1">휴대폰번호
                                    *</label>
                                <Field type="text" class="form-box1" name="phoneNumber" v-model="phone"
                                    :readonly="remainSeconds > 0" placeholder="휴대폰번호를 입력해 주세요. (-제외)" autocomplete="off"
                                    @input="onPhoneInput()" />
                                <button type="button" class="button-1 disabled:bg-slate-500" :disabled="remainSeconds > 0"
                                    @click="onPhoneCertificate()">인증요청</button>
                            </div>
                            <div class="div-1">
                                <p class="error-msg-1">{{ phoneInfoMsg }}</p>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="sms" class="label-1"></label>
                                <Field type="text" class="form-box1" name="sms" v-model="certCode" @input="onCertCodeInput"
                                    placeholder="인증번호를 입력해주세요." autocomplete="off" />
                                <!-- <button type="button" class="button-1">확인</button> -->
                            </div>
                            <div class="div-1">
                                <p class="error-msg-1">{{ certCodeInfoMsg }}</p>
                                <p class="error-msg-1" v-if="remainSeconds > 0"><span class="text-[#2C2B29]">남은시간 </span>{{
                                    (~~(remainSeconds / 60)).toString().padStart(2, '0') + ":" + (remainSeconds %
                                        60).toString().padStart(2, '0') }}</p>
                            </div>
                        </div>
                    </div>

                    <button class="button-primary-600 mt-[60px] md:mt-[20px]" @click="onFindId">
                        아이디 찾기
                    </button>
                </div>
                <div v-if="!isIdTab">
                    <p class="text-[11px] md:text-[15px] text-[#2C2B29] mt-[40px] md:mt-[24px]">
                        회원회원가입 시 입력하신 이름, 아이디, 휴대폰 번호를 입력하여<br />
                        비밀번호 찾기를 요청하시면 임시 비밀번호를 발송해드립니다.
                    </p>
                    <div class="mt-[45px] md:mt-[24px] flex flex-col flex-1 gap-[14px]">
                        <div class="flex flex-1 flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">이름 *</label>
                                <Field type="text" class="form-box1" name="name" v-model="name" placeholder="이름을 입력해 주세요."
                                    autocomplete="off" @input="onNameInput()" />
                            </div>
                            <div class="div-1">
                                <p class="error-msg-1">{{ nameInfoMsg }}</p>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="id" class="label-1">아이디 *</label>
                                <Field type="text" class="form-box1" name="name" v-model="userId"
                                    placeholder="아이디를 입력해 주세요." autocomplete="off" @input="onUserIdInput()" />
                            </div>
                            <div class="div-1">
                                <p class="error-msg-1">{{ userIdInfoMsg }}</p>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="phoneNumber" class="label-1">휴대폰번호
                                    *</label>
                                <Field type="text" class="form-box1" name="phoneNumber" v-model="phone"
                                    :readonly="remainSeconds > 0" placeholder="휴대폰번호를 입력해 주세요. (-제외)" autocomplete="off"
                                    @input="onPhoneInput()" />
                                <button type="button" class="button-1 disabled:bg-slate-500" :disabled="remainSeconds > 0"
                                    @click="onPhoneCertificate()">인증요청</button>
                            </div>
                            <div class="div-1">
                                <p class="error-msg-1">{{ phoneInfoMsg }}</p>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-col w-full gap-[12px]">
                            <div class="flex w-full justify-between items-center">
                                <label for="sms" class="label-1"></label>
                                <Field type="text" class="form-box1" name="sms" v-model="certCode" @input="onCertCodeInput"
                                    placeholder="인증번호를 입력해주세요." autocomplete="off" />
                                <!-- <button type="button" class="button-1">확인</button> -->
                            </div>
                            <div class="div-1">
                                <p class="error-msg-1">{{ certCodeInfoMsg }}</p>
                                <p class="error-msg-1" v-if="remainSeconds > 0"><span class="text-[#2C2B29]">남은시간 </span>{{
                                    (~~(remainSeconds / 60)).toString().padStart(2, '0') + ":" + (remainSeconds %
                                        60).toString().padStart(2, '0') }}</p>
                            </div>
                        </div>
                    </div>

                    <button class="button-primary-600 mt-[60px] md:mt-[20px]" @click="onFindPwd">
                        비밀번호 찾기
                    </button>
                </div>
            </div>
        </div>
    </PageContainer>
</template>