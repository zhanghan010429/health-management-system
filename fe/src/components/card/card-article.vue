<template>
    <article class="article-wrapper">
        <header class="article-header">
            <img class="head-portrait" :src="handleImg(index)">
            <div class="article-infolist">
                <div class="name">
                    {{ article.u_name }}
                </div>
                <div class="time">
                    <time class="align-middle">Post at：{{ createTime }}</time>
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
            >Edit</van-button>
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
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        isShowEdit: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            portraitList: [
                'https://tva1.sinaimg.cn/crop.548.144.424.424.180/bb70fc68jw8faa3ha8qktj21400p0tpo.jpg?KID=imgbed,tva&Expires=1681728642&ssig=5NnfmnDlGp',
                'https://tvax3.sinaimg.cn/crop.0.1.689.689.180/001tbe1Xly8guks7tar63j60j50j6q3x02.jpg?KID=imgbed,tva&Expires=1681052386&ssig=ogi%2FdyxufF',
                'https://tvax2.sinaimg.cn/crop.0.0.1080.1080.180/006RGG6Ply8gnrhdya04yj30u00u0dib.jpg?KID=imgbed,tva&Expires=1681728924&ssig=CBCu3rGZal',
                'https://tvax1.sinaimg.cn/crop.0.0.828.828.180/001lku1oly8gm9hvzktnvj60n00n0js102.jpg?KID=imgbed,tva&Expires=1681728924&ssig=skpKR0oqO0',
                'https://tvax3.sinaimg.cn/crop.103.0.635.635.180/65e520f2gy1fmh2j9r3jej20rs0ijtio.jpg?KID=imgbed,tva&Expires=1681728999&ssig=R%2Bl4DZR%2FN5',
                'https://tvax2.sinaimg.cn/crop.106.9.493.493.180/69c732e4ly8fdlh4cbmhlj20j60dzdgn.jpg?KID=imgbed,tva&Expires=1681728999&ssig=y0D4o0z9Ur',
                'https://tvax3.sinaimg.cn/crop.97.97.244.244.180/6e232a81ly8g74sydm058j20c80c875b.jpg?KID=imgbed,tva&Expires=1681728999&ssig=5ZiGZ69e9s'
            ]
        }
    },
    setup(props) {
        function prefixZero(num = 0, n = 2) {
            return (Array(n).join("0") + num).slice(-n);
        }
        function format(time: any) {
            const e = new Date(time);
            const Y = e.getFullYear(); // year
            const M = prefixZero(e.getMonth() + 1); // month
            const D = prefixZero(e.getDate()); // day
            const H = prefixZero(e.getHours()); // hour
            const Mi = prefixZero(e.getMinutes()); // minute
            const S = prefixZero(e.getSeconds()); // second
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
        },
        handleImg(index) {
            if (index > 6) {
                return this.portraitList[6];
            }
            return this.portraitList[index];
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
