class ViewModel {
  private count = 0;
  private document: Document;
  constructor(document: Document) {
    this.document = document;
    this.document.title = `You clicked ${this.count} times`;
  }

  onClick = (): void => {
    this.count += 1;
  };

  get countLabel(): string {
    const label = `You clicked ${this.count} times`;
    this.document.title = label;
    return label;
  }
}
export default ViewModel;
