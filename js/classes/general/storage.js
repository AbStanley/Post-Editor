class Storage {
  constructor() {
    this.postList;
    this.tags;
  }

  getPosts() {
    return this.postList;
  }

  setPosts(posts) {
    this.postList = posts;
  }

  getTags() {
    return this.tags;
  }

  getPostsByTag(tag) {   
    return this.postList.filter((post) => post.tags.includes(tag));
  }

  verifyMemory() {
    if (
      localStorage.getItem("posts") === null ||
      JSON.parse(localStorage.getItem("posts")).length < 1
    ) {
      this.postList = [];
      this.tags = [];
    } else {
      this.postList = JSON.parse(localStorage.getItem("posts"));
      this.tags = this.postList.map((post) => post.tags).flat();
    }
  }

  savePosts() {
    localStorage.setItem("posts", JSON.stringify(this.postList));
  }

  savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  deletePost(postId) {
    let posts = this.getPosts();
    let index = posts.findIndex((post) => post.id == postId);
    posts.splice(index, 1);

    if (posts.length < 1) {
      localStorage.removeItem("posts");
      location.reload();
    }
  }
}

export default Storage;
