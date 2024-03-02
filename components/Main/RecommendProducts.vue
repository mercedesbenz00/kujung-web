<script lang="ts" setup>

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
    products: {
        type: Array<{ id: Number, imgUrl: string }>,
        default() {
            return {}
        }
    },
    index: {
        type: Number,
        default: 0
    },
    onClick: {
        type: Function,
        default() {
        }
    }
});

</script>
<template>
    <section>
        <section class="hidden md:flex w-[768px] lg:w-[1024px] h-[637px] lg:h-[850px]">
            <section v-if="props.index % 5 == 0" class="w-full flex flex-row gap-x-[36px] lg:gap-x-[50px] items-center">
                <div class="flex flex-col flex-1 gap-y-[37px] lg:gap-y-[50px]">
                    <img :src="products[0].imgUrl" class="w-[320px] lg:w-[427px] h-[219px] lg:h-[293px] object-cover" />
                    <img :src="products[1].imgUrl"
                        class="ml-[76px] lg:ml-[102px] w-[352px] lg:w-[470px] h-[166px] lg:h-[222px] object-cover" />
                    <img :src="products[2].imgUrl" class="w-full h-[176px] lg:h-[235px] object-cover" />
                </div>
                <img :src="products[3].imgUrl" class="w-[225px] lg:w-[300px] h-[375px] lg:h-[500px] object-cover" />
            </section>

            <section v-if="props.index % 5 == 1" class="w-full flex flex-col gap-y-[23px] lg:gap-y-[30px] items-center">
                <div class="flex flex-row gap-x-[43px] lg:gap-x-[58px] ml-[180px] lg:ml-[240px]">
                    <img :src="products[0].imgUrl"
                        class="w-[320px] lg:w-[424px] h-[255px] lg:h-[340px] object-cover mt-[36px] lg:mt-[50px]" />
                    <img :src="products[1].imgUrl" class="w-[225px] lg:w-[300px] h-[225px] lg:h-[300px] object-cover" />
                </div>
                <div class="flex flex-1 w-full flex-row gap-x-[43px] lg:gap-x-[58px] items-center">
                    <img :src="products[2].imgUrl" class="w-[273px] lg:w-[365px] h-[249px] lg:h-[333px] object-cover" />
                    <div class="flex-1 h-full">
                        <img :src="products[3].imgUrl" class="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            <section v-if="props.index % 5 == 2" class="w-full flex flex-col gap-y-[37px] lg:gap-y-[50px] items-center">
                <div class="flex w-full flex-row gap-x-[21px] lg:gap-x-[29px] pl-[42px] lg:pl-[57px]">
                    <img :src="products[0].imgUrl"
                        class="w-[320px] lg:w-[424px] h-[255px] lg:h-[340px] object-cover mt-[45px] lg:mt-[60px]" />
                    <div class="flex-1">
                        <img :src="products[1].imgUrl" class="w-full h-[172px] lg:h-[230px] object-cover" />
                    </div>
                </div>
                <div class="flex flex-1 w-full flex-row gap-x-[45px] lg:gap-x-[60px]">
                    <img :src="products[2].imgUrl" class="w-[450px] lg:w-[600px] h-[262px] lg:h-[350px] object-cover" />
                    <img :src="products[3].imgUrl"
                        class="w-[225px] lg:w-[300px] h-[225px] lg:h-[300px] object-cover self-end" />
                </div>
            </section>

            <section v-if="props.index % 5 == 3" class="w-full flex flex-col gap-y-[0px] items-center">
                <div class="flex w-full flex-row gap-x-[45px] lg:gap-x-[60px] pr-[48px] lg:pr-[64px]">
                    <img :src="products[0].imgUrl" class="w-[450px] lg:w-[600px] h-[300px] lg:h-[400px] object-cover" />
                    <img :src="products[1].imgUrl"
                        class="w-[225px] lg:w-[300px] h-[300px] lg:h-[400px] object-cover self-end mt-[60px] lg:mt-[80px]" />
                </div>
                <div class="flex flex-1 w-full flex-row gap-x-[50px] lg:gap-x-[67px] pl-[42px] lg:pl-[57px]">
                    <img :src="products[2].imgUrl" class="w-[225px] lg:w-[300px] h-[255px] lg:h-[300px] object-cover" />
                    <div class="flex-1">
                        <img :src="products[3].imgUrl"
                            class="w-full h-[225px] lg:h-[300px] object-cover mt-[50px] lg:mt-[70px]" />
                    </div>
                </div>
            </section>

            <section v-if="props.index % 5 == 4" class="w-full flex flex-row gap-x-[0px]">
                <div
                    class="flex flex-col h-full pb-[62px] lg:pb-[84px] gap-y-[62px] lg:gap-y-[84px] w-[450px] lg:w-[600px]">
                    <img :src="products[0].imgUrl" class="w-full h-[262px] lg:h-[350px] object-cover" />
                    <div class="flex flex-1 items-center justify-center">
                        <img :src="products[1].imgUrl" class="w-[337px] lg:w-[450px] h-full object-cover" />
                    </div>
                </div>
                <div class="flex flex-col flex-1 pt-[30px] lg:pt-[40px] gap-y-[36px] lg:gap-y-[49px]">
                    <div class="flex-1 pl-[55px] lg:pl-[74px]">
                        <img :src="products[2].imgUrl" class="w-full h-full object-cover" />
                    </div>
                    <img :src="products[3].imgUrl" class="w-[225px] lg:w-[300px] h-[225px] lg:h-[300px] object-cover" />
                </div>
            </section>

        </section>
        <section class="flex md:hidden px-[20px]">
            <img :src="products[0].imgUrl" class="w-full h-[240px] object-cover" />
        </section>
    </section>
</template>
