const qr = require("qr-image")

async function generate(request) {
  const headers = { "Content-Type": "image/png" }
  let date = Date();
  console.log(date);
  let json = JSON.stringify(date);
  console.log(json);
  const qr_png = qr.imageSync(json)
  return new Response(qr_png, { headers })
}

const landing = `
<html>
<title>QR Clock</title>
<body>
<h1>QR Clock</h1>
<p>
<img src="/qr">
</p>
<p><a href="https://tiernanotoole.ie">Built by Tiernan OToole</a>. <a href="https://twitter.com/tiernano">@tiernano</a></p>
</body>
</html>
`


function handleRequest(request) {
	console.log(request.url)

	const url = new URL(request.url);

	if (url.pathname.startsWith("/qr")) {
		return generate(request)
	}
	else
	{
		return new Response(landing, {
			headers: {
			"Content-Type": "text/html"
			}
		})
	}
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})