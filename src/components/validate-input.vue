<template>
  <div class="validate-input-wrapper">
    <label for="exampleInputEmail1" class="form-label">{{ label }}</label>
    <input
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      id="exampleInputEmail1"
      v-if="tag !== 'textarea'"
      aria-describedby="emailHelp"
      :value="inputRef.val"
      @blur="validateHandle"
      @input="updateVal"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateHandle"
      @input="updateVal"
      v-bind="$attrs"
    ></textarea>
    <div class="invalid-feedback">
      {{ inputRef.message }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { emitter } from './validate-form.vue';
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
interface RuleEmailProps {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type RuleEmailType = RuleEmailProps[];
export type TagType = 'input' | 'textarea';
export default defineComponent({
  name: 'validate-input',
  props: {
    label: String,
    rules: Array as PropType<RuleEmailType>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // props are reactive
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    });
    const updateVal = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit('update:modelValue', targetValue);
    };
    const validateHandle = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'required':
              passed = !(inputRef.val.trim() === '');
              break;
            case 'email':
              passed = emailReg.test(inputRef.val);
              break;
            case 'custom':
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      // 给监听器发送信号
      emitter.emit('form-item-created', validateHandle);
    });
    return { inputRef, validateHandle, updateVal };
  }
});
</script>
<style scoped></style>
