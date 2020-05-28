import React from "react";
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import ClickToEdit from "../index";

test("snapshot - default", () => {
  const wrapper = shallow(<ClickToEdit value="foo" endEditing={jest.fn()} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

test("snapshot - onEdit", () => {
  const wrapper = shallow(<ClickToEdit value="bar" endEditing={jest.fn()} />);
  wrapper.simulate("click");
  expect(toJson(wrapper)).toMatchSnapshot();
});

test("render default value normally", () => {
  const wrapper = shallow(<ClickToEdit value="HELLO" endEditing={jest.fn()} />);
  expect(wrapper.text()).toBe("HELLO");
});

test("enter editing mode after clicking it", () => {
  const wrapper = shallow(<ClickToEdit value="HELLO" endEditing={jest.fn()} />);
  wrapper.simulate("click");
  expect(wrapper.find("input.CTE--input")).toHaveLength(1);
});

test("invoke endEditing function and leave editing mode after pressing the enter key", () => {
  const mock = jest.fn();
  const wrapper = mount(<ClickToEdit value="HELLO" endEditing={mock} />);
  wrapper.simulate("click");
  const inputWrapper = wrapper.find("input.CTE--input");
  inputWrapper.simulate("keypress", {
    keyCode: 13
  });
  expect(mock).toHaveBeenCalledTimes(1);
  expect(wrapper.find("input.CTE--input")).toHaveLength(0);
});

test("invoke endEditing function and leave editing mode after blurring the input", () => {
  const mock = jest.fn();
  const wrapper = mount(<ClickToEdit value="HELLO" endEditing={mock} />);
  wrapper.simulate("click");
  const inputWrapper = wrapper.find("input.CTE--input");
  inputWrapper.simulate("blur");
  expect(mock).toHaveBeenCalledTimes(1);
  expect(wrapper.find("input.CTE--input")).toHaveLength(0);
});

test("stay on editing mode if press all keys except Enter key", () => {
  const mock = jest.fn();
  const wrapper = mount(<ClickToEdit value="HELLO" endEditing={mock} />);
  wrapper.simulate("click");
  const inputWrapper = wrapper.find("input.CTE--input");
  inputWrapper.simulate("keypress", {
    keyCode: 1
  });
  expect(wrapper.find("input.CTE--input")).toHaveLength(1);
});

test("pass class props to customize component style", () => {
  const wrapper = shallow(
    <ClickToEdit
      wrapperClass="wrapperClass"
      inputClass="inputClass"
      textClass="textClass"
      value="HELLO"
      endEditing={jest.fn()}
    />
  );

  expect(wrapper.hasClass("wrapperClass")).toBeTruthy();
  expect(wrapper.find("span.textClass")).toHaveLength(1);

  wrapper.simulate("click");
  expect(wrapper.find("input.inputClass")).toHaveLength(1);
});
