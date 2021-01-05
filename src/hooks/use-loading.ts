import { ref } from "vue";
import axios from "axios";

function useLoading<T>(url: string) {
  const result = ref<T | null>(null);
  const loading = ref(true);
  const error = ref(null);
  // const result = reactive({
  //   data: null,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // });
  axios
    .get(url)
    .then((rawData) => {
      result.value = rawData.data;
      loading.value = false;
    })
    .catch((e) => {
      error.value = e;
      loading.value = false;
    });
  // const refResult = toRefs(result);
  return { result, loading, error };
}
export default useLoading;
