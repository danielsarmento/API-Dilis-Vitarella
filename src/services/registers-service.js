import axios from 'axios'
import {env} from '../env/index.js'

export class RegisterService {
    async executeSend (){
        try {
            const apiData = await this.searchDataDB()
            
            for (const item of apiData){
                await this.send(item.name, item.videoLink, item.cellphone)
            }
            return 

          } catch (err) {
            throw new Error('Error executing trigger content!')
          }
    }

    async executeSendManual (data){
        try {
            for (const item of data){
                await this.send(item.name, item.videoLink, item.cellphone)
            }
            return 

          } catch (err) {
            throw new Error('Error executing manual trigger content!')
          }
    }

    async searchDataDB () {
        try {
            const response = await axios.get('http://145.14.134.34:3021/api/external/users')
            
            return response.data.users
            
          } catch (err) {
            throw new Error('Error fetching data!')
          }
    }

    async send (username, videoLink, phone) {
        try {
            const response = await axios.post('https://api.zenvia.com/v2/channels/whatsapp/messages', {
                from: `${env.CELL_PHONE_NUMBER}`,
                to: `55${phone}`,
                contents: [
                    {
                        type: 'template',
                        templateId: `${env.TEMPLATE_ID}`,
                        fields: {
                            username: `${username}`,
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
            throw new Error('Error sending message!')
        }
    }
}