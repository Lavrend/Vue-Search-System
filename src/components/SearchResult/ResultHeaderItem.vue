<template lang="pug">
  a.result-header-item(:class="getItemClass" :title="label" @click.prevent="changeTab")
    .result-header-item__inner
      svgicon.result-header-item__icon(v-if="isHistory" icon="history" custom)
      span.result-header-item__label {{ label }}

      .result-header-item__close(v-if="isHistory" @click.stop="closeTab")
        svgicon.result-header-item__close-icon(icon="close" custom)
</template>

<script>
export default {
  name: 'result-header-item',

  props: {
    label: {
      type: [String, Number],
      default: '',
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    isHistory: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getItemClass() {
      return {
        'result-header-item--active': this.isActive,
        'result-header-item--history': this.isHistory,
      };
    },
  },

  methods: {
    changeTab(event) {
      this.$emit('changeTab', event);
    },

    closeTab(event) {
      this.$emit('closeTab', event);
    },
  },
};
</script>

<style lang="scss">
.result-header-item {
  padding: $indent-md $indent-lg;
  background: $grey-4;
  border-right: 1px solid $grey-5;
  border-bottom: 3px solid $grey-5;
  color: $grey-7;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all .5s ease;
  cursor: pointer;
  flex: 1;

  &__inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  &__icon {
    width: 1em;
    height: 1em;
    margin-top: $indent-xs;
    margin-right: $indent-sm;
  }

  &__close {
    margin-right: -$indent-sm;
    padding: $indent-sm - 1 $indent-sm;
    opacity: 0.8;
    transition: opacity .3s ease;
    cursor: pointer;

    display: flex;
    align-items: center;

    &:active {
      margin-top: 1px;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__close-icon {
    width: 1em;
    height: 1em;
    margin-top: $indent-xs;
  }

  &--active {
    background: $blue-3;
    border-bottom-color: $blue-4;
    color: $white;
    cursor: default;
  }

  &--history {
    background: $yellow-4;
    color: $white;
    fill: $white;
  }

  &:last-child {
    border-right: 0;
  }

  &:hover {
    background: $grey-2;
  }

  &--active:hover {
    background: $blue-3;
  }

  &--history:hover {
    background: $yellow-4;
  }

  @media screen and (max-width: $screenWidth-mobile) {
    background: transparent;
    border: none;
    cursor: default;

    &:hover {
      background: transparent;
    }
  }
}
</style>
