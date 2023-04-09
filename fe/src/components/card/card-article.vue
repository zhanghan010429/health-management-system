<template>
    <article class="article-wrapper">
        <header class="article-header">
            <img class="head-portrait" src="https://tvax3.sinaimg.cn/crop.0.1.689.689.180/001tbe1Xly8guks7tar63j60j50j6q3x02.jpg?KID=imgbed,tva&Expires=1681052386&ssig=ogi%2FdyxufF">
            <div class="article-infolist">
                <div class="name">
                    {{ article.u_name }}
                </div>
                <div class="time">
                    <time class="align-middle">发布于：{{ createTime }}</time>
                </div>
            </div>
        </header>
        <section>
            <p class="article-content">{{ article.content }}</p>
        </section>
        <div 
            v-if="isShowEdit"
            class="edit-wrap"
        >
            <van-button 
                class="edit" 
                type="primary" 
                size="mini"
                @click="edit"
            >编辑</van-button>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Button } from 'vant'

export default defineComponent({
    name: "CardArticle",
    components: {
        [Button.name]:Button
    },
    props: {
        article: {
            type: Object,
            required: true,
        },
        isShowEdit: {
            type: Boolean,
            required: true,
        }
    },
    setup(props) {
        function prefixZero(num = 0, n = 2) {
            return (Array(n).join("0") + num).slice(-n);
        }
        function format(time: any) {
            const e = new Date(time);
            const Y = e.getFullYear(); // 年
            const M = prefixZero(e.getMonth() + 1); // 月
            const D = prefixZero(e.getDate()); // 日
            const H = prefixZero(e.getHours()); // 时
            const Mi = prefixZero(e.getMinutes()); // 分
            const S = prefixZero(e.getSeconds()); // 秒
            return Y + "-" + M + "-" + D + " " + H + ":" + Mi + ":" + S;
        }
        const createTime = computed(() => format(props.article.create_time));
        return {
            createTime
        };
    },
    methods: {
        edit() {
            this.$emit('edit', this.article.id);
        }
    }
});
</script>

<style lang="less" scoped>
.article-wrapper {
    background: #eeeeee;
    padding: 20px;
    margin: 5px;
    border-radius: 20px;
}
.article-content {
    padding-left: 62px;
}
.article-header {
    height: 52px;
    width: 100%;
    display: flex;
    .head-portrait {
        width: 52px;
        height: 52px;
        border-radius: 100%;
        overflow: hidden;
    }
    .article-infolist {
        margin-left: 10px;
        .name {
            color: #333;
            font-size: 18px;
            margin-bottom: 2px;
        }
        .time {
            color: #939393;
        }

    }

}
.edit-wrap {
    display: flex;
    justify-content: right;

}
.edit {
    overflow: hidden;
}

</style>
