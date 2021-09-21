class Post {
  constructor(id, image, title, content, tags) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.content = content;
    this.tags = tags;
  }

  getPost() {
    return {
      id: this.id,
      image: this.image,
      title: this.title,
      content: this.content,
      tags: this.tags,
    };
  }

  getPostId() {
    return this.id;
  }

  getPostImage() {
    return this.image;
  }

  getPostTitle() {
    return this.title;
  }

  getPostContent() {
    return this.content;
  }

  getPostTags() {
    return this.tags;
  }
}
export default Post;
