class PostPage {
  constructor(page) {
    document.querySelector(".body").innerHTML = `
    <div class="header">
    <div class="tags">
       <div class="tag-container">
       </div>
    </div>
    </div>
    <div class="full-post">
        <div class="fullPost-img">
        </div>
        <div class="fullPost-title">
        </div>
        <div class="fullPost-content">
        </div>
        <div class="fullPost-tags">
        </div>
    </div> 
      `;
  }
}

export default PostPage;
