<template lang="pug">
  .search-header
    uiInput.search-header__input(
      v-model="currentInputValue"
      :placeholder="getPlaceholderText"
      :value="currentInputValue"
      ref="searchInput"
      type="search"
      @submit="onSubmit"
    )
    uiButton.search-header__btn-send(
      color="info"
      :isLoading="isLoading"
      :isLocked="hasFormLocked"
      title="Send"
      @click="onSubmit"
    )
      svgicon.search-header__btn-icon(icon="search" custom)
      span.search-header__btn-label Send
</template>

<script>
import { mapActions } from 'vuex';
import config from '@/config';

import uiInput from '@/ui/Input';
import uiButton from '@/ui/Button';

export default {
  name: 'search-header',

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

  mounted() {
    this.$nextTick(() => {
      this.$refs.searchInput.$el.focus();
    });
  },

  methods: {
    ...mapActions('app', [
      'setHistoryActive',
    ]),

    ...mapActions('search', [
      'setHistoryData',
    ]),

    async onSubmit() {
      if (this.hasFormLocked) return;
      this.isLoading = true;

      await this.setHistoryData({
        query: this.currentInputValue,
      }).finally(() => {
        this.isLoading = false;
        this.currentInputValue = '';
        this.$refs.searchInput.$el.blur();
      });

      this.setHistoryActive(false);
    },
  },
};
</script>

<style lang="scss">
.search-header {
  width: 100%;
  height: 100%;
  max-width: $maxWidth-searchResult;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  &__input {
    flex: 1;
  }

  &__btn-send {
    margin-left: $indent-md;
    padding-left: $indent-lg;
    padding-right: $indent-lg;
    font-size: 15px;
  }

  &__btn-icon {
    width: .8em;
    height: .8em;
    margin-top: 2px;
  }

  &__btn-label {
    margin-left: $indent-sm;
    white-space: nowrap;
  }

  @media screen and (max-width: $screenWidth-mobile) {
    &__btn-send {
      padding-top: $indent-sm + 1;
      padding-bottom: $indent-sm + 1;
    }

    &__btn-label {
      display: none;
    }

    &__btn-icon {
      width: 1em;
      height: 1em;
    }
  }
}
</style>
