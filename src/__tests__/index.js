import React from "react";
import { act } from "react-dom/test-utils";
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import ClickToEdit from "../index";

test("snapshot - default", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="foo" endEditing={jest.fn()} />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

test("snapshot - onEdit", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="bar" endEditing={jest.fn()} />
  );
  wrapper.simulate("click");
  expect(toJson(wrapper)).toMatchSnapshot();
});

test("render initial value", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="HELLO" endEditing={jest.fn()} />
  );
  expect(wrapper.text()).toBe("HELLO");
});

test("enter editing mode when clicking CTE", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="HELLO" endEditing={jest.fn()} />
  );
  wrapper.simulate("click");
  expect(wrapper.find("input")).toHaveLength(1);
});

test("enter editing mode and change value", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="HELLO" endEditing={jest.fn()} />
  );
  wrapper.simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "WORLD" } });
  expect(wrapper.find("input").prop("value")).toBe("WORLD");
});

test("invoke endEditing function and leave editing mode after pressing the enter key", () => {
  const mock = jest.fn();
  const wrapper = mount(<ClickToEdit initialValue="HELLO" endEditing={mock} />);
  wrapper.simulate("click");
  const inputWrapper = wrapper.find("input");
  inputWrapper.simulate("keypress", {
    keyCode: 13
  });
  expect(mock).toHaveBeenCalledTimes(1);
  expect(wrapper.find("input")).toHaveLength(0);
});

test("invoke endEditing function and leave editing mode after blurring the input", () => {
  const mock = jest.fn();
  const wrapper = mount(<ClickToEdit initialValue="HELLO" endEditing={mock} />);
  wrapper.simulate("click");
  const inputWrapper = wrapper.find("input");
  inputWrapper.simulate("blur");
  expect(mock).toHaveBeenCalledTimes(1);
  expect(wrapper.find("input")).toHaveLength(0);
});

test("stay on editing mode if press all keys except Enter key", () => {
  const mock = jest.fn();
  const wrapper = mount(<ClickToEdit initialValue="HELLO" endEditing={mock} />);
  wrapper.simulate("click");
  const inputWrapper = wrapper.find("input");
  inputWrapper.simulate("keypress", {
    keyCode: 1
  });
  expect(wrapper.find("input")).toHaveLength(1);
});

test("pass class props to customize component style", () => {
  const wrapper = shallow(
    <ClickToEdit
      wrapperClass="wrapperClass"
      inputClass="inputClass"
      textClass="textClass"
      initialValue="HELLO"
      endEditing={jest.fn()}
    />
  );

  expect(wrapper.hasClass("wrapperClass")).toBeTruthy();
  expect(wrapper.find("span.textClass")).toHaveLength(1);

  wrapper.simulate("click");
  expect(wrapper.find("input.inputClass")).toHaveLength(1);
});
