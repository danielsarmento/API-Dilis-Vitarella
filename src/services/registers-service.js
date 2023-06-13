import axios from 'axios'
import { UpdateStatusError } from './errors/update-status-error.js'
import { SearchCellphoneError } from './errors/search-cellphone-error.js'
import { ZenviaMessageError } from './errors/zenvia-message-error.js'
import { SearchDatasError } from './errors/search-datas-error.js'
import { ExecuteSendError } from './errors/execute-send-error.js'
import { SendaManualError } from './errors/send-manual-error.js'

export class RegisterService {
    
    async executeSend (){
        try {
            const apiData = await this.searchDataDB()
            console.log("Número de Disparos: ", apiData.length)
            if(!apiData){
                return
            } else {
                for (const item of apiData){
                    await this.send(item.name, item.videoLink, item.cellphone)
                    await this.update(item.id)
                }
                return 
            }

          } catch (err) {
            throw new ExecuteSendError()
          }
    }

    async executeSendManual (data){
        try {
            for (const item of data){
                await this.send(item.name, item.videoLink, item.cellphone)
                await this.update(item.id)
            }
            return 

          } catch (err) {
            throw new SendaManualError()
          }
    }

    async searchDataDB () {
        try {
            const response = await axios.get(`http://145.14.134.34:3021/api/external/users`)
            if (!response){
                return []
            } else {
                return response?.data?.users
            }
            
          } catch (err) {
            throw new SearchDatasError()
          }
    }

    async send (name, videoLink, phone) {
        const link = videoLink.replace(" ", "")
        try {await axios.post('https://api.zenvia.com/v2/channels/whatsapp/messages', {
                from: `558398679409`,
                to: `55${phone}`,
                contents: [
                    {
                        type: 'template',
                        templateId: `989a319d-e069-44bd-8252-e7adfca41378`,
                        fields: {
                            name: `${name}`,
                            videoLink: `${link}`
                        }
                    }
                ]
            }, {
                headers: {
                    'X-API-TOKEN': `onmngqVKP0U9KNbsiE3yY-Z86A7b6U4w5CXy`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (err) {
            throw new ZenviaMessageError()
        }
    }

    async search (phone){
        try {
            const cellphone = phone.slice(2)
            const response = await axios.get(`http://145.14.134.34:3021/api/external/users/cellphone/${cellphone}`)
            return response.data.user
        } catch (err) {
            if(err.response.status === 404){
                throw new SearchCellphoneError()
            }
        }
    }

    async update (id){
        try {
            await axios.put(`http://145.14.134.34:3021/api/external/users/status/${id}`)
            return 
        } catch (err) {
            throw new UpdateStatusError()
        }
    }
}