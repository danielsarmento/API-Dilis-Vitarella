import { RegisterService } from "../../services/registers-service.js";

export async function registerManual (req, res) {
    const { data } = req.body

    if(!data) {
        res.status(400).json({message: "Cellphone is missing!"})
    }
    try{
        const registerService = new RegisterService()

        const send = await registerService.executeSendManual(data)
        
        return res.status(200).json({message: "Messages sent successfully!"})
        
    } catch (err) {
        console.log(err)
        res.status(500).end()
    }
}