<script lang="ts" setup>
import { api } from '~~/ts/api';
import { VueFinalModal } from 'vue-final-modal'
import { Common } from '~~/ts/_utils/common';
import { Category } from '~/ts/interfaces/Category';
import { Product } from "~/ts/interfaces/Product";
defineProps<{
}>()

const categoryList = ref<Category[]>([])
const productList = ref<Product[]>([])
const selectedCategory = ref<Category | null>(null)
const selectedLargeCat = ref<Category | null>(null)
const selectedMediumCat = ref<Category | null>(null)
const selectedProduct = ref<Product | null>(null)

const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'selectedFloor', product: Product | null): void,
}>()

onMounted(() => {
  loadCategoryList()
});

onUnmounted(() => {
});

const loadCategoryList = () => {
  api.get('/category/tree')
    .then(response => {
      categoryList.value = response.data
    })
}

const deselectAll = () => {
  selectedCategory.value = null
  categoryList.value?.map(depth0 => {
    depth0.selected = false
    if (depth0.children.length > 0) {
      depth0.children.map(depth1 => {
        depth1.selected = false
        if (depth1.children.length > 0) {
          depth1.children.map(depth2 => {
            depth2.selected = false
          })
        }
      })
    }
  })
}

const onCategoryClick = (e: Event, p_selectedCategory: Category) => {
  selectedLargeCat.value = Common.getCurLargeCategory(categoryList.value, p_selectedCategory)
  selectedMediumCat.value = Common.getCurMediumCategory(categoryList.value, p_selectedCategory)

  if (p_selectedCategory.children.length == 0) {
    deselectAll()
    p_selectedCategory.selected = true
    selectedCategory.value = p_selectedCategory
  }
  getProductList()
}

const onFloorSelected = (p_item: Product) => {
  selectedProduct.value = p_item
}

const getProductList = async () => {
  if (selectedLargeCat.value == null)
    return;
  var payLoad = {}
  if (selectedMediumCat.value == null) {
    payLoad = {
      category_level1_id: selectedLargeCat.value?.id
    }
  } else {
    payLoad = {
      category_level1_id: selectedLargeCat.value?.id,
      category_level2_id: selectedMediumCat.value?.id
    }
  }
  const res = await api.post(`/product/list`, payLoad)
  if (res.success) {
    productList.value = res.data.items
  }
}


</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal"
    content-class="confirm-modal-content w-full h-full absolute inset-0" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div class="absolute inset-0 w-full h-full overflow-auto z-50" @click="emit('confirm')">
      <div class="w-full h-full justify-center items-center flex flex-col  my-[200px]">
        <div
          class="relative w-full flex flex-col max-w-[1024px] bg-warmGray-200 px-[25px] md:px-[66px] lg:px-[120px] pt-[70px] lg:pt-[120px] pb-[45px] lg:pb-[70px]"
          @click="(e: any) => e.stopPropagation()">
          <p class="text-[20px] md:text-[30px] font-bold">
            마루정보를 선택해주세요.
          </p>
          <div
            class="flex flex-col md:flex-row mt-[20px] md:mt-[56px] gap-y-[20px] md:gap-y-0 md:gap-x-[20px] lg:gap-x-[40px]">
            <div class="flex flex-col flex-1">
              <p class="text-[16px] md:text-[24px] font-bold">
                카테고리
              </p>
              <Line />
              <div class="grid grid-cols-2 mt-[25px] gap-y-[23px]">
                <BtnCategory1 class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="depth0.name"
                  v-for="(depth0, idx) in categoryList" :selected="depth0.id == selectedLargeCat?.id"
                  :onClick="(e: any) => onCategoryClick(e, depth0)" />
              </div>
            </div>
            <div class="flex flex-col flex-1" v-show="selectedLargeCat?.children.length > 0">
              <p class="text-[16px] md:text-[24px] font-bold">
                브랜드 상품군
              </p>
              <Line />
              <div class="grid grid-cols-2 mt-[25px] gap-y-[23px]">
                <BtnCategory1 class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]"
                  v-for="depth1 in selectedLargeCat?.children" :key="depth1.id" :text="depth1.name"
                  :selected="depth1.id == selectedMediumCat?.id" :onClick="(e: any) => onCategoryClick(e, depth1)" />
              </div>
            </div>
          </div>

          <div v-if="productList.length > 0" class="flex flex-col flex-1 mt-[20px] md:mt-[50px]">
            <p class="text-[16px] md:text-[24px] font-bold">
              수종
            </p>
            <Line />
            <el-scrollbar class="mt-[25px]" always>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-y-[23px] gap-x-[10px] max-h-[300px]">
                <CardSearchedFloor :item="item" v-for="(item, idx) in productList"
                  :selected="item.id == selectedProduct?.id" :onClick="() => { onFloorSelected(item) }" />
              </div>
            </el-scrollbar>
          </div>
          <div class="flex flex-row gap-x-[12px] mt-[50px] md:mt-[70px] self-center">
            <button class="w-[72px] h-[35px] bg-warmGray-700 text-white text-[11px] font-bold rounded-[3px]"
              @click="emit('confirm')">
              취소
            </button>
            <button class="w-[72px] h-[35px] text-white text-[11px] font-bold rounded-[3px]"
              :class="selectedProduct ? 'bg-black' : 'bg-warmGray-700'" @click="emit('selectedFloor', selectedProduct)">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss"></style>
