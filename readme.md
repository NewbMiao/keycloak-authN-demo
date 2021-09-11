# Live demo for authentication

Using: 
- [Keycloak](https://www.keycloak.org/) for authentication
- [React](https://reactjs.org/) for client usecase
- [OPA](https://www.openpolicyagent.org/) for service token signitaure verify usecase
    > not recommend using OPA to do http request inside, just for examplify

![demo](http://media.newbmiao.com/tech/kecloak-authN.gif)

## Quick start

### step 1. service up

```shell
cd images/
# run keycloak, react, and opa
# using nginx proxy them to http://localhost 
docker-compose up
```

### step 2. authentication

visit http://localhost/

login info: 
- name: `myuser`
- pwd: `myuser`

will show token info in the page after pass authentication

> see code in `src/KeycloakProvider.tsx`

### step 3. token verify

visit http://localhost/verify

after authentication, will using `access_token` to request OPA verify api,
which show the normal process of token verification.

(just using the token's issuer configration.)

> see code in `images/opa/verify.rego`

----

Related technical concepts

[Summary-zh](http://blog.newbmiao.com/2021/09/19/tech-behind-authentication.html)

## OAuth, OpenID Connect, and SAML

[What’s the Difference Between OAuth, OpenID Connect, and SAML?](https://www.okta.com/identity-101/whats-the-difference-between-oauth-openid-connect-and-saml/)

### OpenID Connect (oidc)
> more details in: [openid.net](https://openid.net/connect/)

### Oauth 2.0
https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html

> more details in: [oauth.net](https://oauth.net/2/)

## Authentication vs. Authorization

![Authentication vs. Authorization](https://www.okta.com/sites/default/files/styles/1640w_scaled/public/media/image/2020-10/Authentication_vs_Authorization.png?itok=uBFRCfww)
> more details in [Authentication vs. Authorization](https://www.okta.com/identity-101/authentication-vs-authorization)


## Standard flow with PKCE

![PKCE](https://blog.postman.com/wp-content/uploads/2020/06/image6.png)

> more details in: [OAuth 2.0: Implicit Flow is Dead, Try PKCE Instead](https://blog.postman.com/pkce-oauth-how-to/)
