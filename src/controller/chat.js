const Chat = require("../model/Chat");

exports.sendChat = (req, res) => {
    if(req.params.id !== req.user._id){
        const { chat } = req.body;

        const _chat = new Chat({
            chat,
            sender: req.user._id,
            receiver: req.params.id
        })

        _chat.save((error, chat) => {
            if(error){
                res.status(400).json({error});
            }

            if(chat){
                res.status(200).json({chat});
            }
        })
    }
    else{
        res.status(400).json({message: "you can't message yourself"})
    }

};

exports.fetchChat = async (req, res) => {
    if(req.params.id !== req.user._id){
    const incoming = await Chat.findOne({ sender: req.params.id, receiver: req.user._id });
    const outgoing = await Chat.findOne({ sender: req.user._id, receiver: req.params.id });

    if(incoming){
        res.status(200).json({incoming, outgoing})
    }
}
else{
    res.status(400).json({ message: "you can't message to yourself" })
}
};

exports.deleteChat = async (req, res) => {
    const chatId = req.params.id;

    const isChat = await Chat.findById(chatId);
    if(req.user._id == isChat.sender){
        const delChat = await Chat.findByIdAndRemove(chatId);
        if(delChat){
            res.status(200).json({message: "deleted successfully"})
        }
    }
    else{
        res.status(400).json({message: "you can't delete this message"})
    }
};