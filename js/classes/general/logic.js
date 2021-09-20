class Logic {
    addPost(post, storage) {

        let posts = storage.getPosts();

        posts.push(post);
        storage.savePosts(posts);  
        return true;

    }
}
export default Logic;