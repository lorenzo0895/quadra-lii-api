const Flats = require("../modules/Flats");
const bcrypt = require("bcryptjs")

const getFlats = async () => {
  try {
    return await Flats.find({}, 'flat');
  } catch (error) {
    return { error: "Error al retornar los departamentos" };
  }
};

// const createFlat = async (flat, password) => {
//   if (flat == undefined || password == undefined) {
//     return { error: "Debe ingresar todos los parámetros" };
//   }
//   let hash = await bcrypt.hash(password, 12);
//   return await Flats.create({
//     flat: flat,
//     password: hash,
//   })
//     .then((flat) => flat)
//     .catch((error) => {
//       return { error: "Error al crear el departamento"};
//     });
// };

const changePassword = async (flat, oldPassword, password1, password2) => {
  if (
    flat == undefined ||
    flat == "" ||
    oldPassword == undefined ||
    oldPassword == "" ||
    password1 == undefined ||
    password1 == "" ||
    password2 == undefined ||
    password2 == ""
  ) {
    return { error: "Debe ingresar todos los parámetros" };
  }
  if (password1 != password2) {
    return { error: "Las contraseñas son distintas" };
  }

  return await Flats.findOne({ flat: flat })
  .then(async flatToModify => {
    if (! await bcrypt.compare(oldPassword, flatToModify.password)) {
      return { error: "La contraseña anterior no coincide" };
    }
    let hash = await bcrypt.hash(password1, 12);
    flatToModify.password = hash;
    return await flatToModify
      .save()
      .then((flat) => flat)
      .catch((error) => {
        error: "Error al guardar la contraseña";
      });
  })
  .catch(error => {
    return {error: "No pudo encontrarse el departamento"}
  });
};

module.exports = { getFlats, changePassword };
