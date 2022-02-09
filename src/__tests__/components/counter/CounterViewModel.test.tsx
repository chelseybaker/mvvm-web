// import React from 'react';
// import ReactDOM from 'react-dom';
// import { act } from 'react-dom/test-utils';
// import Counter from './Counter';
//
// let container;
//
// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });
//
// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });
//
// it("can render and update a counter", () => {
//   // Test first render and effect
//   act(() => {
//     ReactDOM.render(<Counter />, container);
//   });
//   const button = container.querySelector("button");
//   const label = container.querySelector("p");
//   expect(label.textContent).toBe("You clicked 0 times");
//   expect(document.title).toBe("You clicked 0 times");
//
//   // Test second render and effect
//   act(() => {
//     button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
//   });
//   expect(label.textContent).toBe("You clicked 1 times");
//   expect(document.title).toBe("You clicked 1 times");
// });

import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";
import CounterView from "../../../components/counter/CounterView";
import ViewModel from "../../../components/counter/ViewModel";

let viewModel: ViewModel;
let mockDocument: Document;

beforeEach(() => {
  // @ts-expect-error We aren't mocking the entire document
  mockDocument = {title: ""};
  viewModel = new ViewModel(mockDocument);
});

it("has appropriate initial label", () => {
  expect(viewModel.countLabel).toEqual("You clicked 0 times");
});

it("has the starting title as the document", () => {
  expect(mockDocument.title).toEqual("You clicked 0 times");
});

describe("when clicked", () => {
  beforeEach(() => {
    viewModel.onClick();
  });

  it("updates the counter label", () => {
    expect(viewModel.countLabel).toEqual("You clicked 1 times");
  });

  it("updates the document title", () => {
    expect(mockDocument.title).toEqual("You clicked 1 times");
  });
});
