    <template>
        <div>
            <label for="classificationsFile">Sample Data: </label>
            <input id="classificationsFile" type="file" @change="handleFileChange" />
            <p v-if="fileContent">{{ fileContent }}</p>
        </div>
    </template>

    <script>
    export default {
      data() {
        return {
          fileContent: null,
        };
      },
      methods: {
        handleFileChange(event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e);
              this.fileContent = e.target.result;
            };
            reader.readAsText(file); // Or readAsDataURL, readAsArrayBuffer
          }
        },
      },
    };
    </script>