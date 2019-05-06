<template lang="pug">
  article.modal-info
    .modal-info__main
      h3.modal-info__name
        | {{ data.name }}
      p.modal-info__description
        | {{ data.description }}

    .modal-info__content-summary.notranslate
      .modal-info__summary-left
        .modal-info__updated-at
          | {{ getItemDateLabel(data.pushedAt) }}

      .modal-info__summary-main.notranslate
        .modal-info__watchers
          .modal-info__watchers-inner
            svgicon.modal-info__watchers-icon(icon="eye" custom)
            span.modal-info__watchers-label {{ getItemShortLabel(data.watchers) }}

        .modal-info__stars
          .modal-info__stars-inner
            svgicon.modal-info__stars-icon(icon="star" custom)
            span.modal-info__stars-label {{ getItemShortLabel(data.starsCount) }}

        .modal-info__forks
          .modal-info__forks-inner
            svgicon.modal-info__forks-icon(icon="fork" custom)
            span.modal-info__forks-label {{ getItemShortLabel(data.forks) }}

      .modal-info__summary-right
        .modal-info__lang
          span.modal-info__lang-color(v-if="data.language" :style="getLangColorStyles(data.language)")
          | {{ data.language }}

    .modal-info__footer.notranslate
      .modal-info__author(:title="getOwnerLogin")
        img.modal-info__author-avatar(:src="getOwnerAvatar")
        .modal-info__author-login {{ getOwnerLogin }}

      .modal-info__github-block
        a.modal-info__github-link(
          :href="getOwnerLink"
          target="_black"
        )
          | GitHub page
          svgicon.modal-info__github-icon(icon="github" custom)
</template>

<script>
import langsColors from '@/config/langsColors';

import _numeral from 'numeral';
import _dateFormat from '@/utils/date-format';

export default {
  name: 'modal-info',

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    getOwnerAvatar() {
      return this.data.owner ? this.data.owner.avatar : '';
    },

    getOwnerLogin() {
      return this.data.owner ? this.data.owner.login : '';
    },

    getOwnerLink() {
      return this.data.owner ? this.data.owner.url : '';
    },
  },

  methods: {
    getItemDateLabel(value) {
      return `Updated ${_dateFormat.getDateLabel(value)}`;
    },

    getItemShortLabel(count) {
      return count > 0 ? _numeral(count).format('0[.]0a') : '';
    },

    getLangColorStyles(lang) {
      return {
        backgroundColor: langsColors[lang] || '#ccc',
      };
    },
  },
};
</script>

<style lang="scss">
.modal-info {
  background: $white;
  border-radius: $borderRadius;
  box-shadow: $boxShadow-black;

  overflow-y: auto;

  &__name {
    font-weight: bold;
    font-size: 30px;
    line-height: 1.2;
    color: $blue-5;
    word-break: break-word;
  }

  &__description {
    display: inline-block;
    padding-bottom: $indent-md - 2;
    font-size: 18px;
    line-height: 1.5;
    color: $grey-8;
  }

  &__content-summary {
    padding: $indent-lg 0;
    border-bottom: 2px solid $grey-3;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__summary-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
  }

  &__summary-main {
    padding-left: $indent-lg;
    padding-right: $indent-lg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  &__summary-right {
    font-size: 14px;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }

  &__updated-at {
    font-size: 12px;
    color: $grey-7;
  }

  &__lang {
    color: $grey-8;
    word-break: break-word;
  }

  &__lang-color {
    width: 12px;
    height: 12px;
    margin-bottom: -1px;
    margin-right: $indent-md - 2;
    border-radius: 50%;
    display: inline-block;
  }

  &__watchers,
  &__forks,
  &__stars {
    margin: 0 $indent-sm;
    color: $grey-8;
    fill: $grey-8;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex: 1 1 auto;
  }

  &__watchers-inner,
  &__forks-inner,
  &__stars-inner {
    display: flex;
    align-items: center;
  }

  &__watchers-icon,
  &__forks-icon,
  &__stars-icon {
    width: 1em;
    height: 1em;
    margin-right: $indent-xs;
    margin-top: -$indent-xs;
  }

  &__footer {
    width: 100%;
    margin-top: $indent-lg;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__footer-title {
    text-align: left;
    color: $grey-6;
    flex: 1;
  }

  &__author {
    white-space: nowrap;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
  }

  &__author-avatar {
    width: 40px;
    height: 40px;
    margin-right: $indent-md;
    border-radius: $borderRadius;
  }

  &__author-login {
    width: 100%;
    padding-right: $indent-md;
    font-size: 20px;
    line-height: 1.3em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $grey-7;
  }

  &__github-block {
    display: flex;
    align-items: center;
    flex: 0;
  }

  &__github-icon {
    width: 2.4em;
    height: 2.4em;
    margin-left: $indent-md;
  }

  &__github-link {
    font-size: 16px;
    color: $blue-4;
    fill: $blue-4;
    white-space: nowrap;
    transition: all .2s ease;

    display: flex;
    align-items: center;

    &:hover {
      color: $blue-5;
      fill: $blue-5;
    }
  }

  @media screen and (max-width: $screenWidth-mobile) {
    &__content-summary {
      flex-direction: column-reverse;
    }

    &__summary-left,
    &__summary-main,
    &__summary-right {
      margin-top: $indent-md;
    }
  }
}
</style>
