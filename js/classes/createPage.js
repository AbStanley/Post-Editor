
class CreatePage  {
    constructor(page) {
        document.querySelector(".body").innerHTML = `
        <form class="post-form">
            <label>Image:</label>
            <input type="file" id="img" name="img" accept="image/*">
            <label>Title:</label>
            <input type="text" id="title" placeholder="Title">
            <label>Body content:</label>
            <textarea id="content" placeholder="Content"></textarea>
            <label>Tags:</label>
            <input type="text" id="tags" placeholder="tags">
            <input type="submit" value="Create Post"> 
        </form> 

        <div class="all-Posts">
        
        </div>
        `;        
    }    
};

export default CreatePage;