// wait dom is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    let page = new PageState();
    //page.MainPage();
    page.CreateEditPage();
    page.MainPage();

});

class PageState {
    constructor() {
      this.state = new MainState();
    }

    CreateEditPage(){
        this.state.CreateEditPage(this);
    }
  
  
    MainPage() {
      this.state.MainPage(this);
    }
  }
  
  class State {
    constructor() {
      if (this.constructor === State) throw new Error("abstract!");
    }
  
    CreateEditPage(sw){
        console.log("Create and edit");
    }
  
    MainPage(sw) {
      console.log("Main page loaded");
    }
  }

  class CreateEditPage extends State {
    constructor() {
      super();

      this.CreateEditPage();
    }

    CreateEditPage(sw){
        document.querySelector('.test').innerText = "On create/edit page!";
    }
  
    MainPage(sw) {
      console.log("Turning light off...");
      sw.state = new MainState();
    }
  }
  
  class MainState extends State {
    constructor() {
      super();
      
      this.MainPage();
    }
    
    MainPage(sw) {
        document.querySelector('.test').innerText = "Main page!";
    }
    
  
    CreateEditPage(sw) {
      console.log("Turning light on...");
      sw.state = new CreateEditPage();
    }
  }
