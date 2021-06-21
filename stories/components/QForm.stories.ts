// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta, Story } from '@storybook/vue3';
import {
  defineComponent,
  reactive,
  ref,
  ComponentPublicInstance,
  UnwrapRef
} from 'vue';

import QForm from '@/qComponents/QForm';
import QFormItem from '@/qComponents/QFormItem';
import type {
  QFormProps,
  QFormPropRules,
  QFormPropModel,
  QFormInstance
} from '@/qComponents/QForm';
import type { Nullable } from '#/helpers';

const storyMetadata: Meta = {
  title: 'Components/QForm',
  component: QForm,
  subcomponents: { QFormItem },
  argTypes: {
    rules: { control: { type: 'object' } },
    model: { control: { type: 'none' } }
  }
};

const model: QFormPropModel = {
  name: '',
  intro: ''
};

const INITIAL_RULES: QFormPropRules = {
  name: [
    { required: false },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  intro: {
    required: true,
    message: 'Please input introtext',
    trigger: 'change'
  }
};

const QFormStory: Story<QFormProps> = args =>
  defineComponent({
    setup() {
      const form =
        ref<Nullable<ComponentPublicInstance<UnwrapRef<QFormInstance>>>>(null);

      const formModel = reactive(model);
      const rules = reactive(INITIAL_RULES);

      const handleSubmitClick = async (): Promise<void> => {
        const valid = await form?.value?.validate();
        if (valid) {
          const { isValid, invalidFields } = valid;
          // eslint-disable-next-line no-console
          console.log('QForm | validate', isValid, invalidFields);
          if (isValid) {
            // eslint-disable-next-line no-alert
            alert('Success');
          }
        }
      };

      const handleResetClick = (): void => {
        form?.value?.resetFields();
      };

      const handleRule = (): void => {
        rules.name = {
          required: true,
          message: 'Please input name',
          trigger: 'blur'
        };
      };

      return {
        form,
        args,
        formModel,
        rules,
        handleSubmitClick,
        handleResetClick,
        handleRule
      };
    },

    template: `
      <q-form
        ref="form"
        :model="formModel"
        :rules="rules"
        :disabled="args.disabled"
        :hideRequiredAsterisk="args.hideRequiredAsterisk"
        :showErrorMessage="args.showErrorMessage"
        :validateOnRuleChange="args.validateOnRuleChange"
      >
        <q-form-item
          label="Name"
          prop="name"
        >
          <q-input
            v-model="formModel.name"
            type="text"
          />
        </q-form-item>

        <q-form-item
          label="Intro"
          prop="intro"
        >
          <q-input
            v-model="formModel.intro"
            type="text"
          />
        </q-form-item>

        <q-button @click="handleSubmitClick">Create</q-button>
        <q-button @click="handleResetClick" theme="secondary">Reset</q-button>
        <q-button @click="handleRule" theme="secondary">Make Name required</q-button>
      </q-form>
    `
  });

QFormStory.storyName = 'Default';

export { QFormStory };
export default storyMetadata;
