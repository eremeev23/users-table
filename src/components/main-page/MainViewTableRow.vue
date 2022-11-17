<template>
  <tr class="row" v-if="row">
    <td class="row__column">
      <img
        class="row__avatar"
        :src="row.picture.medium"
        :alt="`${row.name.first} ${row.name.last}`"
      />
    </td>
    <td class="row__column">
      {{ row.name.first }} {{ row.name.last }}
    </td>
    <td class="row__column">
      {{ row.gender }}
    </td>
    <td class="row__column">
      <a
        class="row__link"
        :href="`mailto:${row.email}`"
      >
        {{ row.email }}
      </a>
    </td>
    <td class="row__column column">
      <a
        class="row__link"
        :href="`tel:${row.phone}`"
      >
        {{ row.phone }}
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "MainViewTableRow",

  props: {
    row: {
      type: Object,
      default: () => {}
    },
  }
};
</script>

<style lang="scss" scoped>
.row {
  &:not(:last-child) {
    border-bottom: 1px solid $gray;
  }

  &:nth-child(even) {
    background-color: #286DFF10;
  }

  &__column {
    padding: 7px 0;
    text-align: center;
  }

  &__avatar {
    border-radius: 50%;
    object-fit: cover;
  }

  &__link {
    &:hover {
      color: $blue;
    }
  }
}
</style>