<template>
    <!-- footer navigation wraper-->
    <div class="footer-nav-wraper">
        <!-- Personal Center -->
        <div v-if="navName === 'personal'" class="box">
            <router-link tag="a" :to="{ path: '/home' }" class="nav-tag">
                <img src="https://search-operate.cdn.bcebos.com/4c9515d9cc5efe92244e9da9bfdcbfca.jpg" width="30" height="26"
                    alt="Health Management" class="tag-ico" />
                <div class="tag-name">Health Management</div>
            </router-link>
            <router-link tag="a" :to="{ path: '/personal' }" class="nav-tag this-tag">
                <img src="./images/mineblue.png" width="30" height="26" alt="MY" class="tag-ico" />
                <div class="tag-name">MY</div>
            </router-link>
        </div>

        <!-- Impersonal Center -->
        <div v-if="navName !== 'personal'" class="box">
            <router-link tag="a" :to="{ path: '/home' }" class="nav-tag this-tag">
                <img src="https://search-operate.cdn.bcebos.com/4c9515d9cc5efe92244e9da9bfdcbfca.jpg" width="30" height="26"
                    alt="Health Management" class="tag-ico" />
                <div class="tag-name">Health Management</div>
            </router-link>
            <router-link tag="a" :to="{ path: '/personal' }" class="nav-tag">
                <img src="./images/minegrey.png" width="30" height="26" alt="MY" class="tag-ico" />
                <div class="tag-name">MY</div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        navName: {
            type: String
        }
    }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.footer-nav-wraper {
    position: fixed;
    z-index: 10;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    height: 50px;
    background-color: #fff;

    .box {
        display: flex;
        flex-flow: row nowrap;

        .nav-tag {
            flex: 1;
            text-align: center;
            color: #7c8592;

            .tag-ico {
                margin-top: 3px;
                width: 30px;
                height: 26px;
            }

            .tag-name {
                margin-top: -5px;
                height: 18px;
                line-height: 18px;
            }

            &.this-tag {
                color: #2577e3;
            }
        }
    }
}

@media only screen and (min-width: 640px) {
    .footer-nav-wraper {
        left: 50%;
        margin-left: -320px;
    }
}
</style>
