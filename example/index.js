import Vue from 'vue';
import VueBlobFileUpload from '../';

const app = new Vue({
  components: {
    VueBlobFileUpload
  },

  template: `
    <div>
      <h2>Vue Blob File Upload</h2>
      <vue-blob-file-upload />
    </div>
  `
});

app.$mount('#app');
