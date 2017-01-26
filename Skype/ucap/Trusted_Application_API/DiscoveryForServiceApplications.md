# Discovery for Service Applications

 
Trusted Application APIs are discovered using the discovery endpoint at **https://noammeetings.resources.lync.com/platformservice/discover**

>Note: for TAP partners, please use the following discovery endpoint: `https://noammeetings.resources.lync.com/platformservice/discover?deploymentpreference=nightly`

This is a standard url which the Trusted Application API will expose in order for Service Applications to connect to the API and use the capabilities exposed.

This discover request does not need authentication.

 

Example:

Running a `GET` request on **https://noammeetings.resources.lync.com/platformservice/discover** returns a json response with the following link. The link is the starting point for all operations by Service Applications on the API

```json
"ms:rtc:saas:applications":{"href":"https://ring2noammeetings.resources.lync.com/platformService/v1/applications"}
```
 