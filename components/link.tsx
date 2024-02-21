import { useTransition } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
// Define the types for props

type LinkProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
  target?: string;
  style?: React.CSSProperties; // Optional, consider removing if not using inline styles
};

// Helper function to detect modified click events
function isModifiedEvent(event: any) {
  const eventTarget = event.currentTarget;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

const Link: React.FC<LinkProps> = ({
  className,
  children,
  href,
  target,
  ...rest
}) => {
  const router = useRouter();
  const [isNavigating, trackNavigation] = useTransition();

  if (!target && !href.startsWith("/")) {
    target = "_blank"; // Automatically assign target="_blank" for external links
  }

  return (
    <NextLink
      {...rest}
      target={target}
      href={href}
      onClick={(e) => {
        if (!isModifiedEvent(e)) {
          e.preventDefault();
          trackNavigation(() => {
            router.push(e.currentTarget.href);
          });
        }
      }}
      className={`${className} scale-100 active:scale-95 transition-transform duration-200 ease-in-out ${
        isNavigating ? "opacity-85" : "opacity-100"
      }`}
    >
      {children}
    </NextLink>
  );
};

export default Link;
