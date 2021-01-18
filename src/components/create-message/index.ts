import { createApp } from 'vue';
import Message from '../message/index.vue';
export type MessageType = 'success' | 'error' | 'default';
// 函数式创建组件
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  });
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  messageInstance.mount(mountNode);
  setTimeout(() => {
    messageInstance.unmount(mountNode);
    document.body.removeChild(mountNode);
  }, timeout);
};
export default createMessage;
