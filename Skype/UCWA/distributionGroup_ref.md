
# distributionGroup (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents a persistent, pre-existing group of contacts. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

A distribution group is a mail-enabled Active Directory group object. An application can subscribe to updates from member contacts. Updates include [presence (UCWA)](presence_ref.md), [location (UCWA)](location_ref.md), or [note (UCWA)](note_ref.md) changes for a specific contact. Currently, distributionGroup is a read-only resource. Unlike other group types, it cannot be managed by any Skype for Business endpoint. An application must call[startOrRefreshSubscriptionToContactsAndGroups (UCWA)](startOrRefreshSubscriptionToContactsAndGroups_ref.md) before it can receive events when a distributionGroup is created, modified, or removed.


### Properties





|**Name**|**Description**|
|:-----|:-----|
|uri|The distribution group's address.|
|id|The group's ID.|
|name|The group's name.The maximum length is 256 characters.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|addToContactList|Adds a [distributionGroup (UCWA)](distributionGroup_ref.md) into contact list.|
|expandDistributionGroup|Expands a distribution group and returns the set of [contact (UCWA)](contact_ref.md) resources it contains.|
|groupContacts|A collection of contact resources that belong to a particular group resource.|
|removeFromContactList|Removes a [distributionGroup (UCWA)](distributionGroup_ref.md) from contact list.|
|subscribeToGroupPresence|Subscribes to the presence information of all the contacts in a particular group.|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|distributionGroup|Represents a persistent, pre-existing group of contacts.|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|contact|Low|people|Indicates that a specific contact was added to this group. The application can decide to fetchthe updated information.|
Sample of returned event data.

This sample is given only as an illustration of event syntax. The semantic content is not guaranteed to correspond to a valid scenario.




```

{
  "_links" : {
    "self" : {
      "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=1"
    },
    "next" : {
      "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=2"
    }
  },
  "sender" : [
    {
      "rel" : "people",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/people",
      "events" : [
        {
          "link" : {
            "rel" : "contact",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/people/166"
          },
          "in" : {
            "rel" : "distributionGroup",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/distributionGroup"
          },
          "type" : "added"
        }
      ]
    }
  ]
}
					
```


### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|distributionGroup|High|people|Indicates that the distribution group has been updated. The application can decide to fetch theupdated information.|
Sample of returned event data.

This sample is given only as an illustration of event syntax. The semantic content is not guaranteed to correspond to a valid scenario.




```

{
  "_links" : {
    "self" : {
      "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=1"
    },
    "next" : {
      "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=2"
    }
  },
  "sender" : [
    {
      "rel" : "people",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/people",
      "events" : [
        {
          "link" : {
            "rel" : "distributionGroup",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/distributionGroup"
          },
          "type" : "updated"
        }
      ]
    }
  ]
}
					
```


### deleted





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|contact|Low|people|Indicates that a specific contact was deleted from this group. The application can decide tofetch the updated information.|
Sample of returned event data.




```

{
  "_links" : {
    "self" : {
      "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=1"
    },
    "next" : {
      "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=2"
    }
  },
  "sender" : [
    {
      "rel" : "people",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/people",
      "events" : [
        {
          "link" : {
            "rel" : "contact",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/people/166"
          },
          "in" : {
            "rel" : "distributionGroup",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/distributionGroup"
          },
          "type" : "deleted"
        }
      ]
    }
  ]
}
					
```


## Operations
<a name="sectionSection3"> </a>




### GET

Returns a representation of a persistent, pre-existing group of contacts.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/groups/distributionGroup HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 5986
										{
  "rel" : "distributionGroup",
  "uri" : "sip:mypersonalgroup@contoso.com",
  "id" : "7",
  "name" : "MyPersonalGroup",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/groups/distributionGroup"
    },
    "addToContactList" : {
      "href" : "//v1/applications/833/groups/addToContactList"
    },
    "expandDistributionGroup" : {
      "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
    },
    "groupContacts" : {
      "href" : "//v1/applications/833/contacts"
    },
    "removeFromContactList" : {
      "href" : "//v1/applications/833/groups/removeFromContactList"
    },
    "subscribeToGroupPresence" : {
      "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
    }
  },
  "_embedded" : {
    "contact" : [
      {
        "rel" : "contact",
        "company" : "Contoso Corp.",
        "department" : "Engineering",
        "emailAddresses" : [
          "Alex.Doe@contoso.com"
        ],
        "homePhoneNumber" : "tel:+19185550107",
        "sourceNetworkIconUrl" : "https://images.contoso.com/logo_16x16.png",
        "mobilePhoneNumber" : "tel:4255551212;phone-context=defaultprofile",
        "name" : "Alex Doe",
        "office" : "tel:+1425554321;ext=54321",
        "otherPhoneNumber" : "tel:+19195558194",
        "sourceNetwork" : "SameEnterprise",
        "title" : "Engineer 2",
        "type" : "User",
        "uri" : "sip:alex@contoso.com",
        "workPhoneNumber" : "tel:+1425554321;ext=54321",
        "_links" : {
          "self" : {
            "href" : "//v1/applications/833/people/166"
          },
          "contactLocation" : {
            "href" : "//v1/applications/833/people/166/contactLocation"
          },
          "contactNote" : {
            "href" : "//v1/applications/833/people/166/contactNote"
          },
          "contactPhoto" : {
            "href" : "//v1/applications/833/people/166/contactPhoto"
          },
          "contactPresence" : {
            "href" : "//v1/applications/833/people/166/contactPresence"
          },
          "contactPrivacyRelationship" : {
            "href" : "//v1/applications/833/people/166/contactPrivacyRelationship"
          },
          "contactSupportedModalities" : {
            "href" : "//v1/applications/833/people/166/contactSupportedModalities"
          }
        }
      }
    ],
    "distributionGroup" : [
      {
        "rel" : "distributionGroup",
        "uri" : "sip:mypersonalgroup@contoso.com",
        "id" : "7",
        "name" : "MyPersonalGroup",
        "_links" : {
          "self" : {
            "href" : "//v1/applications/833/groups/distributionGroup"
          },
          "addToContactList" : {
            "href" : "//v1/applications/833/groups/addToContactList"
          },
          "expandDistributionGroup" : {
            "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
          },
          "groupContacts" : {
            "href" : "//v1/applications/833/contacts"
          },
          "removeFromContactList" : {
            "href" : "//v1/applications/833/groups/removeFromContactList"
          },
          "subscribeToGroupPresence" : {
            "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
          }
        },
        "_embedded" : {
          "contact" : [
            {
              "rel" : "contact",
              "company" : "Contoso Corp.",
              "department" : "Engineering",
              "emailAddresses" : [
                "Alex.Doe@contoso.com"
              ],
              "homePhoneNumber" : "tel:+19185550107",
              "sourceNetworkIconUrl" : "https://images.contoso.com/logo_16x16.png",
              "mobilePhoneNumber" : "tel:4255551212;phone-context=defaultprofile",
              "name" : "Alex Doe",
              "office" : "tel:+1425554321;ext=54321",
              "otherPhoneNumber" : "tel:+19195558194",
              "sourceNetwork" : "SameEnterprise",
              "title" : "Engineer 2",
              "type" : "User",
              "uri" : "sip:alex@contoso.com",
              "workPhoneNumber" : "tel:+1425554321;ext=54321",
              "_links" : {
                "self" : {
                  "href" : "//v1/applications/833/people/166"
                },
                "contactLocation" : {
                  "href" : "//v1/applications/833/people/166/contactLocation"
                },
                "contactNote" : {
                  "href" : "//v1/applications/833/people/166/contactNote"
                },
                "contactPhoto" : {
                  "href" : "//v1/applications/833/people/166/contactPhoto"
                },
                "contactPresence" : {
                  "href" : "//v1/applications/833/people/166/contactPresence"
                },
                "contactPrivacyRelationship" : {
                  "href" : "//v1/applications/833/people/166/contactPrivacyRelationship"
                },
                "contactSupportedModalities" : {
                  "href" : "//v1/applications/833/people/166/contactSupportedModalities"
                }
              }
            }
          ],
          "distributionGroup" : [
            {
              "rel" : "distributionGroup",
              "uri" : "sip:mypersonalgroup@contoso.com",
              "id" : "7",
              "name" : "MyPersonalGroup",
              "_links" : {
                "self" : {
                  "href" : "//v1/applications/833/groups/distributionGroup"
                },
                "addToContactList" : {
                  "href" : "//v1/applications/833/groups/addToContactList"
                },
                "expandDistributionGroup" : {
                  "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
                },
                "groupContacts" : {
                  "href" : "//v1/applications/833/contacts"
                },
                "removeFromContactList" : {
                  "href" : "//v1/applications/833/groups/removeFromContactList"
                },
                "subscribeToGroupPresence" : {
                  "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
                }
              },
              "_embedded" : {
                "contact" : [
                  {
                    "rel" : "contact",
                    "company" : "Contoso Corp.",
                    "department" : "Engineering",
                    "emailAddresses" : [
                      "Alex.Doe@contoso.com"
                    ],
                    "homePhoneNumber" : "tel:+19185550107",
                    "sourceNetworkIconUrl" : "https://images.contoso.com/logo_16x16.png",
                    "mobilePhoneNumber" : "tel:4255551212;phone-context=defaultprofile",
                    "name" : "Alex Doe",
                    "office" : "tel:+1425554321;ext=54321",
                    "otherPhoneNumber" : "tel:+19195558194",
                    "sourceNetwork" : "SameEnterprise",
                    "title" : "Engineer 2",
                    "type" : "User",
                    "uri" : "sip:alex@contoso.com",
                    "workPhoneNumber" : "tel:+1425554321;ext=54321",
                    "_links" : {
                      "self" : {
                        "href" : "//v1/applications/833/people/166"
                      },
                      "contactLocation" : {
                        "href" : "//v1/applications/833/people/166/contactLocation"
                      },
                      "contactNote" : {
                        "href" : "//v1/applications/833/people/166/contactNote"
                      },
                      "contactPhoto" : {
                        "href" : "//v1/applications/833/people/166/contactPhoto"
                      },
                      "contactPresence" : {
                        "href" : "//v1/applications/833/people/166/contactPresence"
                      },
                      "contactPrivacyRelationship" : {
                        "href" : "//v1/applications/833/people/166/contactPrivacyRelationship"
                      },
                      "contactSupportedModalities" : {
                        "href" : "//v1/applications/833/people/166/contactSupportedModalities"
                      }
                    }
                  }
                ],
                "distributionGroup" : [
                  {
                    "rel" : "distributionGroup",
                    "uri" : "sip:mypersonalgroup@contoso.com",
                    "id" : "7",
                    "name" : "MyPersonalGroup",
                    "_links" : {
                      "self" : {
                        "href" : "//v1/applications/833/groups/distributionGroup"
                      },
                      "addToContactList" : {
                        "href" : "//v1/applications/833/groups/addToContactList"
                      },
                      "expandDistributionGroup" : {
                        "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
                      },
                      "groupContacts" : {
                        "href" : "//v1/applications/833/contacts"
                      },
                      "removeFromContactList" : {
                        "href" : "//v1/applications/833/groups/removeFromContactList"
                      },
                      "subscribeToGroupPresence" : {
                        "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
                      }
                    },
                    "_embedded" : {
                      "contact" : [
                        {
                          "_links" : {
                            "self" : {
                              "href" : "//v1/applications/833/people/166"
                            }
                          }
                        }
                      ],
                      "distributionGroup" : [
                        {
                          "_links" : {
                            "self" : {
                              "href" : "//v1/applications/833/groups/distributionGroup"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/groups/distributionGroup HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 7782
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
  <link rel="addToContactList" href="//v1/applications/833/groups/addToContactList" />
  <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
  <link rel="groupContacts" href="//v1/applications/833/contacts" />
  <link rel="removeFromContactList" href="//v1/applications/833/groups/removeFromContactList" />
  <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
  <property name="rel">distributionGroup</property>
  <property name="uri">sip:mypersonalgroup@contoso.com</property>
  <property name="id">7</property>
  <property name="name">MyPersonalGroup</property>
  <resource rel="contact" href="//v1/applications/833/people/166">
    <link rel="contactLocation" href="//v1/applications/833/people/166/contactLocation" />
    <link rel="contactNote" href="//v1/applications/833/people/166/contactNote" />
    <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
    <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
    <link rel="contactPrivacyRelationship" href="//v1/applications/833/people/166/contactPrivacyRelationship" />
    <link rel="contactSupportedModalities" href="//v1/applications/833/people/166/contactSupportedModalities" />
    <property name="rel">contact</property>
    <property name="company">Contoso Corp.</property>
    <property name="department">Engineering</property>
    <propertyList name="emailAddresses">
      <item>Alex.Doe@contoso.com</item>
    </propertyList>
    <property name="homePhoneNumber">tel:+19185550107</property>
    <property name="sourceNetworkIconUrl">https://images.contoso.com/logo_16x16.png</property>
    <property name="mobilePhoneNumber">tel:4255551212;phone-context=defaultprofile</property>
    <property name="name">Alex Doe</property>
    <property name="office">tel:+1425554321;ext=54321</property>
    <property name="otherPhoneNumber">tel:+19195558194</property>
    <property name="sourceNetwork">SameEnterprise</property>
    <property name="title">Engineer 2</property>
    <property name="type">User</property>
    <property name="uri">sip:alex@contoso.com</property>
    <property name="workPhoneNumber">tel:+1425554321;ext=54321</property>
  </resource>
  <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup">
    <link rel="addToContactList" href="//v1/applications/833/groups/addToContactList" />
    <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
    <link rel="groupContacts" href="//v1/applications/833/contacts" />
    <link rel="removeFromContactList" href="//v1/applications/833/groups/removeFromContactList" />
    <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
    <property name="rel">distributionGroup</property>
    <property name="uri">sip:mypersonalgroup@contoso.com</property>
    <property name="id">7</property>
    <property name="name">MyPersonalGroup</property>
    <resource rel="contact" href="//v1/applications/833/people/166">
      <link rel="contactLocation" href="//v1/applications/833/people/166/contactLocation" />
      <link rel="contactNote" href="//v1/applications/833/people/166/contactNote" />
      <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
      <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
      <link rel="contactPrivacyRelationship" href="//v1/applications/833/people/166/contactPrivacyRelationship" />
      <link rel="contactSupportedModalities" href="//v1/applications/833/people/166/contactSupportedModalities" />
      <property name="rel">contact</property>
      <property name="company">Contoso Corp.</property>
      <property name="department">Engineering</property>
      <propertyList name="emailAddresses">
        <item>Alex.Doe@contoso.com</item>
      </propertyList>
      <property name="homePhoneNumber">tel:+19185550107</property>
      <property name="sourceNetworkIconUrl">https://images.contoso.com/logo_16x16.png</property>
      <property name="mobilePhoneNumber">tel:4255551212;phone-context=defaultprofile</property>
      <property name="name">Alex Doe</property>
      <property name="office">tel:+1425554321;ext=54321</property>
      <property name="otherPhoneNumber">tel:+19195558194</property>
      <property name="sourceNetwork">SameEnterprise</property>
      <property name="title">Engineer 2</property>
      <property name="type">User</property>
      <property name="uri">sip:alex@contoso.com</property>
      <property name="workPhoneNumber">tel:+1425554321;ext=54321</property>
    </resource>
    <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup">
      <link rel="addToContactList" href="//v1/applications/833/groups/addToContactList" />
      <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
      <link rel="groupContacts" href="//v1/applications/833/contacts" />
      <link rel="removeFromContactList" href="//v1/applications/833/groups/removeFromContactList" />
      <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
      <property name="rel">distributionGroup</property>
      <property name="uri">sip:mypersonalgroup@contoso.com</property>
      <property name="id">7</property>
      <property name="name">MyPersonalGroup</property>
      <resource rel="contact" href="//v1/applications/833/people/166">
        <link rel="contactLocation" href="//v1/applications/833/people/166/contactLocation" />
        <link rel="contactNote" href="//v1/applications/833/people/166/contactNote" />
        <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
        <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
        <link rel="contactPrivacyRelationship" href="//v1/applications/833/people/166/contactPrivacyRelationship" />
        <link rel="contactSupportedModalities" href="//v1/applications/833/people/166/contactSupportedModalities" />
        <property name="rel">contact</property>
        <property name="company">Contoso Corp.</property>
        <property name="department">Engineering</property>
        <propertyList name="emailAddresses">
          <item>Alex.Doe@contoso.com</item>
        </propertyList>
        <property name="homePhoneNumber">tel:+19185550107</property>
        <property name="sourceNetworkIconUrl">https://images.contoso.com/logo_16x16.png</property>
        <property name="mobilePhoneNumber">tel:4255551212;phone-context=defaultprofile</property>
        <property name="name">Alex Doe</property>
        <property name="office">tel:+1425554321;ext=54321</property>
        <property name="otherPhoneNumber">tel:+19195558194</property>
        <property name="sourceNetwork">SameEnterprise</property>
        <property name="title">Engineer 2</property>
        <property name="type">User</property>
        <property name="uri">sip:alex@contoso.com</property>
        <property name="workPhoneNumber">tel:+1425554321;ext=54321</property>
      </resource>
      <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup">
        <link rel="addToContactList" href="//v1/applications/833/groups/addToContactList" />
        <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
        <link rel="groupContacts" href="//v1/applications/833/contacts" />
        <link rel="removeFromContactList" href="//v1/applications/833/groups/removeFromContactList" />
        <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
        <property name="rel">distributionGroup</property>
        <property name="uri">sip:mypersonalgroup@contoso.com</property>
        <property name="id">7</property>
        <property name="name">MyPersonalGroup</property>
        <resource rel="contact" href="//v1/applications/833/people/166" />
        <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup" />
      </resource>
    </resource>
  </resource>
</resource>
									
```

