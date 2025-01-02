const mongoose = require('mongoose');
const Joi = require('joi'); // Asegúrate de instalar Joi con npm install joi

// Definición del esquema de Mongoose
const messageSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese su nombre'],
    min: [2, 'El nombre debe tener al menos dos caracteres'],
    max: 50,
  },
  email: {
    type: String,
    required: [true, 'Por favor ingrese su correo electrónico'],
  },
  message: {
    type: String,
    required: [true, 'Por favor ingrese un mensaje'],
    max: 500,
  },
}, { timestamps: true });

// Crear el modelo de mensajes
const Message = mongoose.model('Messages', messageSchema);

// Validación con Joi para el formulario
const sendFormSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(5).max(500).required(),
});

// Controlador para enviar formulario
module.exports.sendForm = async (req, res, next) => {
  try {
    // Validar los datos recibidos
    const { error, value } = sendFormSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // Mensaje de error de Joi
    }

    // Crear y guardar un nuevo mensaje en la base de datos
    const newMessage = new Message(value);
    await newMessage.save();

    res.status(200).json({ message: 'Formulario enviado correctamente', data: newMessage });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Error de validación de Mongoose
      const errorMessages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errorMessages.join(", ") });
    }
    next(err); // Otros errores
  }
};

// Controlador para obtener todos los mensajes
module.exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteMessage = async (req, res) => {
  try {
      const message = await Message.findOneAndDelete({ id: req.params._id });
      if (!message) {
          return res.status(404).json({ message: "Message not found." });
      }
      res.status(204).json({ message: "Message successfully deleted." });
  } catch (error) {
      console.error('Error deleting message:', error);
      res.status(400).json({ message: error.message });
  }
};

// Exportar el modelo Message
module.exports.Message = Message;
