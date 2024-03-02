<template>
    <div
        class="footer pt-[62px] pb-[63px] md:pb-[140px] px-[28px] md:px-[128px] bg-warmGray-900 flex justify-center items-center">
        <PageWrapper>
            <div class="flex flex-col md:flex-row gap-[90px]">
                <div class="w-[142px]">
                    <img src="/img/logos/text-logo.svg" alt="footer-logo" class="cursor-pointer w-full" />
                </div>
                <div class="flex flex-col gap-[35px]">
                    <ul class="flex flex-wrap gap-y-[8px]">
                        <a target="_blank" href="https://kujungmaru.oopy.io/80a6a53b-d848-4cb9-8dd3-f72541dfe419">
                            <li>이용약관</li>
                        </a>

                        <a target="_blank" href="https://kujungmaru.oopy.io/afa86f9f-798e-4289-bebf-35dc3c71ebef">
                            <li>개인정보 처리 방침</li>
                        </a>

                        <a target="_blank" href="https://kujungmaru.oopy.io/dc652dec-cd73-4724-8e09-fc7752fd86c1">
                            <li>저작권안내</li>
                        </a>

                        <a target="_blank" href="https://kujungmaru.oopy.io/ab46d96e-2d22-4428-869f-e7c190b7614e">
                            <li>이메일무단 수집거부</li>
                        </a>
                    </ul>
                    <div>
                        <p>주소 : 경기도 광주시 도척면 마도로 178-13 (유정리 100-5)</p>
                        <p>사업자 등록번호 : 126-81-34965 ㅣ 통신 판매업 신고번호 : 제2019-경기광주-0059호</p>
                        <p>대표전화 : 031 -766-0700</p>
                        <p>마케팅 제휴 : mkt@kujungmaru.com ㅣ 대리점 제휴 : sales@kujungmaru.com</p>
                        <br />
                        <p>ⓒCopyright 구정마루. All rights reserved. 상품 사진을 포함한 모든 컨텐츠는 저작권법 제 98조에 의거해 보호를 받고 있습니다.</p>
                    </div>
                </div>
            </div>
        </PageWrapper>
    </div>
</template>

<style scoped>
.footer li {
    @apply font-bold text-[12px] leading-[16px] text-white cursor-pointer mr-[8px];
}

.footer li::after {
    color: #D9D9D9;
    content: "|";
    margin-left: 8px;
}

.footer li:last-child::after {
    content: "";
}

.footer p {
    @apply font-normal text-[12px] leading-[16px] text-white;
}
</style>