package verify

is_token_valid = {"is_verified": x, "cert_loaded": y, "is_expired": z} {
	kid := getTokenKid(input.token)
	cert := getPublicKey(kid)
	y := count(cert) > 0
	x := io.jwt.verify_rs256(input.token, cert)
	z := getTokenExp(input.token) < (time.now_ns() / 1e9)
}

getPublicKey(kid) = res {
	jwks := http.send({
		"method": "get",
		"url": input.jwkUri,
	})

	k := jwks.body[_][_]
	k.kid = kid
	x5c := k.x5c[0]
	count(x5c) > 0
	res := sprintf("%s%s%s", ["-----BEGIN CERTIFICATE-----\n", x5c, "\n-----END CERTIFICATE-----"])
}

getTokenKid(token) = x {
	[header, payload, signature] := io.jwt.decode(token)
	x := header.kid
}

getTokenExp(token) = x {
	[header, payload, signature] := io.jwt.decode(token)
	x := payload.exp
}
