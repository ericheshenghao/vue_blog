<template>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"
        style="padding-top:1em;padding-right:1em;float: right;">
    </el-switch>
</template>
<script>
    export default {
        data() {
            return {
                value: true
            }
        }
    };
</script>