const Chat = require('../Models/Chat');

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('user');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter os chats' });
    console.log(err);
  }
};

exports.createChat = async (req, res) => {
  const { user, message } = req.body;

  try {
    const chat = await Chat.create({ user, message });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar um novo chat' });
    console.log(err);
  }
};
