<template>
  <main>
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="handlePausePlay"
        >
          <i class="fa" :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(10, "currency", "en") }}</div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{ $t("song.comment_count", song.comment_count, { count: song.comment_count }) }}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <!-- Form -->
          <div
            class="text-center text-white font-bold p-4 mb-4"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form @submit="addComment" v-if="userLoggedIn">
            <vee-field
              name="comment"
              :rules="'required|min:3'"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600 block" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { songsCollection, auth, commentsCollection } from "@/includes/firebase";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Song",
  data() {
    return {
      song: {},
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      commant_alert_message: "Please wait! Your comment is being submitted",
      comments: [],
      sort: "1",
    };
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
      currentSong: (state) => state.player.currentSong,
    }),
    ...mapGetters(["playing"]),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
    isPlaying() {
      return this.$route.params.id === this.currentSong.docID && this.playing;
    },
  },
  async created() {
    // const docSnapshot = await songsCollection.doc(this.$route.params.id).get();

    // if (!docSnapshot.exists) {
    //   this.$router.push({ name: "home" });
    //   return;
    // }

    // const { sort } = this.$route.query;

    // this.sort = sort === "1" || sort === "2" ? sort : "1";

    // this.song = docSnapshot.data();
    this.getComments();
  },
  async beforeRouteEnter(to, from, next) {
    const docSnapshot = await songsCollection.doc(to.params.id).get();

    next((vm) => {
      if (!docSnapshot.exists) {
        vm.$router.push({ name: "home" });
        return;
      }

      const { sort } = vm.$route.query;

      vm.sort = sort === "1" || sort === "2" ? sort : "1";

      vm.song = docSnapshot.data();
      // vm.getComments();
    });
  },
  methods: {
    ...mapActions(["newSong", "toggleAudio"]),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_message = "Please wait! Your comment is being submitted";

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      const commentRef = await commentsCollection.add(comment);
      const commentSnapshot = await commentRef.get();

      this.song.comment_count += 1;
      await songsCollection
        .doc(this.$route.params.id)
        .update({ comment_count: this.song.comment_count });

      // this.getComments();
      this.comments =
        this.sort === "1"
          ? [{ docID: commentSnapshot.id, ...commentSnapshot.data() }, ...this.comments]
          : [...this.comments, { docID: commentSnapshot.id, ...commentSnapshot.data() }];

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_message = "Comment added!";

      resetForm();

      setTimeout(() => {
        this.comment_show_alert = false;
      }, 5000);
    },
    async getComments() {
      const snapShots = await commentsCollection.where("sid", "==", this.$route.params.id).get();

      snapShots.forEach((doc) => {
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    },
    handlePausePlay() {
      if (this.$route.params.id === this.currentSong.docID) {
        this.toggleAudio();
        return;
      }

      this.newSong({ ...this.song, docID: this.$route.params.id });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
