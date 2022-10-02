import { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
} from "@mui/material";
import { AuthLayout } from "components/layouts";
import { useForm } from "react-hook-form";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { validations } from "utils";
import tesloApi from "../../api/tesloApi";
import { AuthContext } from "context";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const registerPage = () => {
  let router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const [showError, setShowError] = useState(false);
  const [showSucces, setShowSucces] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setShowSucces(false);
      setErrorMessage(message!); // message! es la alternativa de message || ''
      setTimeout(() => setShowError(false), 3000);
      console.log("Error en las credenciales", errorMessage);
      return;
    }
    reset();
    setShowSucces(true);
    setTimeout(() => setShowSucces(false), 3000);


    const destination = router.query.p?.toString() || '/'

    router.replace(destination);

    // try {
    //   const { data } = await tesloApi.post("/user/register", {
    //     name,
    //     email,
    //     password,
    //   });
    //   const { token, user } = data;
    //   console.log({ token, user });
    //   reset();
    //   setShowSucces(true);
    //   setTimeout(() => setShowSucces(false), 3000);
    // } catch (error) {
    //   setShowError(true);
    //   setShowSucces(false);
    //   setTimeout(() => setShowError(false), 3000);
    //   console.log("Error en las credenciales");
    // }
  };
  return (
    <AuthLayout title={"Registro"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Registrar Usuario
              </Typography>
              <Chip
                label="Error en las credenciales / correo"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: (val) => validations.isEmail(val),
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 5, message: "Mínimo 5 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Usuario registrado correctamente"
                color="success"
                icon={<CheckCircleOutline />}
                className="fadeIn"
                sx={{ display: showSucces ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Registrarte
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p${router.query.p}`
                    : `/auth/login`
                }
                passHref
              >
                <Link underline="always">¿Ya tienes una cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default registerPage;
