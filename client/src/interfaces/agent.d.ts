import { BaseKey } from "@refinedev/core";

export interface AgentCardProp {
    id?: BaseKey | undefined;
    name: string;
    email: string;
    avatar: string;
    noOfLists: number;
}

export interface InfoBarProps {
    icon: ReactNode;
    name: string;
}