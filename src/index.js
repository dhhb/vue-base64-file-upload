if (!window.FileReader) {
  console.error('Your browser does not support FileReader API!');
}

export default {
  name: 'vue-base64-file-upload',

  props: {
    imageClass: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: 'image/png,image/gif,image/jpeg'
    },
    maxSize: {
      type: Number,
      default: 10 // megabytes
    },
    disablePreview: {
      type: Boolean,
      default: false
    },
    fileName: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Click here to upload image'
    }
  },

  data() {
    return {
      file: null,
      visiblePreview: false
    };
  },

  computed: {
    wrapperStyles() {
      return {
        'position': 'relative',
        'width': '100%'
      };
    },

    fileInputStyles() {
      return {
        'width': '100%',
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
        'opacity': 0,
        'overflow': 'hidden',
        'outline': 'none',
        'cursor': 'pointer'
      };
    },

    textInputStyles() {
      return {
        'width': '100%',
        'cursor': 'pointer'
      }
    }
  },

  methods: {
    onChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }

      const file = files[0];
      const size = file.size && (file.size / Math.pow(1000, 2));

      // check file max size
      if (size > this.maxSize) {
        this.$emit('size-exceeded', size);
        return;
      }

      // update file
      this.file = file;
      this.$emit('file', file);

      const reader = new FileReader();

      reader.onload = e => {
        const preview = this.$refs.preview;
        const dataURI = e.target.result

        if (dataURI) {
          this.$emit('load', dataURI);

          this.visiblePreview = true;
          preview.src = dataURI;
        }
      };

      // read blob url from file data
      reader.readAsDataURL(file);
    }
  },

  template: `
    <div class="vue-base64-file-upload">
      <img
        v-show="visiblePreview && !disablePreview"
        ref="preview"
        :class="imageClass" />
      <div class="vue-base64-file-upload-wrapper" :style="wrapperStyles">
        <input
          ref="input"
          type="file"
          @change="onChange"
          :style="fileInputStyles"
          :accept=accept />
        <input
          type="text"
          :class="inputClass"
          :style="textInputStyles"
          :value="fileName || file && file.name"
          :placeholder="placeholder"
          disabled />
      </div>
    </div>
  `
};
