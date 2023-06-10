import axios from 'axios'
import {env} from '../env/index.js'

import { UpdateStatusError } from './errors/update-status-error.js'
import { SearchCellphoneError } from './errors/search-cellphone-error.js'
import { ZenviaMessageError } from './errors/zenvia-message-error.js'
import { SearchDatasError } from './errors/search-datas-error.js'
import { ExecuteSendError } from './errors/execute-send-error.js'
import { SendaManualError } from './errors/send-manual-error.js'

import { createData } from '../repositories/users-repositories.js'

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
                    await createData(item.name, item.videoLink, item.cellphone)
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
                await createData(item.name, item.videoLink, item.cellphone)
                await this.update(item.id)
            }
            return 

          } catch (err) {
            throw new SendaManualError()
          }
    }

    async searchDataDB () {
        try {
            const response = await axios.get(`${env.URL_DILIS}`)
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
        try {await axios.post('https://api.zenvia.com/v2/channels/whatsapp/messages', {
                from: `${env.CELL_PHONE_NUMBER}`,
                to: `55${phone}`,
                contents: [
                    {
                        type: 'template',
                        templateId: `${env.TEMPLATE_ID}`,
                        fields: {
                            username: `${name}`,
                            video: `${videoLink}`
                        }
                    }
                ]
            }, {
                headers: {
                    'X-API-TOKEN': `${env.TOKEN_ZENVIA}`,
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
            const response = await axios.get(`${env.URL_DILIS}/cellphone/${cellphone}`)
            return response.data.user
        } catch (err) {
            if(err.response.status === 404){
                throw new SearchCellphoneError()
            }
        }
    }

    async update (id){
        try {
            await axios.put(`${env.URL_DILIS}/status/${id}`)
            return 
        } catch (err) {
            throw new UpdateStatusError()
        }
    }
}