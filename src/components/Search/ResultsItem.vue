<template lang="pug">
  li.results-item
    .results-item__left
      h3.results-item__name
        a.results-item__name-inner
          | {{ item.full_name }}
      p.results-item__description
        | {{ item.description }}
      p.results-item__updated-at
        | {{ getItemDateLabel(item.pushed_at) }}

    .results-item__right
      .results-item__lang {{ item.language }}
      .results-item__stars {{ getItemStarsLabel(item.stargazers_count) }}
</template>

<script>
import _numeral from 'numeral';
import _dateFormat from '@/utils/date-format';

export default {
  name: 'results-item',

  props: {
    item: {
      type: Object,
      default: () => [],
    },
  },

  methods: {
    getItemDateLabel(value) {
      return `Updated ${_dateFormat(value)}`;
    },

    getItemStarsLabel(count) {
      return count > 0 ? _numeral(count).format('0[.]0a') : '';
    },
  },
};
</script>

<style lang="scss">
.results-item {
  padding: $indent-lg 0;
  border-bottom: 1px solid $grey-4;
  text-align: left;
  user-select: text;

  &__left {
    padding-right: $indent-lg;
    flex: 2;
  }

  &__name {
    font-weight: bold;
    font-size: 20px;
    color: $blue-5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name-inner {
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__description {
    display: inline-block;
    padding-right: $indent-lg + 4;
    padding-bottom: $indent-md - 2;
    font-size: 14px;
    line-height: 1.5;
    color: $grey-8;
  }

  &__updated-at {
    padding-top: $indent-md - 2;
    font-size: 12px;
    color: $grey-7;
  }

  &__right {
    padding-right: $indent-lg - 4;
    font-size: 14px;
    line-height: 1.5;
    display: flex;
    flex: 1;
  }

  &__lang {
    padding-right: $indent-lg - 4;
    color: $grey-8;
    flex: 1 1 auto;
  }

  &__stars {
    color: $grey-8;
    text-align: right;
    flex: 1 1 auto;
  }

  @media screen and (max-width: $mobileScreenWidth) {
    padding: $indent-md 0;

    &__left {
      padding-right: 0;
      padding-bottom: $indent-md - 2;
    }

    &__right {
      padding-right: 0;
    }
  }
}
</style>
