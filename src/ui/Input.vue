<template lang="pug">
  input.ui-input(
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
  padding: $indent-md - 2;
  padding-top: $indent-md - 3;
  font-size: 14px;
  background: $white;
  border-radius: 3px;
  border: 1px solid $grey-5;
  outline: none;
  color: $grey-7;

  &:focus {
    box-shadow: 0 0 1px 1pt $blue-4 inset;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &::-webkit-textfield-decoration-container {
    appearance: none;
  }

  &::-webkit-input-placeholder { color: $grey-6; text-overflow: ellipsis; }
  &::-ms-input-placeholder { color: $grey-6; text-overflow: ellipsis; }
  &::-moz-placeholder { color: $grey-6; text-overflow: ellipsis; }
  &::placeholder { color: $grey-6; text-overflow: ellipsis; }
}
</style>
