<template>
  <div class="input-group">
    <input type="text" class="form-control" readonly :value="modelValue" />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" ref="emojiBtn">
        {{ modelValue ? modelValue : "Select" }}
      </button>
    </div>
  </div>
</template>

<script>
import EmojiButton from "@joeattardi/emoji-button";

export default {
  name: "EmojiInput",
  props: {
    modelValue: {
      required: true,
    },
    options: {
      default: function () {
        return {};
      },
    },
  },
  mounted() {
    const picker = new EmojiButton(this.options);
    const btn = this.$refs.emojiBtn;

    picker.on("emoji", (emoji) => {
      console.log(emoji);
      this.$emit("update:modelValue", emoji);
    });

    btn.addEventListener("click", () => {
      picker.togglePicker(btn);
    });
  },
};
</script>

<style>
</style>