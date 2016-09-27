## The web based model schema enabling a shared UI between Skype for Web for 
Consumer and Skype for Web for Business

### jCafe/schema/common

Contains the API surface that is common to both jSkype and jLync.

* Any interfaces introduced in this folder will be a part of the public 
jLync web SDK.
* In future if there is a jSkype web SDK then this folder is a potential source 
for generating documentation.
* Only interfaces that are truly common to both jSkype and jLync should 
go here.

### jCafe/schema/int

Contains the API surface that is internally used by jSkype and (optionally) 
jLync.

* This folder should contain interfaces 
(or partial interfaces - see int/Participant.d.ts) 
that are used by SWX and expected to be implemented by both jSkype and jLync, 
but which are not to be exposed as part of the public SDK.
* New interfaces that are in development stage in jSkype can be added here.
* Note: jLync implements all interfaces provided here.
* Once an interface in this folder is stable and fully implemented by both jSkype 
and jLync then it can be promoted into the common folder.

### jCafe/schema/s4b.sdk

Contains any additions on top of the common folder that are required as part of 
the jLync web SDK.

* This folder inherits content from the common folder.
* The jLync web SDK documenation will be generated from this folder.
* jLync implements the content from this folder.
* The contents of this folder have no impact on jSkype, it is specific to 
jLync and its SDK.

#### API diagram

                        schema/common
                               ^
                               |
                   --------------------------
                   ^                         ^
                   |                         |
            schema/s4b.sdk                   |
                   ^                         |
                   |                         |
            jSkype4Business ---------> schema/int
                                             ^
                                             |
                                             |
                                          jSkype


#### How to test changes made to the schema

* Open command prompt and navigate to the schema folder

        $ npm i
        $ npm test

* Verify that the above commands complete successfully.
* Documentation is generated in schema/docgen/S4B-Documentation