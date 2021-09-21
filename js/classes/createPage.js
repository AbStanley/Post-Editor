
class CreatePage  {
    constructor(page) {
        document.querySelector(".body").innerHTML = `
        <form class="post-form">
            <label>Image:</label>
            <input type="file" id="img" name="img" accept="image/*" required>
            <label>Title:</label>
            <input type="text" id="title" placeholder="Title" required>
            <label>Body content:</label>
            <textarea id="content" placeholder="Content" required></textarea>
            <label>Tags:</label>
            <input class='tags-input' type="text" id="tags" placeholder="tags" required>
            <input type="submit" value="Create Post"> 
        </form> 

        <div class="all-Posts">
        
        </div>
        `;        
    }    
};

export default CreatePage;