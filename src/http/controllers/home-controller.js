export function home(req, res) {
    console.log(req)
    res.status(200).json({message: 'API Dilis São João'})
}