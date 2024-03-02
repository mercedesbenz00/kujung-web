<script setup lang="ts">
const route = useRoute();
import { CommonConstantType, FileCategoryType } from '~/ts/constants';
import { useFileDialog } from '@vueuse/core';
import { api, uploadFiles } from '~/ts/api';
import { useStore } from '~/stores/common';
import { QuestionAndAnswer } from '~/ts/interfaces/QuestionAndAnswer';
import { QuestionStatus } from '~/ts/constants';
import SweetAlert from '~/ts/sweet-alert';
import { Common } from '~/ts/_utils/common';
import { comma } from 'postcss/lib/list';

// meta
definePageMeta({
    layout: 'page',
    title: '1:1 문의'
});

const { files, open, reset } = useFileDialog()

const store = useStore()

const editId = Number(route.query.editId);
const info = ref<QuestionAndAnswer>()

const commandList = ref(
    [{ name: "전체", selected: true, type: 0 },
    ])


export interface ISelectedFile {
    file: File,
    url: string
}

onMounted(() => {
    initCommandList()
    if (editId) {
        loadInfo()
    }
})

const title = ref('')
const content = ref('')

watch(() => store.commonConstants, (newConst, oldConst) => {
    if (newConst != null) {
        initCommandList()
    }
})

const loadInfo = () => {
    api.get(
        `/question-and-answer/${editId}`
    )
        .then(response => {
            if (response.success) {
                info.value = response.data

                title.value = info.value?.question_title
                content.value = info.value?.question_content
                const idx = commandList.value.findIndex(it => it.type == info.value?.question_type_info.id)
                commandList.value[idx].selected = true
                info.value?.questionImages?.map(it => {
                    selectedFileList.value.push({ url: it.image_url })
                })
            }
        })
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
}

const initCommandList = () => {
    if (store.commonConstants != null) {
        commandList.value = []
        const tmp = store.commonConstants.find(it => it.type == CommonConstantType.QuestionType)?.items
        tmp?.map(it => {
            commandList.value.push({ name: it.name, selected: false, type: it.id })
        })
    }
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

const onDeleteFile = (index: number) => {
    selectedFileList.value.splice(index, 1)
}

const onRequest = async () => {
    if (editId) { // 수정의 경우
        onUpdateQuestion()
    } else {
        onWriteQuestion()
    }
}

const onWriteQuestion = async () => {
    if (!title.value || !content.value || !commandList.value.find(it => it.selected)) {
        SweetAlert.openAlert(
            '필수정보들을 입력해주세요.',
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
        const fileRes = await uploadFiles(fileArr, FileCategoryType.Question, "y")
        fileRes.map((it: any) => {
            images.push({
                "image_url": it.Location
            })
        })
    }
    const res = await api.post(`/question-and-answer`, {
        "question_title": title.value,
        "question_type_code": commandList.value.find(it => it.selected)?.type,
        "question_content": content.value,
        "questionImages": images,
    })


    if (res.success) {
        Common.showAlert("1:1 문의 등록이 완료되었습니다.", () => {
            navigateTo(`/mypage/my-writes/inquiry-detail?id=${res.data.id}`)
        })
    }
}

const onUpdateQuestion = async () => {
    if (!title.value || !content.value || !commandList.value.find(it => it.selected)) {
        SweetAlert.openAlert(
            '필수정보들을 입력해주세요.',
            "",
            '<img src="/img/icons/error.svg">');
        return;
    }
    const images: Array<any> = [];
    const fileArr: Array<File> = []
    if (selectedFileList.value.length > 0) {
        selectedFileList.value.map(it => {
            if (it.file) {
                fileArr.push(it.file)
            } else {
                images.push({ "image_url": it.url })
            }
        })
        if (fileArr.length > 0) {
            const fileRes = await uploadFiles(fileArr, FileCategoryType.Question, "y")
            fileRes.map((it: any) => {
                images.push({
                    "image_url": it.Location
                })
            })
        }
    }
    const res = await api.put(`/question-and-answer/${editId}`, {
        "question_title": title.value,
        "question_type_code": commandList.value.find(it => it.selected)?.type,
        "question_content": content.value,
        "questionImages": images,
    })


    if (res.success) {
        Common.showAlert("1:1 문의 수정이 완료되었습니다.", () => {
            navigateTo(`/mypage/my-writes/inquiry-detail?id=${editId}`)
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
                    1:1 문의
                </p>

                <section class="w-full px-[30px] py-[24px] bg-[#F2EFE2] border border-[#071222] mt-[30px] flex flex-col">
                    <p class="text-[18px] leading-[24px] text-black font-bold">
                        기본 회원 정보
                    </p>
                    <p class="mt-[8px] text-[12px] leading-[16px] text-secondaryNavy-300">
                        기본 회원정보가 일치하지 않으면, 마이페이지 > 회원정보 수정을 통해 변경해 주세요.
                    </p>
                    <div class="flex flex-row mt-[20px]">
                        <p class="text-[15px] leading-[20px] w-[100px] text-black font-bold">
                            이름
                        </p>
                        <p class="text-[15px] leading-[20px] text-black">
                            {{ store.profileInfo?.name }}
                        </p>
                    </div>
                    <div class="flex flex-row mt-[20px]">
                        <p class="text-[15px] leading-[20px] w-[100px] text-black font-bold">
                            휴대폰 번호
                        </p>
                        <p class="text-[15px] leading-[20px] text-black">
                            {{ store.profileInfo?.phone }}
                        </p>
                    </div>
                    <div class="flex flex-row mt-[20px] w-full">
                        <p class="text-[15px] leading-[20px] w-[100px] text-black font-bold">
                            이메일
                        </p>
                        <p class="text-[15px] leading-[20px] text-black flex-1">
                            {{ store.profileInfo?.email }}
                        </p>
                    </div>
                </section>

                <section class="w-full mt-[80px] flex flex-row px-[20px] md:px-0 justify-between">
                    <p class="text-black text-[18px] md:text-[24px] leading-[20px] md:leading-[30px] font-bold">
                        문의 정보
                    </p>
                    <p class="text-black text-[11px] leading-[15px] font-bold self-end">
                        *필수입력사항
                    </p>
                </section>

                <Line class="mt-[15px]" />

                <div class="w-full flex flex-col px-[20px] md:px-0 mt-[50px] lg:mt-[15px]">
                    <div class="flex flex-col md:flex-row flex-1 items-start md:items-center">
                        <p
                            class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold w-[100px] lg:w-[160px]">
                            분류*</p>
                        <div class="w-full md:w-[280px] mt-[17px] md:mt-0">
                            <el-dropdown class="w-full" trigger="click" @command="handleCommand">
                                <button class="dropdown-btn el-dropdown-link"
                                    :class="commandList.find(it => it.selected) ? 'text-warmGray-900' : 'text-secondarynavy-300'">
                                    <span>
                                        {{ commandList.find(it => it.selected)?.name || "===분류 종류===" }}
                                    </span>
                                    <span>▼</span>
                                </button>
                                <template #dropdown>
                                    <el-dropdown-menu v-for="(command, index) in commandList" :key="index">
                                        <el-dropdown-item :command="command.name">
                                            <button class="w-[245px]">
                                                {{ command.name }}
                                            </button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>

                    <LineGray class="my-[12px]" />

                    <div class="flex flex-col md:flex-row w-full md:items-center mt-[10px] md:mt-0">
                        <p
                            class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold w-[100px] lg:w-[160px]">
                            제목*
                        </p>
                        <div class="mt-[17px] md:mt-0">
                            <input type="text" class="form-box1 w-full md:flex-1 h-[50px]" v-model="title"
                                placeholder="제목을 입력해 주세요." />
                        </div>
                    </div>

                    <LineGray class="my-[12px]" />

                    <div class="flex flex-col md:flex-row w-full md:items-center mt-[10px] md:mt-0">
                        <p
                            class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold w-[100px] lg:w-[160px]">
                            내용*
                        </p>
                        <textarea type="text" v-model="content"
                            class="border p-[10px] border-secondaryNavy-600 outline-none bg-transparent w-full md:flex-1 h-[120px] md:h-[150px] lg:h-[220px] mt-[10px]"
                            placeholder="문의내용을 작성해 주세요." />
                    </div>

                    <Line class="hidden md:flex mt-[30px] lg:mt-[45px]" />

                    <section class="flex flex-col mt-[30px]">
                        <div class="flex flex-col md:flex-row md:items-center">
                            <p
                                class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold w-[100px] lg:w-[160px]">
                                첨부파일
                            </p>
                            <Line class="md:hidden mt-[11px] mb-[23px]" />
                            <div class="flex flex-col md:flex-row md:items-center ">
                                <button class="bg-secondaryNavy-500 text-white h-[40px] w-[120px] text-[13px] font-bold"
                                    @click="open()">
                                    파일선택
                                </button>
                                <p class="text-[13px] text-secondaryNavy-300 leading-[18px] md:ml-[5px] mt-[4px] md:mt-0">
                                    (용량 : 20mb, 첨부가능한 파일 : jpeg, jpg, png)
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <div class="hidden md:flex w-[100px] lg:w-[160px]" />
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
                        </div>

                        <LineGray class="mt-[24px]" />

                        <div class="flex flex-row w-[320px] md:w-[640px] self-center my-[100px] md:my-[110px]">
                            <button
                                class="border border-secondaryNavy-800 bg-warmGray-400 text-[15px] font-bold text-secondaryBlue-800 h-[70px] flex-1">
                                취소
                            </button>
                            <button
                                class="border border-secondaryNavy-800 bg-secondaryNavy-800 text-[15px] font-bold text-white h-[70px] flex-1"
                                @click="onRequest">
                                {{ editId ? "수정완료" : "문의하기" }}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>