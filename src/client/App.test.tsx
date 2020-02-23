import React from "react";
import {mount} from "enzyme";
import {App} from "./App";
import "jest-extended";
import "jest-enzyme";

test("renders Home link", () => {
    // Arrange

    // Act
    const wrapper = mount(<App />);

    // Assert
    expect(wrapper).toIncludeText("Home");
});

test("renders About link", () => {
    // Arrange

    // Act
    const wrapper = mount(<App />);

    // Assert
    expect(wrapper).toIncludeText("About");
});

test("renders Contact link", () => {
    // Arrange

    // Act
    const wrapper = mount(<App />);

    // Assert
    expect(wrapper).toIncludeText("Contact");
});
