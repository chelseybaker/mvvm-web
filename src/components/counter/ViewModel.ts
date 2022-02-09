import {action, computed, observable} from "mobx";

class ViewModel {
  @observable private count = 0;
  private document: Document;

  constructor(document: Document) {
    this.document = document;
    this.document.title = `You clicked ${this.count} times`;
  }

  @action onClick = (): void => {
    this.count += 1;
    this.document.title = `You clicked ${this.count} times`;
  };

  @computed get countLabel(): string {
    return `You clicked ${this.count} times`;
  }
}
export default ViewModel;
