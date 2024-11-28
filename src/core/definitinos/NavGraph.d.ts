import {ReactNode} from "react";

export interface NavigationElement {
    description : string,
    icon : ReactNode,
    href : string
}

export interface NavigationGroup {
    title : string,
    elements : Array<NavigationElement>
}

export interface NavigationGraph {
    groups : Array<NavigationGroup>
}