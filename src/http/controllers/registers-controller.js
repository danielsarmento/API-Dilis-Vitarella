import { RegisterService } from "../../services/registers-service.js"
import { SearchCellphoneError } from '../../services/errors/search-cellphone-error.js'
import { SearchDatasError } from '../../services/errors/search-datas-error.js'


export async function register (req, res) {
    try{
        const registerService = new RegisterService()
        await registerService.executeSend()

        return res.status(200).json({message: "Message sent successfully!"})
        
    } catch (err) {
        console.log(err.message)
        if(err instanceof SearchDatasError){
            res.status(400).json({message: err.message})
        }
        res.status(500).end()
    }
}

export async function searchRegister (req, res) {
    const {phone} = req.params
    
    try{
        const registerService = new RegisterService()
        const response = await registerService.search(phone)

        return res.status(200).json({isRegister: true, response})
        
    } catch (err) {
        console.log(err.message)
        if(err instanceof SearchCellphoneError){
            return res.status(404).json({isRegister: false})
        }
        return res.status(500).json({isRegister: false})
    }
}