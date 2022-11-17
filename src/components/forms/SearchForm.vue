<template>
  <form class="search-form" @submit.prevent>
    <input
      @input="searchHandler"
      v-model="searchPhrase"
      class="search-form__input"
      type="search"
      id="search"
      autocomplete="off"
      required
    />
    <label class="search-form__label" for="search">
      Search
    </label>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SearchForm",

  data() {
    return {
      searchPhrase: ''
    }
  },

  props: {
    searchProp: {
      type: String,
      default: () => ''
    }
  },

  watch: {
    searchProp() {
      this.searchPhrase = this.searchProp;
    }
  },

  methods: {
    ...mapActions(['SEARCH_REQUEST']),

    searchHandler() {
      const pageParam = new URL(window.location).searchParams.get('page');

      if (pageParam) {
        this.searchPhrase.trim().length > 0
          ? window.history.replaceState(null, null, `?page=${pageParam}&search=${this.searchPhrase.trim()}`)
          : window.history.replaceState(null, null, `?page=${pageParam}`);
      } else {
        this.searchPhrase.trim().length > 0
          ? window.history.replaceState(null, null, `?search=${this.searchPhrase.trim()}`)
          : window.history.replaceState(null, null, `/`);
      }

      this.SEARCH_REQUEST(this.searchPhrase.trim());
    }
  }
};
</script>

<style lang="scss" scoped>
.search-form {
  position: relative;
  width: 280px;
  margin-bottom: 40px;

  &__label {
    padding: 0 3px;
    position: absolute;
    bottom: 12px;
    left: 10px;
    font-size: 16px;
    color: #c1c1c1;
    background-color: #fff;
    pointer-events: none;

    transition: font-size .25s ease-in-out, color .25s ease-in-out, bottom .25s ease-in-out;
  }

  &__input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #777;
    border-radius: 6px;
    transition: border-color .25s ease-in-out;

    &:focus, &:valid {
      border-color: $black;

      & + .search-form__label {
        bottom: 35px;
        font-size: 12px;
        color: $black;
      }
    }
  }
}
</style>