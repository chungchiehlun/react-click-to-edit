import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ClickToEdit from "../index";

test("snapshot - default", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="foo" />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

test("snapshot - onEdit", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="bar" />
  );
  wrapper.simulate("click");
  expect(toJson(wrapper)).toMatchSnapshot();
});

test("render initial value", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="HELLO" />
  );
  expect(wrapper.text()).toBe("HELLO");
});

test("enter editing mode when clicking CTE", () => {
  const mock = jest.fn();
  const wrapper = shallow(
    <ClickToEdit initialValue="HELLO" startEditing={mock} />
  );
  wrapper.find("span").simulate("click");
  expect(wrapper.find("input")).toHaveLength(1);
  expect(mock).toHaveBeenCalledTimes(1);
});

test("enter editing mode and change value", () => {
  const wrapper = shallow(
    <ClickToEdit initialValue="HELLO" />
  );
  wrapper.find("span").simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "WORLD" } });
  expect(wrapper.find("input").prop("value")).toBe("WORLD");
});

test("leave editing mode when pressing the enter key", () => {
  const mock = jest.fn();
  const wrapper = shallow(<ClickToEdit initialValue="HELLO" endEditing={mock} />);
  wrapper.find("span").simulate("click");
  const inputWrapper = wrapper.find("input").at(0);
  inputWrapper.simulate("keypress", {
    keyCode: 13
  });
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith("HELLO");
  expect(wrapper.find("input")).toHaveLength(0);
});

test("leave editing mode when blurring the input", () => {
  const mock = jest.fn();
  const wrapper = shallow(<ClickToEdit initialValue="HELLO" endEditing={mock} />);
  wrapper.find("span").simulate("click");
  const inputWrapper = wrapper.find("input");
  inputWrapper.simulate("blur");
  expect(mock).toHaveBeenCalledTimes(1);
  expect(wrapper.find("input")).toHaveLength(0);
});

test("stay on editing mode if press all keys except Enter key", () => {
  const mock = jest.fn();
  const wrapper = shallow(<ClickToEdit initialValue="HELLO" endEditing={mock} />);
  wrapper.find("span").simulate("click");
  const inputWrapper = wrapper.find("input");
  inputWrapper.simulate("keypress", {
    keyCode: 1
  });
  expect(wrapper.find("input")).toHaveLength(1);
});

test("customize css class of elements", () => {
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

  wrapper.find("span").simulate("click");
  expect(wrapper.find("input.inputClass")).toHaveLength(1);
});
