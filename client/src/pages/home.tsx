//import React from "react";
import { useGetIdentity, useOne, useActiveAuthProvider } from "@refinedev/core";

import { Profile, PieChart } from "components";

const Home = () => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userid,
    });

    const myProfile = data?.data ?? [];

    //console.log(data);

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type=""
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            lists={myProfile.allList}
        />
    );

        //return (
        //<div>homeupdate</div>
        //)
};

//const Home = () => {

//}

export default Home;