<template>
  <el-autocomplete
    v-model="state"
    :suffix-icon="Search"
    :fetch-suggestions="querySearchAsync"
    placeholder="Search product..."
    size="large"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const props = defineProps({
  products: { type: Array, default: () => [], required: true },
});

let renameKeys = props.products;
renameKeys.forEach((element) => {
  if (element['title'] !== undefined) {
    element['value'] = element['title'];
    delete element['title'];
  }
});

const state = ref('');

interface LinkItem {
  title: string;
}

const links = ref<LinkItem[]>([]);

const emit = defineEmits(['onChildUpdate']);

const loadAll = () => {
  return renameKeys;
};

let timeout: NodeJS.Timeout;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
};
const createFilter = (queryString: string) => {
  return (product: LinkItem) => {
    return product.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const handleSelect = (item: LinkItem) => {
  emit('onChildUpdate', item);
};

onMounted(() => {
  links.value = loadAll();
});
</script>
