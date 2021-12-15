localStorage.setItem("activeChatId", 1);
localStorage.setItem("userId", 1);

let users = [
	{
		id: 1,
		displayName: "Petro Kolosov"
	},
	{
		id: 2,
		displayName: "Szymon Murawski"
	},
	{
		id: 3,
		displayName: "Illia Zubachov"
	},
	{
		id: 4,
		displayName: "Bob Smith"
	},
];

let chats = [
	{
		id: 1,
		title: users[1].displayName,
		lastMessage: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima corrupti dignissimos dolores ipsa" +
			" nihil temporibus voluptates."
	},
	{
		id: 2,
		title: users[2].displayName,
		lastMessage: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima corrupti dignissimos dolores."
	},
	{
		id: 3,
		title: users[3].displayName,
		lastMessage: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima."
	}
];

let userChats = [
	{
		id: 1,
		userId: 1,
		chatId: 1
	},
	{
		id: 2,
		userId: 2,
		chatId: 1
	},
	{
		id: 3,
		userId: 1,
		chatId: 2
	},
	{
		id: 4,
		userId: 3,
		chatId: 2
	},
	{
		id: 5,
		userId: 1,
		chatId: 3
	},
	{
		id: 6,
		userId: 4,
		chatId: 3
	}
];

let messages = [
	{ id: 1, userId: 1, chatId: 1, text: "Lorem ipsum." },
	{ id: 2, userId: 2, chatId: 1, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, reiciendis." },
	{ id: 3, userId: 1, chatId: 1, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate." },
	{ id: 4, userId: 1, chatId: 1, text: chats[0].lastMessage },

	{ id: 5, userId: 1, chatId: 2, text: "Lorem ipsum." },
	{ id: 6, userId: 3, chatId: 2, text: "Lorem ipsum dolor sit amet, consectetur adipisicing." },
	{ id: 7, userId: 3, chatId: 2, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit." },
	{ id: 8, userId: 1, chatId: 2, text: chats[1].lastMessage},

	{ id: 9, userId: 1, chatId: 3, text: "Lorem ipsum." },
	{ id: 10, userId: 1, chatId: 3, text: "Lorem ipsum dolor sit amet, consectetur." },
	{ id: 11, userId: 4, chatId: 3, text: "Lorem ipsum dolor sit amet." },
	{ id: 12, userId: 4, chatId: 3, text: chats[2].lastMessage},
];

let chatList = document.getElementById("chats");
let messageList = document.getElementById("messages");
let messageInput = document.getElementById("messageInput");
messageInput.addEventListener("keyup", function(e) {
	if(e.keyCode == 13) {
		sendMessage(messageInput.value);
		messageInput.value = '';
	}
});

function showChats(userId) {
	let arr = [];
	chats.forEach(chat => arr[chat.id] = chat);
	
	userChats.forEach(function(userChat) {
	    userChat.chat = arr[userChat.chatId];
	});
	
	let user_chats = userChats.filter(x => x.userId == userId).sort((x, y) => (x.chatId > y.chatId) ? 1 : -1);

	let chatTemplate = '';

	for(let i = 0; i < user_chats.length; i++) {

		if(localStorage.getItem("activeChatId") == user_chats[i].chatId) {
			chatTemplate = '<li class="active" onclick="changeChat('+ ( i + 1 )+')">' +
									'<div class="image">' +
										'<img src="image/avatar2.png" width="53">' +
									'</div>' +
									'<div class="info">' +
										'<label class="title">' + user_chats[i].chat.title + '</label>' +
										'<p class="last-message">' + user_chats[i].chat.lastMessage + '</p>' +
									'</div>' +
								'</li>';

			chatList.innerHTML += chatTemplate;

			continue;
		}

		chatTemplate = '<li onclick="changeChat(' + (i + 1) +')">' +
								'<div class="image">' +
									'<img src="image/avatar2.png" width="53">' +
								'</div>' +
								'<div class="info">' +
									'<label class="title">' + user_chats[i].chat.title + '</label>' +
									'<p class="last-message">' + user_chats[i].chat.lastMessage + '</p>' +
								'</div>' +
							'</li>';

		chatList.innerHTML += chatTemplate;
	}
}

function showChatMessages(chatId) {
	let chatMessages = messages.filter(x => x.chatId == chatId);

	let messageTemplate = '';

	for(let message of chatMessages) {

		if(localStorage.getItem("userId") == message.userId) {
			messageTemplate = '<li class="self">' +
										'<div class="message-wrapper">' +
											'<div class="image">' +
												'<img src="image/avatar1.png" width="50">' +
											'</div>' +
											'<div class="message-conatiner">' +
												'<div class="message">' + message.text + '</div>' +
											'</div>'+ 
										'</div>' +
									'</li>';

			messageList.innerHTML += messageTemplate;
		}

		messageTemplate = '<li class="other">' +
									'<div class="message-wrapper">' +
										'<div class="image">' +
											'<img src="image/avatar2.png" width="50">' +
										'</div>' +
										'<div class="message-conatiner">' +
											'<div class="message">' +
												message.text +
											'</div>' +
										'</div>'+ 
									'</div>' +
								'</li>';

		messageList.innerHTML += messageTemplate;
	}
}

function changeChat(chatId) {

	if(localStorage.getItem("activeChatId") == chatId) {
		return;
	}
	
	localStorage.setItem("activeChatId", chatId);

	chatList.innerHTML = '';
	messageList.innerHTML = '';
	
	showChatMessages(localStorage.getItem("activeChatId"));
	showChats(localStorage.getItem("userId"));
}

function sendMessage(text) {
	let userId = parseInt(localStorage.getItem("userId"));
	let activeChatId = parseInt(localStorage.getItem("activeChatId"));

	let newMessage = {
		id: messages.indexOf(messages.length - 1),
		userId: userId,
		chatId: activeChatId,
		text: text
	};

	chats[activeChatId].lastMessage = text;

	messages.push(newMessage);
	messageList.innerHTML += '<li class="self">' +
										'<div class="message-wrapper">' +
											'<div class="image">' +
												'<img src="image/avatar1.png" width="50">' +
											'</div>' +
											'<div class="message-conatiner">' +
												'<div class="message">' + newMessage.text + '</div>' +
											'</div>'+ 
										'</div>' +
									'</li>';
}

window.onload = function() {
	showChats(localStorage.getItem("userId"));
	showChatMessages(localStorage.getItem("activeChatId"));
};


