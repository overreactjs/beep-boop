import { useElement, useDevice, useRender, Size, useProperty, Prop } from "@overreact/engine";

type ScreenProps = {
  children: React.ReactNode;
  size: Prop<Size>;
}

export const Screen: React.FC<ScreenProps> = ({ children, ...props }) => {
  const element = useElement();
  const device = useDevice();
  const size = useProperty(props.size);

  useRender(() => {
    if (size.invalidated) {
      element.setStyle('width', CSS.px(size.current[0]));
      element.setStyle('height', CSS.px(size.current[1]));

      size.invalidated = false;
    }

    if (device.size.invalidated || size.invalidated) {  
      const [width, height] = device.size.current;
      const widthScale = Math.floor(width / size.current[0]);
      const heightScale = Math.floor(height / size.current[1]);
      const scale = Math.min(widthScale, heightScale);

      element.setStyle('scale', scale);

      device.size.invalidated = false;
    }
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div ref={element.ref} className="bg-pink-500">
        {children}
      </div>
    </div>
  );
};
