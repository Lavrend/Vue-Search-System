<template lang="pug">
  .result-filter.notranslate
    uiInput.result-filter__input(
      v-model="currentInputValue"
      :placeholder="placeholder"
      :value="currentInputValue"
      type="search"
      @submit="onSubmit"
      @change="onChangeFilter"
    )

    .result-filter__select-block
      span.result-filter__select-label
        | sort by
      uiSelect.result-filter__select(:options="sortOptions" @change="onChangeSort")
</template>

<script>
import _debounce from 'lodash.debounce';
import _filter from '@/utils/filter';

import uiInput from '@/ui/Input';
import uiSelect from '@/ui/Select';

export default {
  name: 'result-filter',

  components: {
    uiInput,
    uiSelect,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      placeholder: 'filter (name, description, lang)',
      inputValue: '',

      sortOptions: [
        { id: 'best', label: 'best match', key: 'shortName', sort: 'none' },
        { id: 'nameAsc', label: 'name (asc)', key: 'shortName', sort: 'asc' },
        { id: 'nameDesc', label: 'name (desc)', key: 'shortName', sort: 'desc' },
        { id: 'ratingAsc', label: 'rating (asc)', key: 'starsCount', sort: 'asc' },
        { id: 'ratingDesc', label: 'rating (desc)', key: 'starsCount', sort: 'desc' },
      ],
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

    onChangeSort(e) {
      this.$emit('changeSort', e);
    },

    onSubmit(event) {
      event.target.blur();
    },
  },
};
</script>

<style lang="scss">
$filterHeight: 30px;

.result-filter {
  width: 100%;
  padding: $indent-sm $indent-lg;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__input {
    min-width: 100px;
    height: $filterHeight;
    flex: 1;
  }

  &__select-block {
    height: $filterHeight;
    margin-left: $indent-lg;
    white-space: nowrap;
    flex: 0;
  }

  &__select-label {
    margin-right: $indent-sm;
    font-size: 14px;
    color: $grey-6;
  }

  &__select {
    height: 100%;
  }

  @media screen and (max-width: $screenWidth-mobile) {
    padding: $indent-sm $indent-md;

    &__select-block {
      margin-left: $indent-md;
    }
  }
}
</style>
