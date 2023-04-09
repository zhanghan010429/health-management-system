<template>
    <div class="global-coupon-list-wraper">
        <explain    :explainName="state.explainName"></explain>
        <van-button
                type="primary"
                class="add-btn"
                @click="addData()"
        >分享健康</van-button>
        <div 
            class="list-wrap" 
            v-for="(item, index) in artList"
        >
            <card-article 
                :isShowEdit="handleIsShowEdit(item.uid)"
                :article="item"
                @edit="edit"
            ></card-article>
        </div>
        <footer-nav></footer-nav>
        <van-popup
            :show="isShow"
            closeable
            close-icon="close"
            position="bottom"
            @click-close-icon="onClickCloseIcon"
            :style="{ height: '60%' }"
        >
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                        v-model="content"
                        class="textarea"
                        rows="15"
                        autosize
                        label="分享内容"
                        type="textarea"
                        maxlength="150"
                        placeholder="请输入分享内容"
                        show-word-limit
                    />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script lang="ts">
import {
    ref,
    reactive,
    defineComponent,
    SetupContext
} from 'vue';
import {
    getArticle,
    setArticle,
    editArticle,
    getArticleById
} from '@/api/article';
import { useStore } from 'vuex';
import { StateProps } from '@/store';
import Explain from '@/components/header-explain/index.vue';
import FooterNav from '@/components/footer-nav/index.vue';
import { Popup, Dialog,Button } from 'vant'
import AddDataPopup from '../../components/data-popup/index.vue';
import TextPopup from '../../components/text-popup/index.vue';
import CardArticle from '../../components/card/card-article.vue';

type State = {
    [x: string]: any
    explainName: string
}

export default defineComponent({
    components: {
        Explain,
        FooterNav,
        [Dialog.name]: Dialog,
        [Button.name]:Button,
        [Popup.name]: Popup,
        'add-data-popup': AddDataPopup,
        'text-popup': TextPopup,
        'card-article': CardArticle
    },
    data() {
        return {
            artList: [],
            isShow: false,
            content: '',
            artId: null,
            isEdit: false
        }
    },
    mounted() {
        this.handleGetData();

    },

    setup(props: {}, context: SetupContext) {
        const state: State = reactive({
            explainName: '健康论坛',
            title: '添加呼吸数据',
            showDialog: false
        });
        return {
            state,
        };
    },
    methods: {
        addData() {
            this.isEdit = false;
            this.isShow = true;
        },
        onClickCloseIcon() {
            this.isEdit = false;
            this.content = '';
            this.isShow = false;
        },
        onSubmit() {
            if (this.isEdit) {
                this.onEdit();
                return;
            }
            const uid = window.sessionStorage.uid;
            setArticle(uid, this.content)
                .then(res => {
                    this.handleGetData()
                    this.onClickCloseIcon()
                })
                .catch(error => {
                    Dialog.alert({
                        message: error
                    })
                })
        },
        handleGetData() {
            getArticle()
                .then(res => {
                    this.artList = res.data.data as any;
                })
                .catch(error => {
                    Dialog.alert({
                        message: error
                    })
                });
        },
        handleIsShowEdit(uid: any) {
            return +uid === +window.sessionStorage.uid;
        },
        edit(id: any) {
            getArticleById(id).then(res => {
                    this.content = res.data.data as any;
                    this.isShow = true;
                    this.artId = id;
                    this.isEdit = true;
                })
                .catch(error => {
                    Dialog.alert({
                        message: error
                    })
                });
        },
        onEdit() {
            editArticle(this.artId as any, this.content)
                .then(res => {
                    this.handleGetData()
                    this.onClickCloseIcon()
                })
                .catch(error => {
                    Dialog.alert({
                        message: error
                    })
                })

        }
    }
    
});
</script>

<style lang="less" scoped>
.list-wrap {
    overflow: hidden;
    margin-top: 8px;
}
.textarea {
    margin-top: 20px;
    background: #eeeeee;
    border-radius: 20px;
}

</style>
