<template lang="pug">
  .ui-input
    input.ui-input__input(
      v-model="currentValue"
      :placeholder="placeholder"
      :type="type"
      :size="size"
      :title="placeholder"
      @keyup.enter="onSubmit"
      @blur="onBlur"
    )
</template>

<script>
export default {
  name: 'ui-input',
  props: {
    type: {
      type: String,
      default: 'text',
    },

    value: [String, Number],
    placeholder: [String, Number],
    size: [Number, String],
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  computed: {
    currentValue: {
      get() {
        return this.value;
      },

      set(value) {
        return this.$emit('change', value);
      },
    },
  },

  methods: {
    onBlur(event) {
      this.$emit('blur', event);
    },

    onInput(event) {
      this.$emit('input', event);
    },

    onSubmit(event) {
      this.$emit('submit', event);
    },
  },
};
</script>

<style lang="scss">
.ui-input {
  display: inline-block;

  &__input {
    width: 100%;
    height: 100%;
    padding: $indent-md - 2;
    padding-top: $indent-md - 3;
    font-size: 14px;
    background: $grey-2;
    border-radius: 3px;
    border: 1px solid $grey-5;
    outline: none;
    color: $grey-7;

    &:focus {
      box-shadow: 0 0 1px 1pt $blue-4 inset;
    }
  }

  &__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &__input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &__input::-webkit-textfield-decoration-container {
    appearance: none;
  }

  &__input::-webkit-input-placeholder { color: $grey-6; text-overflow: ellipsis; }
  &__input::-ms-input-placeholder { color: $grey-6; text-overflow: ellipsis; }
  &__input::-moz-placeholder { color: $grey-6; text-overflow: ellipsis; }
  &__input::placeholder { color: $grey-6; text-overflow: ellipsis; }
}
</style>
