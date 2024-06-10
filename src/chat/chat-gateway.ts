import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
@WebSocketGateway(5002, {})
export class ChatGateway {
    @SubscribeMessage('newMessage')
    handleNewMessage(client:Socket, message:any){
        console.log(message)

        client.emit('reply', 'this is the reply')
    }
}
 