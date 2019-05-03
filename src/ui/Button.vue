<template lang="pug">
  button.ui-button(
    :class="getButtonClass"
    :type="type"
    :locked="isLocked"
    @click="onClick"
  )
    transition(name="transition-fade")
      .ui-button__inner
        slot
    transition(name="transition-fade")
      uiSpinner.ui-button__spinner(v-if="isLoading")
</template>

<script>
import uiSpinner from '@/ui/Spinner';

export default {
  name: 'ui-button',
  props: {
    type: {
      type: String,
      default: 'button',
    },

    color: {
      type: String,
      default: 'default',
    },

    isLocked: Boolean,
    isLoading: Boolean,
    isRounded: Boolean,
  },

  components: {
    uiSpinner,
  },

  computed: {
    getButtonClass() {
      return {
        [`ui-button--${this.color}`]: true,
        'ui-button--loading': this.isLoading,
        'ui-button--locked': this.isLocked,
        'ui-button--disable': this.isLocked || this.isLoading,
        'ui-button--rounded': this.isRounded,
      };
    },
  },

  methods: {
    onClick(event) {
      if (this.isLocked || this.isLoading) return;
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss">
.ui-button{
  padding: $indent-md - 2;
  border-radius: $borderRadius / 2;
  outline: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: background .5s ease;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__spinner {
    position: absolute;
    width: 1em;
    height: 1em;
  }

  &--default {
    background: $white;
    border: 1px solid $grey-4;
    color: $grey-6;
    fill: $grey-6;

    &:not(.ui-button--disable):hover {
      background: darken($white, 10%);
      border-color: darken($grey-4, 10%);
      color: darken($grey-6, 10%);
      fill: darken($grey-6, 10%);
    }
  }

  &--info {
    background: $blue-3;
    border: 1px solid $blue-4;
    color: $white;
    fill: $white;

    &:not(.ui-button--disable):hover {
      background: lighten($blue-3, 10%);
      border-color: lighten($blue-4, 10%);
    }
  }

  &--success {
    background: $green-3;
    border: 1px solid $green-4;
    color: $white;
    fill: $white;

    &:not(.ui-button--disable):hover {
      background: lighten($green-3, 10%);
      border-color: lighten($green-4, 10%);
    }
  }

  &--error {
    background: $red-3;
    border: 1px solid $red-4;
    color: $white;
    fill: $white;

    &:not(.ui-button--disable):hover {
      background: lighten($red-3, 10%);
      border-color: lighten($red-4, 10%);
    }
  }

  &--warning {
    background: $yellow-3;
    border: 1px solid $yellow-4;
    color: $white;
    fill: $white;

    &:not(.ui-button--disable):hover {
      background: lighten($yellow-3, 10%);
      border-color: lighten($yellow-4, 10%);
    }
  }

  &--locked {
    background: $grey-3;
    border-color: transparent;
    color: darken($grey-3, 10%);
    fill: darken($grey-3, 10%);
    cursor: not-allowed;
  }

  &--rounded {
    border-radius: 100%;
  }

  &--loading {
    cursor: default;
  }

  &--loading &__inner {
    opacity: 0.2;
  }

  &:not(.ui-button--disable):active {
    transform: scale(0.98);
  }
}
</style>
