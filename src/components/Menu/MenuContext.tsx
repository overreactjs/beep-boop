import React from "react";
import { Property, VariableProperty } from "@overreact/engine";
import { MenuItem } from "./types";

type MenuContextProps = {
  index: Property<number>;
  selected: Property<number | null>;
  register: (index: number, item: MenuItem) => void;
}

export const MenuContext = React.createContext<MenuContextProps>({
  index: new VariableProperty(0),
  selected: new VariableProperty(null),
  register: () => {},
});
