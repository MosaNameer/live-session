import { io } from "socket.io-client";

export default defineNuxtPlugin(nuxtApp => {
    const nameCookie = useCookie('name');
    if (!nameCookie.value){
        nameCookie.value = prompt("Please enter your name", "Student " + Math.floor(Math.random() * 100));
    }

    const socket = io(':8787', {
        auth: {
            token: nameCookie.value
        }
    });
    const socketState = useState('socket');
    socketState.value = socket;

    socket.on("connect", () => {
        console.log('%c [SOCKET] Connected! ', 'background: #2BBA75; color: #ffffff');
    });

    socket.on("reconnect", () => {
        console.log('%c [SOCKET] Reconnect! ', 'background: #2C2657; color: #ffffff');
    });

    socket.on("disconnect", () => {
        console.log('%c [SOCKET] Disconnected! ', 'background: #E76F6F; color: #ffffff');
    });
})
