# Discovery for Service Applications

 
**Trusted Application API**s are discovered using the discovery endpoint at **https://api.skypeforbusiness.com/platformservice/discover**.
This is a standard url which the **Trusted Application API** will expose in order for Service Applications to connect to the API and use the capabilities exposed.

This discover request does not need authentication.

 

Example:

Running a `GET` request on **https://api.skypeforbusiness.com/platformservice/discover** returns a json response with the following link. The link is the starting point for all operations by Service Applications on the API

```json
"service:applications":{"href":"https://api.skypeforbusiness.com/platformService/v1/applications"}
```
 