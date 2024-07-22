import { useElement, useDevice, useRender, Size, useProperty, Prop, useSync } from "@overreact/engine";
import crtUrl from "./crt.png";
import { useSettings } from "../../hooks";

type ScreenProps = {
  children: React.ReactNode;
  size: Prop<Size>;
  scale: number | 'auto';
}

export const Screen: React.FC<ScreenProps> = ({ children, scale, ...props }) => {
  const settings = useSettings();
  const element = useElement();
  const device = useDevice();
  const size = useProperty(props.size);

  const crtFilter = useSync(() => settings.crtFilter.current);

  useRender(() => {
    if (size.invalidated) {
      element.setStyle('width', `${size.current[0]}px`);
      element.setStyle('height', `${size.current[1]}px`);

      size.invalidated = false;
    }

    if (device.size.invalidated || size.invalidated) {
      if (scale === 'auto') {
        const [width, height] = device.size.current;
        const widthScale = Math.floor(width / size.current[0]);
        const heightScale = Math.floor(height / size.current[1]);
        const autoScale = Math.min(widthScale, heightScale);

        element.setLegacyStyle('scale', autoScale);
      } else {
        element.setLegacyStyle('scale', scale);
      }

      device.size.invalidated = false;
    }
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div ref={element.ref} style={crtFilter ? { filter: 'blur(0.33px) brightness(1.6) contrast(1.5)' } : {}}>
        {children}
        {crtFilter && (
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url(${crtUrl})`, backgroundSize: '1px', imageRendering: 'pixelated' }} />
        )}
      </div>
    </div>
  );
};
