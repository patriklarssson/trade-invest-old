const isElement = (element: ChildNode | Element): element is Element => {
  return element instanceof Element;
};

export { isElement };
