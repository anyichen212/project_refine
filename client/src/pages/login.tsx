import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";
import { CredentialResponse } from "../interfaces/google";
import { Container, Box } from "@mui/material";

import { name } from '../assets';

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID =
  "851960726797-99slrr0gg4tep4t21jci9leraprk1ipi.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>({
    //v3LegacyAuthProviderCompatible: true,
});

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          //enter your own client id
          client_id:  GOOGLE_CLIENT_ID, //process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        //google sign in button
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_black",
          size: "medium",
          type: "standard",
          shape: "pill",
          text: "signin_with",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box
    //whole screen
      component="div"
      sx={{
        backgroundColor: '#FCFCFC'
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
        //logo box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img style= {{width: "50vw"}} src= {name} alt="Logo" />
          </div>
          <Box mt={4}>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );

  /*return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleButton />
    </div>
  );*/
};
