<script setup lang="ts">
import axios from "axios";
import { Field } from "vee-validate";
import { Common } from "~/ts/_utils/common";
import { API_URL, api, setToken } from '~~/ts/api';
import { NaverProfileInfo } from "~/ts/interfaces/NaverProfileInfo";

// meta
definePageMeta({
    layout: 'page',
    title: '로그인'
});

const userId = ref("")
const userIdErrMsg = ref("")
const password = ref("")
const passwordErrMsg = ref("")

onMounted(() => {
    setTimeout(() => {
        initNaverLogin()
    }, 1000)
});

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
            naverLogin(info.response)
        }
    }
}

const emailLogin = async () => {
    if (!userId.value) {
        userIdErrMsg.value = "아이디를 입력해 주세요."
        return;
    }
    if (!password.value) {
        passwordErrMsg.value = "비밀번호를 입력해 주세요."
        return;
    }
    const res = await api.post(`/auth/user/login`, {
        "user_id": userId.value,
        "password": password.value
    })
    if (res.success) {
        setToken(res.data.access_token)
        location.href = "/"
    } else {
        passwordErrMsg.value = "잘못된 아이디이거나 비밀번호입니다.  다시 입력해 주세요."
        return;
    }
}

const clearErrMsg = () => {
    userIdErrMsg.value = ""
    passwordErrMsg.value = ""
}

const triggerNaverLogin = async () => {
    var btn = document.getElementById("naver_id_login")?.firstChild;
    btn.click()
}

const naverLogin = async (response: NaverProfileInfo) => {
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
        } else {
            Common.showAlert("가입되지 않은 회원입니다.", () => {
            })
            return;
        }
    } catch (error) {
        Common.showAlert("가입되지 않은 회원입니다.", () => {
        })
        return;
    }
}

const kakaoLogin = () => {
    // Kakao.Auth.authorize({
    //     redirectUri: 'http://localhost:3000/login',
    // });
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
                } else {
                    Common.showAlert("가입되지 않은 회원입니다.", () => {
                    })
                    return;
                }
            } catch (error) {
                Common.showAlert("가입되지 않은 회원입니다.", () => {
                })
                return;
            }
        }
    });
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col gap-[24px] justify-center items-center text-center my-[110px]"
            data-kt-stepper-element="content">
            <div class="w-[320px] md:w-[420px] lg:w-[640px]">
                <h1 class="mb-[40px] md:mb-[32px]">로그인</h1>
                <div class="mt-[45px] md:mt-[24px] flex flex-col flex-1 gap-[14px]">
                    <div class="flex flex-1 flex-col w-full gap-[12px]">
                        <div class="flex w-full justify-between items-center">
                            <label for="id" class="label-1">아이디 *</label>
                            <Field type="text" class="form-box1" name="id" v-model="userId" placeholder="아이디를 입력해 주세요." v-on:keyup.enter="emailLogin"
                                autocomplete="off" @input="clearErrMsg" />
                        </div>
                        <div class="div-1">
                            <p class="error-msg-1">{{ userIdErrMsg }}</p>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-col w-full gap-[12px]">
                        <div class="flex w-full justify-between items-center">
                            <label for="password" class="label-1">비밀번호 *</label>
                            <Field type="password" class="form-box1" name="password" v-model="password" v-on:keyup.enter="emailLogin"
                                placeholder="비밀번호 입력해 주세요." autocomplete="off" @input="clearErrMsg" />
                        </div>
                        <div class="div-1">
                            <p class="error-msg-1">{{ passwordErrMsg }}</p>
                        </div>
                    </div>
                </div>

                <button class="button-primary-600 mt-[60px] md:mt-[20px]" @click="emailLogin">
                    로그인
                </button>
                <div id="naver_id_login" class="hidden"></div>
                <div class="flex flex-row justify-end mt-[15px] md:mt-[20px] text-warmGray-800">
                    <button class="text-[15px] text-warmGray-800" @click="navigateTo('/login/find-id-pwd')">아이디/비밀번호
                        찾기</button>
                    &nbsp;| &nbsp;
                    <button class="text-[15px] text-warmGray-800" @click="navigateTo('/signup')">회원가입</button>
                </div>

                <div class="gap-[2px] grid grid-cols-2 mt-[50px] md:mt-[34px]">
                    <button class="button-2" type="button" data-kt-stepper-action="previous" @click="triggerNaverLogin">
                        네이버로 시작하기
                    </button>
                    <button class="button-warmgray-900" type="button" data-kt-stepper-action="next" @click="kakaoLogin">
                        카카오로 시작하기
                    </button>
                </div>
            </div>
        </div>
    </PageContainer>
</template>