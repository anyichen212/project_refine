import { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
    title: string;
    labelName: string;
}

export interface FormValues {
    title: string;
    description: string;
}

export interface ListCardProps {
    id?: BaseKey | undefined;
    title: string;
    image: string;
}