<template>
  <div class="home">
    <SearchForm :search-prop="search"/>
    <MainViewTable
      :page="page"
      v-if="data"
    />
    <Pagination
      :length="length"
      :active-page="page"
      v-on:step="paginationUpdate($event)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MainViewTable from "@/components/main-page/MainViewTable";
import Pagination from "@/components/main-page/Pagination";
import SearchForm from "@/components/forms/SearchForm";

export default {
  name: "HomeView",

  components: {
    MainViewTable,
    Pagination,
    SearchForm
  },

  data() {
    return {
      page: 1,
      search: ''
    };
  },

  computed: {
    ...mapState({
      data: state => state.api.data,
      length: state => state.api.length
    })
  },

  methods: {
    ...mapActions(["API_REQUEST", "PAGINATION", "SEARCH_REQUEST"]),

    paginationUpdate(num) {
      this.page = num;
      this.PAGINATION(num);
    }
  },

  created() {
    const pageParam = new URL(window.location).searchParams.get("page"),
      searchParam = new URL(window.location).searchParams.get("search");

    this.API_REQUEST()
      .then(() => {
        if (searchParam && pageParam) {
          this.search = searchParam;
          this.SEARCH_REQUEST(searchParam);
          this.page = Number(pageParam);
          this.PAGINATION(pageParam);
        } else if (pageParam) {
          this.page = Number(pageParam);
          this.PAGINATION(pageParam);
        } else if (searchParam) {
          this.search = searchParam;
          this.SEARCH_REQUEST(searchParam);
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 60px auto 40px;
  max-width: 1100px;
}
</style>
