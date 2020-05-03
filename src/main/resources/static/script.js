var client = null;

function showMessage(value){
    var response = document.getElementById('response');
    var newResponse = document.createElement('p');
    newResponse.appendChild(document.createTextNode(value));
    response.appendChild(newResponse);
}

function connect(){
    client = Stomp.client('ws:localhost:8080/chat');
    client.connect({}, function(frame){
        client.subscribe("/topic/messages", function(message){
            showMessage(JSON.parse(message).value);
        });
    })
}

function sendMessage(){
    var messageInput = document.getElementById('messageInput').value;
    client.send("/app/chat", {}, JSON.stringify({'value': messageInput}));
}