import { PropsWithChildren, ReactNode } from "react";

type IAboutLayoutProps = PropsWithChildren;

export default function AboutLayout({ children }: IAboutLayoutProps) {
  return (
    <div>
      <div>About Layout</div>
      {children}
    </div>
  );
}
