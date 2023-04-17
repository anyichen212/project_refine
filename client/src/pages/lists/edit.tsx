import { useState } from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router-dom";

import { FieldValues } from "react-hook-form";

import Form from "components/common/Form";


const ListEdit = () => {
  const navigate = useNavigate();
  const authProvider = useActiveAuthProvider();
  const {data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const[image, setImage] = useState({ name: '' , url: ''});
  const { refineCore: {onFinish, formLoading}, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
        new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(readFile);
        });

        reader(file).then((result: string) => setImage({ name: file?.name, url: result }),
    );
};

  const onFinishHandler =  async (data: FieldValues) => {
    if (!image.name){
      image.name = "defaultImage";
      image.url = "http://res.cloudinary.com/dckljm0kd/image/upload/v1678206226/samples/cloudinary-icon.png"
    }

    await onFinish({
        ...data,
        image: image.url,
        email: user.email,
    });
};

  return(
    <Form
      type = "Create"
      register = {register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      image={image}
    />
  )
}

export default ListEdit;
