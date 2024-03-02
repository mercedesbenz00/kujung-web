<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { api } from '~~/ts/api';
import { SearchTerm } from '~/ts/interfaces/SearchTerm';
import { SearchKeyword } from '~/ts/interfaces/SearchKeyword';
import { LOCAL_STORAGE_PARAMS } from '~/ts/constants';
import lodash from 'lodash'
import { Common } from '~/ts/_utils/common';

defineProps<{
  title?: string
}>()
const emit = defineEmits<{
  (e: 'confirm', keyword: string | null): void,
}>()

onMounted(() => {
  getRecommendSearchTermList()
  getPopularSearchTermList()
  getRecentKeywords()
})

const keyword = ref("")

const recommendKewords = ref<SearchTerm[]>()
const popularKeywords = ref<SearchTerm[]>()
const searchKeywords = ref<SearchKeyword[]>()
const recentKeywords = ref<string[]>()

const getRecommendSearchTermList = async () => {
  const res = await api.get(`/search-term?display=true&type=recommend`)
  if (res.success) {
    recommendKewords.value = res.data.items
  }
}

const getPopularSearchTermList = async () => {
  const res = await api.get(`/search-term?display=true&type=popular`)
  if (res.success) {
    popularKeywords.value = res.data.items
  }
}

const getRecentKeywords = () => {
  const strRecentKeywords = localStorage.getItem(LOCAL_STORAGE_PARAMS.RECENT_KEYWORD)
  if (strRecentKeywords) {
    recentKeywords.value = JSON.parse(strRecentKeywords)
  }
}

const addRecentKeyword = (p_keyword: string) => {
  const strRecentKeywords = localStorage.getItem(LOCAL_STORAGE_PARAMS.RECENT_KEYWORD)
  var recentKeywordList: string[] = []
  if (strRecentKeywords) {
    recentKeywordList = JSON.parse(strRecentKeywords)
  }
  recentKeywordList.unshift(p_keyword)
  recentKeywordList = lodash.uniq(recentKeywordList)
  recentKeywordList = recentKeywordList.slice(0, 5)
  localStorage.setItem(LOCAL_STORAGE_PARAMS.RECENT_KEYWORD, JSON.stringify(recentKeywordList))
}

const onSearch = (p_keyword: string) => {
  if (p_keyword.length > 1) {
    addRecentKeyword(p_keyword)
    emit('confirm', p_keyword)
  } else {
    Common.showInfoToast("최소 2자 이상으로 검색해주세요.")
  }
}

const onRecommendKeywordSearch = (p_item: SearchTerm) => {
  api.post('search-term/count', {
    ids: [p_item.id]
  })
  onSearch(p_item.name)
}

const onPopularKeywordSearch = (p_item: SearchTerm) => {
  api.post('search-term/count', {
    ids: [p_item.id]
  })
  onSearch(p_item.name)
}

const querySearchAsync = async (e: any) => {
  if (e.target.value) {
    const res = await api.get(`/search-keyword/by/autocomplete?q=${e.target.value}`)

    searchKeywords.value = res.data.items ? res.data.items : []
  } else {
    if (!keyword.value) {
      searchKeywords.value = []
    }
  }
}

const handleSelect = (e: any, item: string) => {
  e.stopPropagation()
  keyword.value = item
  onSearch(item)
}

</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal search-modal" content-class="confirm-modal-content w-full h-full"
    overlay-transition="vfm-fade" content-transition="vfm-fade">
    <div class="bg-warmGray-200 flex flex-col items-center justify-start">
      <div class="max-w-[932px] w-full pt-[77px] pb-[117px] flex flex-col px-[20px] md:px-0">
        <div class="flex flex-row">
          <div class="w-full flex flex-col">
            <!-- 검색어 입력부분 -->
            <div class="relative border-b-[1px] border-black flex flex-row flex-1 px-[10px]">
              <input type="search" v-model="keyword" v-on:keyup.enter="onSearch(keyword)"
                class="outline-0 text-[12px] md:text-[30px] leading-[30px] font-bold placeholder-[#717171] bg-transparent px-[10px] w-full"
                @keyup="(e) => querySearchAsync(e)" placeholder="2023 신제품이 궁금하다면?" />
              <button type="button" class="ml-[20px] md:ml-[68px] w-[32px] md:w-[48px] h-[32px] md:h-[48px] flex justify-center items-center self-center 
          top-[4px] md:top-[8px] right-[4px] md:right-[8px]" @click="() => {
            onSearch(keyword)
          }">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-[black] text-[15px] md:text-[25px]" />
              </button>
              <div v-if="searchKeywords?.length > 0"
                class="absolute left-0 right-0 top-[35px] md:top-[60px] h-[300px] bg-white z-10 py-[10px]">
                <el-scrollbar>
                  <div class="flex flex-col items-start">
                    <button v-for="item in  searchKeywords " @click="(e: any) => handleSelect(e, keyword)"
                      class="px-[20px] py-[5px] text-[12px] md:text-[14px] cursor-pointer">
                      {{ item.name }}
                    </button>
                  </div>
                </el-scrollbar>
              </div>
            </div>

            <!-- 추천, 인기, 최근검색어 부분 -->
            <el-scrollbar :height="380">
              <div class="flex flex-col md:flex-row mt-[30px] md:mt-[50px] px-[15px] gap-y-[30px]">
                <div class="flex flex-col flex-[1.2]">
                  <p class="text-[20px] font-bold text-[black]">추천검색어</p>
                  <div class="mt-[10px]">
                    <button v-for=" item  in  recommendKewords " @click="() => {
                      onRecommendKeywordSearch(item)
                    }
                      "
                      class="border border-warmGray-800 h-[30px] md:h-[46px] rounded-[15px] md:rounded-[23px] focus:outline-0 text-warmGray-800 text-[12px] md:text-[15px] px-[15px] mr-[15px] mb-[15px]">
                      #{{ item.name }}
                    </button>
                  </div>
                </div>

                <div class="flex flex-col flex-1 md:mx-[20px]">
                  <p class="text-[20px] font-bold text-[black]">인기검색어</p>
                  <div class="mt-[10px] flex flex-col">
                    <button v-for="( item, index ) in  popularKeywords " @click="() => {
                      onPopularKeywordSearch(item)
                    }
                      "
                      class="h-[15px] text-black text-start text-[12px] md:text-[15px] px-[15px] mr-[15px] mb-[13px] focus:outline-0">
                      {{ index + 1 }}. {{ item.name }}
                    </button>
                  </div>
                </div>


                <div v-if="recentKeywords?.length > 0" class="flex flex-col flex-1">
                  <p class="text-[20px] font-bold text-[black]">최근검색어</p>
                  <div class="mt-[10px]">
                    <button v-for="( item, index ) in  recentKeywords " @click="() => {
                      onSearch(item)
                    }"
                      class="h-[15px] text-black text-start text-[12px] md:text-[15px] px-[15px] mr-[15px] mb-[13px] focus:outline-0">
                      {{ item }}
                    </button>
                  </div>
                </div>

              </div>
            </el-scrollbar>

          </div>

          <!-- 닫기 버튼 -->
          <button type="button" class="ml-[30px] md:ml-[68px] w-[32px] md:w-[48px] h-[32px] md:h-[48px] flex justify-center items-center self-start 
          top-[4px] md:top-[8px] right-[4px] md:right-[8px]" @click="emit('confirm', null)">
            <i class="las la-times text-[black] text-[20px] md:text-[40px]"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex-1" @click="emit('confirm', null)">
    </div>
  </VueFinalModal>
</template>
<style>
.search-modal {
  /* .vfm--overlay {
    background-color: transparent;
  } */
}
</style>
