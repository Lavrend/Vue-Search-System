<template lang="pug">
  .result-filter
    uiInput.result-filter__input(
      v-model="currentInputValue"
      :placeholder="placeholder"
      :value="currentInputValue"
      type="search"
      @submit="onSubmit"
      @change="onChangeFilter"
    )
</template>

<script>
import _debounce from 'lodash.debounce';
import _filter from '@/utils/filter';

import uiInput from '@/ui/Input';

export default {
  name: 'result-filter',

  components: {
    uiInput,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      placeholder: 'filter (lang, name, description)',
      inputValue: '',
    };
  },

  computed: {
    currentInputValue: {
      get() {
        return this.inputValue;
      },

      set(value) {
        this.inputValue = value;
      },
    },
  },

  methods: {
    onChangeFilter: _debounce(function debounceChange(value = '') {
      const filter = String(value || '').trim().toLowerCase();

      if (!filter.length) {
        this.$emit('emptyFilter');
        return;
      }

      const filterFields = ['name', 'description', 'language'];
      const filteredItems = _filter(this.items, filter, filterFields);

      this.$emit('changeFilter', {
        items: filteredItems,
        filter,
      });
    }, 1000),

    onSubmit(event) {
      event.target.blur();
    },
  },
};
</script>

<style lang="scss">
.result-filter {
  width: 100%;
  padding: $indent-sm $indent-lg;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__input {
    height: 30px;
    flex: 1;
  }
}
</style>
