// 필요한 모듈들을 가져옵니다.
import http from "http";  // Node.js의 내장 HTTP 모듈을 가져옵니다.
import WebSocket from "ws";  // WebSocket 기능을 위한 'ws' 라이브러리를 가져옵니다.
import express from "express";  // Express 웹 프레임워크를 가져옵니다.

// Express 애플리케이션 인스턴스를 생성합니다.
const app = express();

// 뷰 엔진을 'pug'로 설정합니다.
app.set("view engine", "pug");
// 뷰 파일들의 위치를 설정합니다.
app.set("views", __dirname + "/views");
// 정적 파일들을 제공할 디렉토리를 설정합니다.
app.use("/public", express.static(__dirname + "/public"));
// 루트 경로('/')에 대한 GET 요청 처리: 'home' 뷰를 렌더링합니다.
app.get("/", (req, res) => res.render("home"));
// 그 외 모든 경로에 대한 GET 요청 처리: 루트 경로('/')로 리다이렉트합니다.
app.get("/*", (req, res) => res.redirect("/"));

// 서버가 시작되었을 때 실행될 콜백 함수입니다.
const handleListen = () => console.log(`Listening on http://localhost:3000`);

// HTTP 서버를 생성합니다.
const server = http.createServer(app);
// WebSocket 서버를 생성하고 HTTP 서버와 연결합니다.
const wss = new WebSocket.Server({server});

function handleConnection(socket) {
    console.log(socket);
}

wss.on("connection", (socket) => {
    socket.send("hello!");
} );

// 서버를 3000 포트에서 시작하고, 시작되면 handleListen 함수를 실행합니다.
server.listen(3000, handleListen);