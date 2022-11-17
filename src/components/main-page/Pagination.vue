<template>
  <div class="pagination">
  <!--    PREV PAGE    -->
    <button
      v-if="activePage > 1"
      class="pagination__button"
      @click="paginationHandler(activePage - 1)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <!--    FIRST PAGE    -->
    <button
      v-if="activePage > 2"
      class="pagination__button"
      @click="paginationHandler(1)"
    >
      1
    </button>
    <span
      class="pagination__dots"
      v-if="activePage > 2"
    >
      ...
    </span>
    <button
      :class="num === activePage ? 'pagination__button active' : 'pagination__button'"
      v-for="num in lengthArray"
      v-show="num === activePage || num - 1 === activePage || num + 1 === activePage"
      :key="num"
      @click="paginationHandler(num)"
    >
      {{ num }}
    </button>
    <span
      class="pagination__dots"
      v-if="activePage < length - 1"
    >
      ...
    </span>
    <!--    LAST PAGE    -->
    <button
      v-if="activePage < length - 1"
      class="pagination__button"
      @click="paginationHandler(length)"
    >
      {{ length }}
    </button>
    <!--    NEXT PAGE    -->
    <button
      v-if="activePage < length"
      class="pagination__button"
      @click="paginationHandler(activePage + 1)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",

  props: {
    length: Number,
    activePage: {
      type: Number,
      default: () => 0
    }
  },

  computed: {
    lengthArray() {
      const arr = [];
      for (let i = 1; i <= this.length; i++) {
        arr[i] = Number(i);
      }
      return arr
    }
  },

  methods: {
    paginationHandler(num) {
      const searchParam = new URL(window.location).searchParams.get('search');
      if (searchParam) {
        window.history.replaceState(null, null, `?page=${num}&search=${searchParam}`);
      } else {
        window.history.replaceState(null, null, `?page=${num}`);
      }

      this.$emit("step", num);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 30px auto 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  width: fit-content;

  &__button {
    width: 36px;
    height: 36px;
    font-size: 16px;
    color: $black;
    border: 1px solid $gray;
    border-radius: 4px;

    &:hover, &.active {
      color: #fff;
    }

    &:hover {
      background-color: rgba(220 0 50 / .8);
      border-color: rgba(220 0 50 / .8);
    }

    &.active {
      background-color: $red;
      border-color: $red;
    }
  }
}
</style>