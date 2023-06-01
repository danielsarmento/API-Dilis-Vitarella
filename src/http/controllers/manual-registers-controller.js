import { RegisterService } from "../../services/registers-service.js";

export async function registerManual (req, res) {
    const { data } = req.body

    if(!data) {
        res.status(400).json({message: "Data is missing!"})
    }
    try{
        const registerService = new RegisterService()

        await registerService.executeSendManual(data)
        
        return res.status(200).json({message: "Messages sent successfully!"})
        
    } catch (err) {
        console.log(err.message)
        return res.status(500).end()
    }
}