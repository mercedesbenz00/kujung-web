<script>
export default {
    data() {
        return {
            page: null,
            pageIndex: 0,
            nowMoving: false
        }
    },
    mounted() {
        this.page = this.$el.querySelectorAll('.section');
        this.catchAction()
    },
    methods: {
        catchAction() {
            //eventListener 모을 함수
            window.addEventListener('wheel', this.wheelEvent);
        },
        wheelEvent(e) {
            // 마우스 휠 이벤트
            if (this.nowMoving) return
            this.nowMoving = true;

            // e.deltaY > 0 ---> 스크롤 내릴 때 true 올릴 때 false
            let scrollDown = e.deltaY > 0;
            this.getPageIndex(scrollDown)
        },
        getPageIndex(down) {
            // 현재 페이지 인덱스 구하는 함수
            if (down) {
                this.pageIndex == (this.page.length - 1)
                    ? this.pageIndex = (this.page.length - 1)
                    : ++this.pageIndex
            } else {
                this.pageIndex <= 0
                    ? this.pageIndex = 0
                    : --this.pageIndex
            }
            this.moveEvent(this.pageIndex);
        },
        moveEvent(number) {
            this.$el.querySelector('.section-container').style.transform
                = `translateY(-${number}00%)`;
            setTimeout(() => {
                // .section-wrapper의 transition 시간 정도
                this.nowMoving = false;
            }, 400);
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="section-wrapper">
            <div class="section-container">
                <div class="section">
                    <p class="font-bold" data-aos="fade-in">
                        0
                    </p>
                </div>
                <div class="section">
                    <p class="font-bold" data-aos="fade-in">
                        1
                    </p>
                </div>
                <div class="section">2</div>
                <div class="section">3</div>
            </div>
            <div class="pagination-wrapper">
                <div class="pagination" :class="{ 'active': pageIndex == index }" v-for="(n, index) in page"
                    :key="'pagination' + index"></div>
            </div>
        </div>
    </div>
</template>
  
<style lang="scss">
.container {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .section-wrapper {
        width: 100%;
        height: 100%;

        .section-container {
            width: 100%;
            height: 100%;
            transition: all 0.5s; //페이지가 넘어가는 속도

            .section {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 33px;
                font-weight: bold;
                position: relative;
                color: #fefefe;

                &:nth-child(1) {
                    background-color: rgb(255, 142, 50);
                }

                &:nth-child(2) {
                    background-color: rgb(255, 225, 94);
                }

                &:nth-child(3) {
                    background-color: rgb(156, 224, 110);
                }

                &:nth-child(4) {
                    background-color: rgb(109, 189, 255);
                }
            }
        }

        .pagination-wrapper {
            position: fixed;
            left: 30px;
            top: 50%;
            transform: translateY(-50%);

            .pagination {
                width: 14px;
                height: 14px;
                border: 1px solid #fefefe;
                border-radius: 50%;

                &+.pagination {
                    margin-top: 20px;
                }

                &.active {
                    background-color: #fefefe;
                }
            }
        }
    }
}
</style>
