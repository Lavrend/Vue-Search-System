<template lang="pug">
  .search-panel
    uiInput.search-panel__input(
      v-model="currentInputValue"
      :placeholder="getPlaceholderText"
      :value="currentInputValue"
      ref="searchInput"
      type="search"
      @submit="onSubmit"
    )
    uiButton.search-panel__btn-send(
      color="info"
      :isLoading="isLoading"
      :isLocked="hasFormLocked"
      @click="onSubmit"
    ) Send
</template>

<script>
import config from '@/config';

import uiInput from '@/ui/Input';
import uiButton from '@/ui/Button';

export default {
  name: 'search-panel',

  components: {
    uiInput,
    uiButton,
  },

  data() {
    return {
      inputValue: '',

      isLoading: false,
      isLocked: false,
    };
  },

  computed: {
    getPlaceholderText() {
      return `Query (min ${config.MIN_QUERY_SIZE})`;
    },

    currentInputValue: {
      get() {
        return this.inputValue;
      },

      set(value) {
        this.inputValue = String(value || '').trim();
      },
    },

    hasFormLocked() {
      return this.isLocked || this.currentInputValue.length < config.MIN_QUERY_SIZE;
    },
  },

  created() {
    this.$nextTick(() => {
      this.inputFocusActive(true);
    });
  },

  methods: {
    inputFocusActive(active) {
      if (active) {
        this.$refs.searchInput.$el.focus();
        return;
      }

      this.$refs.searchInput.$el.blur();
    },

    onSubmit() {
      if (this.hasFormLocked) return;
      this.isLoading = true;

      this.$store.dispatch('search/setItems', {
        query: this.currentInputValue,
      }).finally(() => {
        this.isLoading = false;
        this.currentInputValue = '';
        this.inputFocusActive(false);
      });
    },
  },
};
</script>

<style lang="scss">
.search-panel {
  width: 100%;
  height: 100%;
  max-width: $searchListMaxWidth;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  &__input {
    flex: 1;
  }

  &__btn-send {
    width: 100px;
    margin-left: $indent-md;
    font-size: 15px;
  }
}
</style>
