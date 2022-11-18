import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/company-update-app/mixins/action';
import mutation from '@base-cms/company-update-app/gql/mutations/portal/leadership';
import getGraphqlError from '../../utils/get-graphql-error';

const { error } = console;

export default Component.extend(ActionMixin, {
  apollo: queryManager(),
  notify: inject(),
  session: inject(),
  config: inject(),
  categories: null,
  hash: null,

  name: null,
  email: null,
  error: null,

  leadershipEnabled: false,
  isOpen: false,
  isInvalid: computed('name', 'email', function() {
    if (!this.name || !this.email) return true;
    return false;
  }),
  isSubmitDisabled: computed.or('isActionRunning', 'isInvalid'),

  categoryPrefix: computed.reads('config.leadershipCategoryPrefix'),

  actions: {
    async submit() {
      this.startAction();
      this.set('error', null);
      const { name, email, hash, categories } = this.getProperties('name', 'email', 'hash', 'categories');
      const payload = { categories };
      const type = 'leadership';
      const variables = { input: { name, email, hash, type, payload } };

      try {
        if(this.leadershipEnabled) {
          await this.apollo.mutate({ mutation, variables });
          if (!this.isDestroyed) this.set('isOpen', false);
          this.notify.info('Changes requested. You will recieve an email shortly confirming your request.', { clearDuration: 30000 });
        }
        else {
          if (!this.isDestroyed) this.set('isOpen', false);
          this.notify.error('You are unable to submit leaders updates for your company due to not having met the necessary requirements, if you believe this is an error contact the respective publication contact', { autoClear: false });
        }
        this.onComplete();
      } catch (e) {
        error(e);
        const err = getGraphqlError(e);
        this.set('error', err);
        this.notify.error(`Something went wrong -- please review your information and try again!`, { autoClear: false });
      } finally {
        this.endAction();
      }
    },

    clear() {
    },
  },

});
