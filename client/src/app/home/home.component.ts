import { Component, OnInit } from '@angular/core'

import { UserService } from '../service/user.service'
import { ChatService } from '../service/chat.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	currentUser : string

	showChatWindow : Boolean = false

	constructor(private userService: UserService,private chatService: ChatService){
		console.log('constructor called')
		// this.userService.getUsername()
		// .subscribe((res : any)=>{
		// 	this.currentUser = res.username
		// 	this.chatService.initiateSocket(this.currentUser)
		// })
	}

	ngOnInit() {
		this.userService.getUsername()
		.subscribe((res : any)=>{
			this.currentUser = res.username
			this.chatService.initiateSocket(this.currentUser)
		})

		this.chatService.activeChatWindow.subscribe(status =>{
			this.showChatWindow = status
		})
	}
}
