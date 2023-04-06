export interface CustomButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    color: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

export interface FormProps {
    type: string;
    register: any;
    onFinish: (
        values: FieldValues,
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    handleImageChange: (file) => void;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    image: { name: string; url: string };
}

/*
export interface ProfileProps {
    type: string;
    name: string;
    avatar: string;
    email: string;
    properties: Array | undefined;
}
*/
export interface ListProps {
    _id: string;
    title: string;
    description: string;
    photo: string;
    creator: string;
}