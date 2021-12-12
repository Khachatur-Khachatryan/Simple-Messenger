import {users, chats, userChats, messages, chatTemplate, activeChatTemplate} from './consts.js';

localStorage.setItem("activeChatId", 2);
localStorage.setItem("userId", 1);

function showChats(userId) {
	let arr = [];
	chats.forEach(chat => arr[chat.id] = chat);
	
	userChats.forEach(function(userChat) {
	    userChat.chat = arr[userChat.chatId];
	});
	
	let user_chats = userChats.filter(x => x.userId == userId);

	for(var userChat of user_chats) {

		if(localStorage.getItem("activeChatId") == userChat.chatId) {
			var chatList = document.getElementById("chats");
			chatList.innerHTML += activeChatTemplate;

			continue;
		}

		var chatList = document.getElementById("chats");
		chatList.innerHTML += chatTemplate;
	}
}

window.onload = function() {
	showChats(localStorage.getItem("userId"));
};