<template>
  <table class="table" v-if="data">
    <thead>
      <tr class="table__header">
        <th>Avatar</th>
        <th>Name</th>
        <th>Gender</th>
        <th>E-mail</th>
        <th>Phone number</th>
      </tr>
    </thead>
    <tbody>
      <MainViewTableRow
        v-for="row in data"
        :key="row.email"
        :row="row"
      />
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
import MainViewTableRow from "./MainViewTableRow";

export default {
  name: "MainViewTable",

  components: {
    MainViewTableRow
  },

  props: {
    page: {
      type: Number,
      default: () => 0
    }
  },

  computed: {
    ...mapState({
      data: state => state.api.data
    }),
  },
};
</script>

<style lang="scss" scoped>
.table {
  max-width: 100%;
  width: 100%;

  &__header {
    border-bottom: 1px solid $gray;

    th {
      padding: 7px 0;
    }
  }
}
</style>