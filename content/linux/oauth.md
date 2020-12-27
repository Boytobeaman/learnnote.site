
---
title: "oauth"
metaTitle: "oauth, 什么是oauth"
metaDescription: "oauth， 什么是oauth"
---


### why oauth
How can I let a third-party services access my data but not giving them my password. 

For example:  
facebook want to find out your gmail friends who already using Facebook, at the very early days, facebook let you fill in you gmail account name and password, it is very dangerous.

what you want?
facebook find your gmail friends who are already using facebook.
but problem:
how to ensure facebook not get you emails content? as it knows your password.



#### what is OAuth 2
OAuth 2.0 is a protocol that allows a user to grant limited access to their resources on one site, to another site, without having to expose their credentials.

OAuth 2 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Facebook, GitHub, and DigitalOcean. It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account. OAuth 2 provides authorization flows for web and desktop applications, and mobile devices.


#### how does OAuth 2 work
1. The application requests authorization to access service resources from the user
1. If the user authorized the request, the application receives an authorization grant
1. The application requests an access token from the authorization server (API) by presenting authentication of its own identity, and the authorization grant
1. If the application identity is authenticated and the authorization grant is valid, the authorization server (API) issues an access token to the application. Authorization is complete
1. The application requests the resource from the resource server (API) and presents the access token for authentication
1. If the access token is valid, the resource server (API) serves the resource to the application

The actual flow of this process will differ depending on the authorization grant type in use, but this is the general idea.

how does OAuth 2 work
![how does OAuth 2 work](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/how-does-oauth2-work.jpg)


how does oauth2 work with no pre-register client secret
![how does oauth2 work with no pre-register client secret](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/how-does-oauth2-work-with-no-pre-register-client-secret.jpg)


#### OAuth 2 defines four grant types
##### Authorization Code
Authorization Code: used with server-side Applications  
The authorization code grant type is the most commonly used because it is optimized for server-side applications, where source code is not publicly exposed, and Client Secret confidentiality can be maintained. 

##### Implicit
Implicit: used with Mobile Apps or Web Applications (applications that run on the user’s device)  

##### Resource Owner Password Credentials
Resource Owner Password Credentials: used with trusted Applications, such as those owned by the service itself  

##### Client Credentials
Client Credentials: used with Applications API access