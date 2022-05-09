const Books = require("../modules/Books");
const Flats = require("../modules/Flats");
const limitDays = 45;
const bcrypt = require("bcryptjs")

const getAllBooks = async () => {
  return await Books.find().populate('flat', 'flat');
};

const getBooksFromDay = async (id) => {
  const date = new Date(id);
  return await Books.find({day: date}).populate('flat', 'flat');
}

const getBookFromId = async (id) => {
  return await Books.find({_id: id}).populate('flat', 'flat');
}

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
  let today = new Date();
  today.setHours(-3,0,0,0);
  const date = new Date(day);
  let limit = new Date(today);
  if (limit.getTime() > date.getTime()) {
    return {
      error: "La reserva no puede realizarse para un día que ya pasó",
    }
  }
  limit = limit.setDate(limit.getDate() + limitDays);
  if (date > limit) {
    return {
      error: "La reserva no puede realizarse para dentro de más de 45 días",
    };
  }
  const flat1 = await Flats.findOne({ flat: flat });
  if (flat1 == undefined) {
    return { error: "No se encontró el departamento" };
  }
  if (! await bcrypt.compare(password, flat1.password)) {
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
    .then((book) => book.populate('flat', 'flat'))
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
  if (! await bcrypt.compare(password, flat.password)) {
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

module.exports = { getAllBooks, getBooksBetween, createBook, deleteBook, getBooksFromDay, getBookFromId };
