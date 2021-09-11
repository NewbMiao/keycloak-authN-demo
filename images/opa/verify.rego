package verify

default in_docker = "false"

in_docker = opa.runtime().env.IN_DOCKER

is_token_valid = {"is_verified": x, "cert_loaded": y, "is_expired": z} {
	[header, payload, _] := io.jwt.decode(input.token)
	jwksUri := getTokenIssuer(payload.iss)
	trace(sprintf("jwksUri %v", [jwksUri]))

	jwks := getJwks(jwksUri)
	trace(sprintf("jwks status: %v, kid: %s", [jwks.status, header.kid]))
	cert := getPublicKey(jwks, header.kid)
	y := count(cert) > 0
	x := verifyToken(input.token, cert)
	z := payload.exp < (time.now_ns() / 1e9)
}

getJwks(jwkUri) = jwks {
	jwks := http.send({
		"method": "get",
		"url": jwkUri,
		"raise_error": false,
	})
}

getPublicKey(jwks, kid) = x {
	k := jwks.body[_][_]
	kid == k.kid
	x5c := k.x5c[0]
	x := sprintf("%s%s%s", ["-----BEGIN CERTIFICATE-----\n", x5c, "\n-----END CERTIFICATE-----"])
} else = "" {
	true
}

verifyToken(token, cert) {
	io.jwt.verify_rs256(token, cert)
} else = false {
	true
}

getTokenIssuer(iss) = x {
	in_docker == "false"
	x := sprintf("%s/1protocol/openid-connect/certs", [iss])
} else = x {
	in_docker == "true"
	issInhost := sprintf("%s/protocol/openid-connect/certs", [iss])
	x := replace(issInhost, "localhost", "host.docker.internal")
}
