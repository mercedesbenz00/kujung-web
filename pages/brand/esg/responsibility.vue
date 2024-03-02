<script setup lang="ts">
import { useStore } from '~/stores/common';
import { SCREEN_WIDTH } from '~/ts/constants';

// meta
definePageMeta({
    layout: 'page',
    title: '자연그대로의 아름다움'
})
const store = useStore()
const showPage = ref(false)

const activeName = ref('1')

const fullPageOptions = {
    licenseKey: '0LD27-YY5M9-PKERI-YDXJK-NOLMK',
    responsiveWidth: 800,
    scrollingSpeed: 1,
    afterLoad: (origin: any, destination: any) => {
        if (destination.index <= origin.index) {
            store.setshowNavbar(true)
        } else {
            store.setshowNavbar(false)
        }
        document.querySelectorAll('.fp-table.active .aos-init').forEach((el) => {
            if (el.getAttribute('id') == 'lazy-aos') {
                return
            }
            el.classList.add('aos-animate')
        })
    },
    onLeave: function () {
        document.querySelectorAll('.fp-table.active .aos-init').forEach((el) => {
            el.classList.remove('aos-animate')
        })
    },
    onScrollOverflow: function (section: any, slide: any, position: any, direction: any) {
        if (direction == "up") {
            store.setshowNavbar(true)
        } else {
            store.setshowNavbar(false)
        }
        document.querySelectorAll('#lazy-aos').forEach((el) => {
            if (isInViewport(el)) {
                el.classList.add('aos-animate')
            }
        })
    }
}
const isInViewport = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight) / 2 &&
        rect.left >= 0
    );
}

const policies = [
    {
        "title": "고객에 대한 책임",
        "desc": "고객이 우리의 존립 기반이자 존재 이유라는 분명한 신념을 가지고 고객과의 신뢰를 중시하며, 제품으로 고객의 안전과 건강을 추구한다.",
        "contents": [
            {
                subtitle: "고객과의 신뢰",
                subDescList: [
                    "고객에게 진실만을 말하며 고객과의 약속은 반드시 지킨다.",
                    "고객이 알아야 하거나 고객에게 마땅히 알려야 하는 사실은 적극적으로 공개하도록 한다.",
                    "고객의 정보를 고객의 동의 없이 누설하지 않으며 다른 용도 및 목적에 사용하지 않는다."],
            },
            {
                subtitle: "고객만족",
                subDescList: [
                    "고객에게 실질적으로 도움이 되고 만족을 줄 수 있는 참된 가치를 끊임없이 창조한다.",
                    "고객이 원하는 최고품질의 상품과 서비스를 합리적 가격으로 제공한다.",
                    "고객의 의견에 항상 귀를 기울이고, 고객의 진정한 요구는 항상 옳다고 생각하며, 고객 만족을 모든 판단 및 행동의 최우선 기준으로 삼는다.",
                    "고객이 언제든지 불만이나 제안을 손쉽게 할 수 있도록 다양한 의사소통 채널을 확보하여 개방하고, 고객의 정당한 요구에는 신속, 정확하게 응답한다.",
                    "고객의 이해와 회사의 이해가 충돌할 때는 먼저 고객의 입장에서 생각하고 판단한다."],
            },
            {
                subtitle: "고객 정보보호",
                subDescList: [
                    "고객의 개인 정보는 고객이 동의한 내용에 한정하여 이용하여야 한다.",
                    "고객 정보를 취급하는 임직원 및 관련 업무 처리자는 개인정보보호 지침 및 관련 법규를 준수하여야 한다."],
            },
        ]
    }
    ,
    {
        "title": "협렵업체에 대한 책임",
        "desc": "협력업체와 상호 미래지향적 협력관계를 구축하여 장기적으로 공동의 발전에 이바지한다.",
        "contents": [
            {
                subtitle: "공정한 업체 선정",
                subDescList: [
                    "자유경쟁의 원칙에 따라 거래 자격을 갖춘 모든 업체에게 공평한 기회를 제공한다.",
                    "협력업체 선정은 최상의 경영 파트너 선택을 위해 객관적이고 합리적인 심사기준에 따라 투명하고 공정하게 한다.",
                    "회계부정, 환경오염 등 위법행위가 있거나 청렴하지 못한 기업과의 거래는 삼간다."],
            },
            {
                subtitle: "동반자적 관계 구축 및 깨끗한 거래풍토 조성",
                subDescList: [
                    "우월적 권한과 지배적 지위를 이용하여 부당한 강요행위나 영향력을 행사하지 않는다.",
                    "장기적으로 협력업체가 경쟁력을 갖추어 성장할 수 있도록 적극 지원함으로써 협력사가 선호하고 신뢰하는 기업상을 확립한다.",
                    "협력업체로부터 금품, 향응, 편의 등을 제공 받지 않는다.",
                    "협력업체와 거래관계 도중에 취득되는 기술정보 및 영업상의 비밀을 누설하거나 부당한 이득을 위해 사용하지 않는다.",],
            },
        ]
    }
    ,
    {
        "title": "경쟁자에 대한 책임",
        "desc": "자유경쟁의 원칙을 존중하며 진정한 실력으로 경쟁의 우위를 확보한다.",
        "contents": [
            {
                subtitle: "공정한 경쟁 관계 유지",
                subDescList: [
                    "경쟁관계를 상호 발전의 계기로 삼고 시장경제질서를 존중하여 선의의 공정한 경쟁을 한다.",
                    "허위사실 유포 및 공식적으로 확인되지 않은 경쟁사의 약점을 이용하지 않는다.",
                    "공정한 경쟁 및 거래 질서 유지를 위해 경쟁자와 함께 최선의 노력을 기울인다.",],
            },
        ]
    }
    ,
    {
        "title": "국가, 사회에 대한 책임",
        "desc": "합법적이고 윤리적인 사업을 도모함으로써 국민의 풍요로운 삶과 사회발전에 공헌한다.",
        "contents": [
            {
                subtitle: "법규의 준수",
                subDescList: [
                    "사회활동을 하는 모든 국가나 지역에서 법규와 도덕을 준수하며, 문화와 관습 그 외 사회적 가치관을 존중한다.",
                    "과세의 기초가 되는 자료를 정확히 작성 관리하여 납세의 의무를 성실히 수행한다.",
                    "인종, 국적, 성, 학교, 종교, 출신지역 등을 이유로 어떤 차별을 하지 않는다.",
                    "정당한 권리 없이 타인의 지적 재산권을 침해하지 않는다.",],
            },
            {
                subtitle: "정치 불참여",
                subDescList: [
                    "직원의 개인의 정치적 양심과 표현은 존중하나, 직원 신분으로서는 정치에 개입하지 않는다.",
                    "정치인, 공직후보자에게 불법 또는 비공식적 정치자금을 제공하지 않는다.",],
            },
            {
                subtitle: "지역사회에의 공헌",
                subDescList: [
                    "성실한 기업활동을 통한 고용창출로 지역사회 발전에 기여한다.",
                    "사업장이 속해있는 지역주민을 위해 복지시설을 개방, 소외계층을 지원한다.",
                    "직원의 지역사회 활동참여를 권장, 지원함으로써 회사와 지역사회의 일체감을 증진한다.",],
            },
            {
                subtitle: "환경보호",
                subDescList: [
                    "환경 및 생태계를 보호하고 자원을 절약하는데 기여한다.",
                    "환경친화적이고 경제적인 생산 물류 판매 프로세스를 갖추는데 노력하여 혁신적인 환경 가치 창출을 목표로 한다.",],
            },
        ]
    }
    ,
    {
        "title": "임직원에 대한 책임",
        "desc": "최고 수준의 전문가들이 모인 인재 보고의 기업이 됨으로써 업계에서 가장 근무하고 싶은 회사로 만든다.",
        "contents": [
            {
                subtitle: "임직원 존중",
                subDescList: [
                    "임직원의 인간적 존엄성과 개개인의 고유한 가치를 인정한다.",
                    "업무처리 및 인간관계에 있어서 모든 권위주의적 요소를 일소하여 직원 모두가 소신을 가지고 자율적으로 업무를 추진할 수 있는 환경을 조성한다.",],
            },
            {
                subtitle: "공정한 대우",
                subDescList: [
                    "성과주의를 지향하고 성과에 상응하는 보상을 한다.",
                    "공정하고 객관적인 평가와 보상을 통해 정당하게 대우한다.",
                    "직원의 채용, 능력개발, 승진, 포상 등 일체의 사항들에 대해 균등한 기회를 제공한다.",],
            },
            {
                subtitle: "인재 육성",
                subDescList: [
                    "회사와 함께 성장하는 자율적이고 창의적인 인재를 육성하기 위해 제반 시스템을 갖추고 이를 활성화시키며 적극적으로 지원한다.",
                    "임직원의 적성과 소질을 고려하여 필요한 충고와 지도를 아끼지 않으며, 장기적 관점에서 인재를 육성한다.",],
            },
            {
                subtitle: "안전하고 건강한 근무환경 조성",
                subDescList: [
                    "직원의 안전과 건강을 최우선으로 고려하여 작업조건 및 작업환경을 개선한다.",
                    "문화환경 조성, 복지후생시설 확충 등 직원들의 삶의 질을 향상시킬 수 있는 프로그램을 적극적으로 개발 시행한다.",],
            },
            {
                subtitle: "자유로운 소통 문화 확립",
                subDescList: [
                    "직원들이 각자의 의견을 개진하거나, 고충을 토로하는데 자유로운 분위기를 조성한다.",],
            },
        ]
    }
    ,
    {
        "title": "임직원의 책임",
        "desc": "우리는 구정마루인임을 자랑스러워하며 도덕적 규범 및 회사의 규정과 원칙을 준수하여 공정하게 업무를 처리한다.",
        "contents": [
            {
                subtitle: "기본 윤리",
                subDescList: [
                    "구정마루인으로서의 자부심을 갖고 행동한다.",
                    "업무에 집중하고 전념하며, 시간 낭비적 요소를 제거한다.",
                    "높은 윤리적 가치관을 가지고 개인의 품위와 명예를 유지하며, 수입과 분수에 맞는 건전한 소비생활을 한다.",
                    "회사의 안전을 도모할 의무와 책임을 다하여 위험발생 및 비상사태 발생시 전력을 다해 수습한다.",],
            },
            {
                subtitle: "직업윤리",
                subDescList: [
                    "학연 지연 혈연 및 개인적 이해관계나 외부의 압력에 흔들리지 않고 공정하게 업무를 처리한다.",
                    "도덕적 규범 및 법률, 회사의 규정과 원칙을 준수한다",
                    "직무와 관련하여 일체의 금품수수 및 향응, 접대를 받지도 하지도 않는다.",
                    "고객에 대한 정보 및 회사의 기밀 사항, 경영정보 및 영업 정보를 외부에 절대 유출하지 않는다.",
                    "비공개 정보를 활용하여 내부거래를 하지 않으며 업무상 취득한 정보에 대해서 사내 및 사외에 유출하지 않는다.",
                    "사적으로 회사의 물품이나 비용을 사용하지 않는다."],
            },
            {
                subtitle: "임직원 상호존중",
                subDescList: [
                    "불손한 언행이나 상대에게 불쾌감을 주는 행동을 하지 않으며, 기본예의를 지킨다.",
                    "지역 성별 종교 인종 등에 따른 차별대우를 하지 않는다.",
                    "임직원 상호 간 부당한 청탁을 하지 않는다.",],
            },
            {
                subtitle: "회사재산 및 정보보호",
                subDescList: [
                    "업무를 통해 알게 되거나 습득한 정보 또는 지식이 회사의 지식재산임을 알고, 이를 보호하기 위해 노력하며 타사 또는 타인의 지식재산 또한 존중한다.",
                    "회사의 제품 장비 정보 및 예산 등은 업무 목적용으로 사용하며 임의 또는 허위로 사용하지 않는다.",],
            },
            {
                subtitle: "성희롱 금지",
                subDescList: [
                    "임직원은 양성평등적 사고를 기반으로 건전한 동료 관계를 유지하기 위해 서로 노력한다.",
                    "사회통념 및 회사의 기준에 어긋나는 성희롱 등의 행위는 어떤 상황에서도 해서는 안 된다.",],
            },
            {
                subtitle: "직장 내 괴롭힘 금지",
                subDescList: [
                    "임직원은 어떤 상황에서도 지위 또는 관계 등의 우위를 이용하여 신체적·정신적 고통을 주는 행동을 하면 안 된다.",
                    "사회통념 및 회사의 기준에 어긋나는 괴롭힘 행위는 어떠한 경우에도 해서는 안된다.",],
            },
        ]
    }
    ,
    {
        "title": "자기 계발",
        "desc": "자신의 전문성 및 글로벌 역량 개발을 위하여 계획을 수립하고 적극적으로 실천한다.",
        "contents": [
            {
                subtitle: "",
                subDescList: [
                    "맡은 바 직무에 최고 전문가가 되도록 노력하고 타 직무에 대해서도 폭넓은 시각과 지식을 배양하여 전사 이익을 지향한다."
                ],
            },
        ]
    }
]

onMounted(() => {
    setTimeout(() => {
        showPage.value = true
    }, 1000);
})

</script>

<template>
    <div>
        <full-page ref="fullpage" v-if="showPage" :options="fullPageOptions">
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="'/img/brand/esg/esg_responsiblity_bg1.png'" class="w-full h-screen object-cover" />
                    <div
                        class="absolute top-0 md:top-[200px] right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold" data-aos="fade-ind"
                            data-aos-duration="1500" data-aos-delay='500'>GOVERNANCE</p>
                        <p class="mt-[10px] md:mt-[20px] text-[22px] md:text-[30px] lg:text-[34px] text-white text-center font-bold break-keep"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            함께하는 책임
                        </p>
                        <p class="mt-[50px] lg:mt-[60px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center break-keep hidden md:block h-[100px]"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            노사 간의 신뢰를 바탕으로 하는 윤리경영은 기업의 지속가능성과<br />
                            미래가치를 보장하며 기업 경영의 핵심요소로 인식되고 있습니다.
                        </p>
                        <p class="mt-[50px] lg:mt-[60px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center break-keep block md:hidden h-[100px]"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            노사 간의 신뢰를 바탕으로 하는 윤리경영은<br />
                            기업의 지속가능성과 미래가치를 보장하며<br />
                            기업 경영의 핵심요소로 인식되고 있습니다.
                        </p>
                    </div>
                </section>
            </div>
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="SCREEN_WIDTH > 1024 ? '/img/brand/esg/esg_responsiblity_bg1.png' : '/img/brand/esg/esg_responsiblity_bg1_2.png'"
                        class="w-full h-screen object-cover" />
                    <div
                        class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <!-- <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold">GOVERNANCE</p>
                        <p class="mt-[10px] md:mt-[20px] text-[22px] md:text-[30px] lg:text-[34px] text-white text-center font-bold break-keep">
                            함께하는 책임
                        </p> -->
                        <p class="mt-[50px] lg:mt-[60px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center break-keep hidden md:block h-[100px]"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            이에 구정마루는 반부패 위반 건수 0건을 목표로<br />
                            구성원의 윤리의식을 교육하고 윤리경영을 강화해 나가겠습니다.<br />
                            윤리 및 반부패 위반 사항 발생시 무관용 원칙을 적용하고<br />
                            뇌물, 성희롱 등 세분화된 체계를 세우기 위해 노력하겠습니다.
                        </p>
                        <p class="mt-[50px] lg:mt-[60px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center break-keep block md:hidden h-[100px]"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            이에 구정마루는 반부패 위반 건수 0건을 목표로<br />
                            구성원의 윤리의식을 교육하고 윤리경영을 강화해<br />
                            나가겠습니다. 윤리 및 반부패 위반 사항 발생시<br />
                            무관용 원칙을 적용하고 뇌물, 성희롱 등<br />
                            세분화된 체계를 세우기 위해 노력하겠습니다.
                        </p>
                    </div>
                </section>
            </div>
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="SCREEN_WIDTH > 1024 ? '/img/brand/esg/esg_responsiblity_bg1.png' : '/img/brand/esg/esg_responsiblity_bg1_3.png'"
                        class="w-full h-screen object-cover" />
                    <div
                        class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <!-- <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold" >GOVERNANCE</p>
                        <p class="mt-[10px] md:mt-[20px] text-[22px] md:text-[30px] lg:text-[34px] text-white text-center font-bold break-keep">
                            함께하는 책임
                        </p> -->
                        <p class="mt-[50px] lg:mt-[60px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center break-keep hidden md:block h-[100px]"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            전 구성원을 대상으로 윤리 및 반부패 교육과 제보자 보호 조치등을 강화하고<br />
                            구성원의 진정성과 신뢰성 확보를 위해 노력하겠습니다.
                        </p>
                        <p class="mt-[50px] lg:mt-[60px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center break-keep block md:hidden h-[100px]"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            전 구성원을 대상으로 윤리 및 반부패 교육과<br />
                            제보자 보호 조치등을 강화하고<br />
                            구성원의 진정성과 신뢰성 확보를 위해<br />
                            노력하겠습니다.
                        </p>
                    </div>
                </section>
            </div>

            <div class="section fp-auto-height bg-[#FFFEF2]">
                <div class="w-full flex flex-col">
                    <p
                        class="text-[22px] md:text-[34px] text-black font-bold text-center mt-[53px] md:mt-[38px] lg:mt-[127px] mb-[56px]">
                        방침
                    </p>
                    <div class="max-w-[1024px] self-center mb-[110px]">
                        <div class="responsibility-collapse px-[8px] max-w-[728px]">
                            <el-collapse v-model="activeName" class="" accordion>
                                <el-collapse-item :name="item.title" v-for="(item, index) in policies" :key="index">
                                    <template #title class="flex flex-col">
                                        <div class="flex flex-col py-[10px] md:py-[20px]">
                                            <div class="flex flex-row items-center md:items-start h-[38px] md:h-[58px]">
                                                <div
                                                    class="w-[25px] md:w-[42px] h-[25px] md:h-[42px] flex items-center justify-center bg-primary-600 rounded-[50%]">
                                                    <span class="text-center text-white text-[14px] md:text-[22px]">
                                                        {{ index + 1 }}
                                                    </span>
                                                </div>
                                                <p
                                                    class="text-[17px] md:text-[22px] ml-[18px] font-bold leading-[22px] md:leading-[30px]">
                                                    {{ item.title }}
                                                </p>
                                            </div>
                                            <p
                                                class="text-[12px] md:text-[18px] md:ml-[60px] leading-[16px] md:leading-[24px] break-keep">
                                                {{ item.desc }}
                                            </p>
                                        </div>
                                    </template>
                                    <template class="flex flex-col">
                                        <div class="px-[3px] md:px-[50px] py-[50px] bg-warmGray-400 rounded-[10px]">
                                            <div v-for="(content, index) in item.contents" :key="index" class="mb-[10px]">
                                                <p v-if="content.subtitle != ''"
                                                    class="text-[17px] md:text-[18px] font-bold text-black">
                                                    {{
                                                        index + 1 }}. {{ content.subtitle }}
                                                </p>
                                                <div class="ml-[10px]">
                                                    <div class="flex flex-row" v-for="(desc, index) in content.subDescList"
                                                        :key="index">
                                                        <p class="text-[11px] md:text-[15px] text-black break-keep">
                                                            •
                                                        </p>
                                                        <p class="text-[11px] md:text-[15px] text-black break-keep">
                                                            {{ desc }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                    <PageFooter class="hidden md:flex" />
                </div>
            </div>
        </full-page>
    </div>
</template>

<style lang="scss"></style>