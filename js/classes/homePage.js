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
      <div class="last-five-posts"></div>
    </div>
    <hr><br>
    <div class="container">
      <div class="remaining-posts"></div>
    </div>
  </div>
  </div>  
    `;
  }
}

export default HomeState;
