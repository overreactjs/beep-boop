import React from "react";
import { Property, VariableProperty } from "@overreact/engine";

type MenuContextProps = {
  index: Property<number>;
  selected: Property<number | null>;
}

export const MenuContext = React.createContext<MenuContextProps>({
  index: new VariableProperty(0),
  selected: new VariableProperty(null),
});
