import { RegisterService } from "../../services/registers-service.js";

export async function register (req, res) {
    try{
        const registerService = new RegisterService()
        await registerService.executeSend()

        return res.status(200).json({message: "Message sent successfully!"})
        
    } catch (err) {
        console.log(err)
        res.status(500).end()
    }
}

export async function searchRegister (req, res) {
    const {phone} = req.params
    console.log(phone)
    try{
        const registerService = new RegisterService()
        const response = await registerService.search(phone)

        return res.status(200).json({isRegister: true, response})
        
    } catch (err) {
        console.log(err)
        res.status(404).json({isRegister: false})
    }
}