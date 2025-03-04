<template>
  <div class="app-container">
    <h1>Wanted Unfollowers</h1>
    <input type="file" @change="handleFileUpload" accept="application/json" />

    <div v-if="unfollowers.length" class="section">
      <h2>Unfollowers 🚨</h2>
      <div v-for="user in unfollowers" :key="user" class="wanted">
        <span>{{ user }}</span>
        <button @click="removeUser(user)">Unfollow</button>
      </div>
    </div>

    <div v-if="followersNotFollowedBack.length" class="section">
      <h2>Followers Not Followed Back 🔄</h2>
      <ul>
        <li v-for="user in followersNotFollowedBack" :key="user">{{ user }}</li>
      </ul>
    </div>

    <div v-if="mutualFollowers.length" class="section">
      <h2>Mutual Followers 🤝</h2>
      <ul>
        <li v-for="user in mutualFollowers" :key="user">{{ user }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const unfollowers = ref<string[]>(
  JSON.parse(localStorage.getItem("unfollowers") || "[]")
);
const followersNotFollowedBack = ref<string[]>(
  JSON.parse(localStorage.getItem("followersNotFollowedBack") || "[]")
);
const mutualFollowers = ref<string[]>(
  JSON.parse(localStorage.getItem("mutualFollowers") || "[]")
);
const removedUsers = ref<Set<string>>(
  new Set(JSON.parse(localStorage.getItem("removedUsers") || "[]"))
);

const saveToLocalStorage = () => {
  localStorage.setItem("unfollowers", JSON.stringify(unfollowers.value));
  localStorage.setItem(
    "followersNotFollowedBack",
    JSON.stringify(followersNotFollowedBack.value)
  );
  localStorage.setItem(
    "mutualFollowers",
    JSON.stringify(mutualFollowers.value)
  );
  localStorage.setItem("removedUsers", JSON.stringify(Array.from(removedUsers.value)));
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      const followersSet = new Set(data.followers);
      const followingSet = new Set(data.following);

      unfollowers.value = data.following.filter(
        (user: string) => !followersSet.has(user)
      );
      followersNotFollowedBack.value = data.followers.filter(
        (user: string) => !followingSet.has(user)
      );
      mutualFollowers.value = data.followers.filter((user: string) =>
        followingSet.has(user)
      );

      saveToLocalStorage();
    } catch (error) {
      console.error("Invalid file format", error);
    }
  };

  reader.readAsText(file);
};

const removeUser = (username: string) => {
  removedUsers.value.add(username);
  unfollowers.value = unfollowers.value.filter((user) => user !== username);
  followersNotFollowedBack.value = followersNotFollowedBack.value.filter(
    (user) => user !== username
  );
  mutualFollowers.value = mutualFollowers.value.filter(
    (user) => user !== username
  );
  saveToLocalStorage();
};

onMounted(() => {
  unfollowers.value = unfollowers.value.filter(
    (user) => !removedUsers.value.has(user)
  );
  followersNotFollowedBack.value = followersNotFollowedBack.value.filter(
    (user) => !removedUsers.value.has(user)
  );
  mutualFollowers.value = mutualFollowers.value.filter(
    (user) => !removedUsers.value.has(user)
  );
});
</script>

<style scoped>
.app-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.section {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.wanted {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffdddd;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: darkred;
}
</style>
