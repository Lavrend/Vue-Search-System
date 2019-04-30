<template lang="pug">
  .catalog-search
    Input.catalog-search__input(
      v-model="currentInputValue"
      :placeholder="placeholder"
      :value="currentInputValue"
      size="34"
      type="search"
      @submit="onChangeSearch"
    )
</template>

<script>
import { mapState } from 'vuex';

import Input from '@/ui/Input';

export default {
  name: 'catalog-search',

  components: {
    Input,
  },

  data() {
    return {
      placeholder: 'Type here to search (min 2 chars)',
      inputValue: '',
    };
  },

  computed: {
    ...mapState('engine', [
      'search',
    ]),

    currentInputValue: {
      get() {
        return this.search || this.inputValue;
      },

      set(value) {
        this.inputValue = value;
      },
    },
  },

  methods: {
    onChangeSearch() {
      const search = String(this.currentInputValue || '').trim();

      this.$store.dispatch('engine/setItems', {
        search,
      });
    },
  },
};
</script>

<style lang="scss">
.catalog-search {
  width: 100%;

  &__label {
    margin-right: $indent-md;
    color: $grey-7;
  }

  @media screen and (max-width: 480px) {
    &__label {
      display: none;
    }
  }
}
</style>
