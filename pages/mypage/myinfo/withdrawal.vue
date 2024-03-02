<script setup lang="ts">
import { Common } from '~/ts/_utils/common';
import { api } from '~/ts/api';
import { useStore } from '~/stores/common';
import { SCREEN_WIDTH } from '~/ts/constants';


const route = useRoute();
const router = useRouter();

const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '회원탈퇴'
});

onMounted(() => {
})

const withdrawalReason = ref("")
const withdrawalReasonDesc = ref("")
const agreeWithdrawal = ref(false);

const onWithdrawal = async () => {
    if (!withdrawalReason.value) {
        Common.showInfoToast("탈퇴사유를 선택해주세요.")
        return;
    }
    if (withdrawalReason.value == "기타" && !withdrawalReasonDesc.value) {
        Common.showInfoToast("사유 내용을 입력해주세요.")
        return;
    }
    const res = await api.post("/user-management/removeAccount", {
        "inactive_reason": withdrawalReason.value,
        "inactive_reason_desc": withdrawalReason.value != "기타" ? '' : withdrawalReasonDesc.value
    })

    if (res.success) {
        sessionStorage.clear()
        store.setProfileInfo(null)
        store.setIsLoggedIn(false)
        navigateTo('/mypage/withdrawal-complete')
    }
}

</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1">
                <section class="hidden md:flex flex-col">
                    <p class="text-[18px] md:text-[30px] text-black font-bold">
                        회원탈퇴
                    </p>
                </section>

                <section class="md:mt-[52px] lg:mt-[32px]">
                    <p class="text-[18px] text-black font-bold">
                        탈퇴 안내 사항
                    </p>
                    <p
                        class="mt-[20px] w-full bg-[#F2EFE2] p-[20px] text-[18px] border border-black outline-0 min-h-[200px]">
                        <b>포인트 소멸</b><br />
                        회원 탈퇴시 보유하고 계신 포인트가 자동 소멸되며, 복원되지 않습니다.<br />
                        적립된 포인트가 있을 시 모두 사용 후 탈퇴해 주세요.<br />
                        <br />
                        <b>개인정보 파기</b><br />
                        개인 정보는 이용약관에 따라 보관 및 파기됩니다.<br />
                        회원 탈퇴시 온라인 집들이, 스마트 케어 서비스 이용내역 등 관련 정보는 모두 삭제됩니다.
                    </p>
                </section>

                <section class="mt-[30px] lg:mt-[50px]">
                    <p class="text-[18px] text-black font-bold">
                        탈퇴사유
                    </p>
                    <div class="mt-[20px] kujung-radio-vertical">
                        <el-radio-group v-model="withdrawalReason">
                            <el-radio :label="'개인정보 노출 우려'">개인정보 노출 우려</el-radio>
                            <el-radio :label="'서비스 불만'">서비스 불만</el-radio>
                            <el-radio :label="'고객응대 부족'">고객응대 부족</el-radio>
                            <el-radio :label="'재가입을 위해서'">재가입을 위해서</el-radio>
                            <el-radio :label="'기타'">기타</el-radio>
                        </el-radio-group>
                    </div>
                    <textarea
                        class="mt-[10px] w-full p-[20px] text-[15px] leading-[20px] border border-black outline-0 min-h-[150px]"
                        :class="withdrawalReason != '기타' ? 'bg-[#F2EFE2]' : ''" v-model="withdrawalReasonDesc"
                        :readonly="withdrawalReason != '기타'" placeholder="내용을 입력 해주세요." />

                    <div class="flex w-full items-start justify-center kujung-checkbox mt-[50px] lg:mt-[70px]">
                        <el-checkbox v-model="agreeWithdrawal" class="self-center"><span
                                class="text-black font-bold text-[12px] md:text-[18px] leading-[216x] md:leading-[24px] whitespace-pre-line">회원
                                탈퇴에 유의사항을 모두 확인하였으며, {{ SCREEN_WIDTH > 600 ? "" : "\n" }} 구정마루 회원 탈퇴에 동의합니다.</span>
                        </el-checkbox>
                    </div>
                </section>
                <div class="flex flex-row w-[320px] md:w-[640px] self-center my-[100px] md:my-[110px]">
                    <button @click="router.back()"
                        class="border border-secondaryNavy-800 bg-warmGray-400 text-[15px] font-bold text-secondaryBlue-800 h-[70px] flex-1">
                        취소
                    </button>
                    <button @click="() => { onWithdrawal() }" :disabled="!agreeWithdrawal"
                        class="border border-secondaryNavy-800 bg-secondaryNavy-800 text-[15px] font-bold text-white h-[70px] flex-1 disabled:bg-secondaryNavy-100">
                        탈퇴하기
                    </button>
                </div>
            </div>

        </div>
    </PageContainer>
</template>

<style lang="scss"></style>