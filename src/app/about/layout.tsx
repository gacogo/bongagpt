import { PropsWithChildren, ReactNode } from "react";

interface IAboutLayoutProps{
    children: ReactNode
    foo?: string 
}

type IAboutLayoutProps2 = PropsWithChildren <{foo?: string}>

export default function AboutLayout({children}: IAboutLayoutProps2){

    return(
        <div>
            <div>
                About Layout
            </div>
            {children}
        </div>
    )
} 