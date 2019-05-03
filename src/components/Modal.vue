<template lang="pug">
  article.modal
    .modal__position-wrapper
      .modal__container
        .modal__content
          .modal__content-main
            h3.modal__name
              | {{ currentModalItem.full_name }}
            p.modal__description
              | {{ currentModalItem.description }}

          .modal__content-summary.notranslate
            .modal__summary-left
              .modal__updated-at
                | {{ getItemDateLabel(currentModalItem.pushed_at) }}

            .modal__summary-main.notranslate
              .modal__watchers
                .modal__watchers-inner
                  svgicon.modal__watchers-icon(icon="eye" custom)
                  span.modal__watchers-label {{ getItemShortLabel(currentModalItem.watchers) }}

              .modal__stars
                .modal__stars-inner
                  svgicon.modal__stars-icon(icon="star" custom)
                  span.modal__stars-label {{ getItemShortLabel(currentModalItem.stargazers_count) }}

              .modal__forks
                .modal__forks-inner
                  svgicon.modal__forks-icon(icon="fork" custom)
                  span.modal__forks-label {{ getItemShortLabel(currentModalItem.forks) }}

            .modal__summary-right
              .modal__lang
                span.results-item__lang-color(v-if="currentModalItem.language" :style="getLangColorStyles(currentModalItem.language)")
                | {{ currentModalItem.language }}

          .modal__footer.notranslate
            .modal__author(:title="getOwnerLogin")
              img.modal__author-avatar(:src="getOwnerAvatar")
              .modal__author-login {{ getOwnerLogin }}

            .modal__github-block
              a.modal__github-link(
                :href="getOwnerLink"
                target="_black"
              )
                | GitHub page
                svgicon.modal__github-icon(icon="github" custom)

        uiButton.modal__btn-close(
          color="error"
          isRounded
          @click="closeModal"
        )
          svgicon.modal__btn-close-icon(icon="close" custom)
</template>

<script>
import { mapState } from 'vuex';
import langsColors from '@/config/langsColors';

import _numeral from 'numeral';
import _dateFormat from '@/utils/date-format';

import uiButton from '@/ui/Button';

export default {
  name: 'modal-component',

  components: {
    uiButton,
  },

  computed: {
    ...mapState('app', [
      'isModalActive',
    ]),

    ...mapState('search', [
      'currentModalItem',
    ]),

    getOwnerAvatar() {
      return this.currentModalItem.owner ? this.currentModalItem.owner.avatar_url : '';
    },

    getOwnerLogin() {
      return this.currentModalItem.owner ? this.currentModalItem.owner.login : '';
    },

    getOwnerLink() {
      return this.currentModalItem.owner ? this.currentModalItem.owner.html_url : '';
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

    closeModal() {
      this.$store.dispatch('app/setModalActive', { active: false, item: {} });
    },
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: $indent-lg;

  // Need for display the layer correct (after overlay)
  z-index: $zIndexOverlay;

  &__position-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__container {
    position: relative;
    width: $modalDefaultWidth;
    min-width: $screenMinWidth;
    max-width: $screenMaxWidth;
    min-height: 25%;
    margin: 0 auto;
  }

  &__content {
    width: 100%;
    padding: $indent-lg $indent-lg * 1.5;
    background: $white;
    border-radius: $borderRadius;
    box-shadow: $boxShadow-black;

    overflow-y: auto;
  }

  &__name {
    font-weight: bold;
    font-size: 30px;
    color: $blue-5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  &__btn-close {
    position: absolute;
    top: -$indent-sm;
    right: -$indent-sm;
    padding: $indent-sm;
    padding-bottom: $indent-sm - 2;
  }

  &__btn-close-icon {
    width: 2em;
    height: 2em;
  }

  @media screen and (max-width: $mobileScreenWidth) {
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
