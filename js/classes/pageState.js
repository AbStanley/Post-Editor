import HomeState from "./homePage.js";
import CreatePage from "./createPage.js";

class PageState {
  constructor() {
    this.currentState = new HomeState(this);
  }

  initState() {
    this.change(new HomeState());
  }

  change(state) {
    this.currentState = state;
  }
}

export { PageState };
