const Books = require("../modules/Books");
const Flats = require("../modules/Flats");
const limitDays = 45;

const getAllBooks = async () => {
  return await Books.find();
};

const getBooksBetween = () => {};

const createBook = async (flat, password, day, hour) => {
  if (
    flat == undefined ||
    flat == "" ||
    password == undefined ||
    password == "" ||
    day == undefined ||
    day == "" ||
    hour == ""
  ) {
    return { error: "Debe ingresar todos los parámetros" };
  }
  if (hour != "day" && hour != "night") {
    return { error: "Horario no compatible" };
  }
  let limit = new Date();
  limit = limit.setDate(limit.getDate() + limitDays);
  const date = new Date(day).getTime();
  if (date > limit) {
    return {
      error: "La reserva no puede realizarse para dentro de más de 45 días",
    };
  }
  const flat1 = await Flats.findOne({ flat: flat });
  if (flat1 == undefined) {
    return { error: "No se encontró el departamento" };
  }
  if (flat1.password != password) {
    return { error: "Contraseña incorrecta para el departamento" };
  }
  const book1 = await Books.findOne({ day: day, hour: hour });
  if (book1 != undefined) {
    return { error: "Ya existe un turno para el horario" };
  }

  return await Books.create({
    day: new Date(day),
    hour: hour,
    flat: flat1.id,
  })
    .then((book) => book)
    .catch((error) => {
      return { error: "Ocurrió un error al crear la reserva" };
    });
};

const deleteBook = async (day, hour, password) => {
  if (
    day == undefined ||
    day == "" ||
    hour == undefined ||
    hour == "" ||
    password == undefined ||
    password == ""
  ) {
    return { error: "Debe ingresar todos los parámetros" };
  }
  const book = await Books.findOne({ day: day, hour: hour });
  if (book == undefined) {
    return { error: "No se ha encontrado la reserva" };
  }
  const flat = await Flats.findById(book.flat);
  if (flat.password != password) {
    return {
      error: "La contraseña no corresponde al departamento que reservó.",
    };
  }

  return await Books.deleteOne({_id: book._id})
  .then(() => {
    return { success: "Reserva eliminada con éxito"}
  })
  .catch(() => {
    return { error: "Ocurrió un error al intentar eliminar la reserva" }
  })
};

module.exports = { getAllBooks, getBooksBetween, createBook, deleteBook };
