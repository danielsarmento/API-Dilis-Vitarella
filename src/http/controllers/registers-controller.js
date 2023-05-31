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