const socket = new WebSocket(`ws://${window.location.host}`);


socket.addEventListener("open", ()=> {
    console.log("connected to browser");
});

socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message, " from the serever")
});

socket.addEventListener("close", ()=> {
    console.log("disconnected to browser");
});