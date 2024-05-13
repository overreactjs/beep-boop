import { Engine, Node, useUpdate } from "@overreact/engine";

export const App = () => {
  return (
    <Engine>
      <Foo />
    </Engine>
  );
};

const Foo = () => {
  useUpdate(() => {
    console.log('Foo.useUpdate');
  }, { id: 'Foo' });

  return (
    <Node name="Foo">
      <Bar />
    </Node>
  );
};

const Bar = () => {
  useUpdate(() => {
    console.log('Bar.useUpdate');
  }, { id: 'Bar' });

  return (
    <Node name="Bar">
      <Qux />
    </Node>
  )
};

const Qux = () => {
  useUpdate(() => {
    console.log('Qux.useUpdate');
  }, { id: 'Qux' });

  return (
    <Node name="Qux">
      <div>Testing!</div>
    </Node>
  )
};