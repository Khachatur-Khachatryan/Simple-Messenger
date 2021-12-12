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
		chatId: 1,
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

function showChats(userId) {
	let arr = [];
	chats.forEach(chat => arr[chat.id] = chat);
	
	userChats.forEach(function(userChat) {
	    userChat.chat = arr[userChat.chatId];
	});
	
	let user_chats = userChats.filter(x => x.userId == userId);

	for(var userChat of user_chats) {

		if(localStorage.getItem("activeChatId") == userChat.chatId) {
			let template = '<li class="active">' +
									'<div class="image">' +
										'<img src="image/avatar2.png" width="53">' +
									'</div>' +
									'<div class="info">' +
										'<label class="title">' + userChat.chat.title + '</label>' +
										'<p class="last-message">' + userChat.chat.lastMessage + '</p>' +
									'</div>' +
								'</li>';

			var chatList = document.getElementById("chats");
			chatList.innerHTML += template;

			continue;
		}

		let template = '<li>' +
								'<div class="image">' +
									'<img src="image/avatar2.png" width="53">' +
								'</div>' +
								'<div class="info">' +
									'<label class="title">' + userChat.chat.title + '</label>' +
									'<p class="last-message">' + userChat.chat.lastMessage + '</p>' +
								'</div>' +
							'</li>';
		var chatList = document.getElementById("chats");
		chatList.innerHTML += template;
	}
}

window.onload = function() {
	showChats(localStorage.getItem("userId"));
};