import { reactive, ref } from 'vue';

import QForm from '@/qComponents/QForm';
import QFormItem from '@/qComponents/QFormItem';
import { QFormProvider } from '@/qComponents/QForm/src/types';

export default {
  title: 'Components/QForm',
  component: QForm,
  subcomponents: { QFormItem },
  argTypes: {
    rules: { control: { type: 'object' } },
    model: { control: { type: 'none' } }
  }
};

const Template = (args: any) => ({
  components: { QForm, QFormItem },
  setup() {
    const form = ref<QFormProvider | null>(null);

    const formModel = reactive({
      name: '',
      intro: ''
    });

    const handleSubmitClick = async () => {
      const valid = await form?.value?.validate();
      if (valid) {
        const { isValid, invalidFields } = valid;
        console.log('QForm | validate', isValid, invalidFields);
        if (isValid) {
          // eslint-disable-next-line no-alert
          alert('Success');
        }
      }
    };

    const handleResetClick = () => {
      form?.value?.resetFields();
    };

    return {
      form,
      args,
      formModel,
      handleSubmitClick,
      handleResetClick
    };
  },

  template: `
    <q-form
      ref="form"
      :model="formModel"
      :rules="args.rules"
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
      <q-button @click="handleResetClick">Reset</q-button>
    </q-form>
  `
});

export const Default: any = Template.bind({});
Default.args = {
  rules: {
    name: [
      {
        required: true,
        message: 'Please input name',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 10,
        message: 'Length should be 3 to 10',
        trigger: 'blur'
      }
    ],
    intro: {
      required: true,
      message: 'Please input introtext',
      trigger: 'change'
    }
  }
};
