<template>
  <Posts :posts="[post]"></Posts>
</template>

<script>
import { mapGetters, mapActions} from "vuex";
import Posts from "@/components/Post/Posts.vue"

export default {
    computed: mapGetters(["post"]),
    components: {
        Posts
    },
    methods: {
        ...mapActions(["getpostbyID"]),
    },
    created(){
        this.getpostbyID(this.$route.params.id);
    },
}
</script>

<style>

</style>