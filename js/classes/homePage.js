class HomeState {
  constructor(page) {
    document.querySelector(".body").innerHTML = `
    <div class="header">
    <div class="search">
   
      <input type="search" class="searchField" />
    </div>
  </div>
  <div class="tags">
    <div class="tag-container">
    </div>
  </div>
  <div class="every-post">
  <div class="content">
    <div class="feature">
    <h5>Latest posts: </h5>
      <div class="last-five-posts"></div>
    </div>
    <div.divider></div><hr><br>
    <h5>Recent posts: </h5>
    <div class="container">
      <div class="remaining-posts"></div>
    </div>
  </div.divider>
  </div>  
    `;
  }
}

export default HomeState;
