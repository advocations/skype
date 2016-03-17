
# Show a person's information

 **Last modified:** February 02, 2016

 _**Applies to:** Skype for Business 2015_

The person information a signed in user can get for another user is restricted by the Privacy relationships between the two users. When a privacy relationship restricts access to person information, the [Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx) property for that information is null.

After the user is signed in, your application can do the following procedure. The desired person may not be in the user's person list. In that case, see [Search for persons and distribution groups]( /SearchForPersonsAndGroups.md) to learn about providing a person search feature.

### How to: Show a person's information


1. Handle the  **[PersonsAndGroupsManager](http://technet.microsoft.com/library/ce912c52-5bed-47b1-b4e0-ce4328297c87%28Office.14%29.aspx).persons** "added" event to put the added person on a web page.
    
2. Add an event handler for the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx).status** property changed event. Update the web page with the new availability of the person.
    
3. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx).displayName** property to get the person's name.
    
4. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx).title** property to get the person's business title.
    
5. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx).department** property to get the person's work department.
    
6. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx).company** property to get the person's company name.
    



```
personsAndGroupsManager.persons.added(function (person) {
    //create a listener for the contact status changed event
    person.status.changed(function (status) {
        // update the text to the new status
        $("#status").text = status;
    });
    person.activity.changed(function (activity) {
        // update the text to the new activity
        $("# activity ").text = activity;
    });
    person.title.changed(function (title) {
        // update the text to the new title
        $("# title ").text = title;
    });
    person.department.changed(function (department) {
        // update the text to the new department
        $("# department ").text = department;
    });
    person.status.subscribe();
    person.activity.subscribe();
    person.title.subscribe();
    person.department.subscribe();
});

```

