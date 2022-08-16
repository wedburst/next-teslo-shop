import { db } from "database";
import { User } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { jwt, validations } from "utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };


  if (password.length < 4) {
    return res.status(400).json({
      message: "La contraseña debe de ser de 6 caracteres",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: "El nombre debe de ser mayor a 2 caracteres",
    });
  }

  // Todo validar Email
  if ( !validations.isValidEmail( email )){
    return res.status(400).json({
      message: "El formato del correo no es valido",
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if(user){
    return res.status(400).json({
        message: 'No puede usar ese correo'
    })
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    rol: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
}
