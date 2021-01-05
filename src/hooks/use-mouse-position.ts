import { onMounted, onUnmounted, reactive, toRefs } from "vue";
function useMousePosition() {
  const mousePosition = reactive({
    x: 0,
    y: 0,
  });
  const updateMouse = (e: MouseEvent) => {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });
  const refMousePosition = toRefs(mousePosition);
  return { ...refMousePosition };
}

export default useMousePosition;
