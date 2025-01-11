const getIndexPage = async(req, res) =>{
    res.status(200).json({"message":"Welcome to library management api"});
}

module.exports = {
    getIndexPage
};