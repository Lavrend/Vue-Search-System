<template lang="pug">
  select.ui-select(@change="onChange")
    option(
      v-for="option, index in options"
      :key="option.id"
      :value="index"
      :selected="index === currentValue"
    ) {{ option.label }}
</template>

<script>
export default {
  name: 'ui-select',
  props: {
    currentValue: {
      type: Number,
      default: 0,
    },

    options: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    onChange(event) {
      const index = event.target.value;

      this.$emit('change', this.options[index]);
    },
  },
};
</script>

<style lang="scss">
.ui-select {
  display: inline-block;
  font-size: 14px;
  background: $white;
  border: 1px solid $grey-5;
  outline: none;
  color: $grey-7;

  &:focus {
    box-shadow: 0 0 1px 1pt $blue-4 inset;
  }
}
</style>
