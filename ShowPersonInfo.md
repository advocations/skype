
# Show a person's information

 **Last modified:** March 23, 2016

 _**Applies to:** Skype for Business 2015_


The person information a signed in user can get for another user is restricted by the privacy relationships between the two users. When a privacy relationship restricts access to person information, the [Person](https://msdn.microsoft.com/en-us/library/office/dn962150(v=office.16).aspx) property for that information is undefined.


After the user is signed in, your application can do the following procedure. The desired person may not be in the user's person list. In that case, see [search for persons and distribution groups](/SearchForPersonsAndGroups.md) to learn about providing a person search feature.

### How to: Show a person's information

1. Handle the **[PersonsAndGroupsManager](http://technet.microsoft.com/library/ce912c52-5bed-47b1-b4e0-ce4328297c87%28Office.14%29.aspx)#persons.added** event to put the added person on a web page.

2. Add an event handler for the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx)#status** property changed event. Update the web page with the new availability of the person.

3. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx)#displayName** property to get the person's name.

4. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx)#title** property to get the person's business title.

5. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx)#department** property to get the person's work department.

6. Read the  **[Person](http://technet.microsoft.com/library/10e41c61-92ff-4bb0-a855-61d1ef231833%28Office.14%29.aspx)#company** property to get the person's company name.

```js
app.personsAndGroupsManager.all.persons.added(person => {
    // let's assume we're using jQuery here: $(id).text(s) can
    // be rewritten as document.querySelector(id).textContent = s
    person.status.changed(status => $("#status").text(status));
    person.activity.changed(activity => $("#activity").text(activity));
    person.title.changed(title => $("#title").text(title));
    person.department.changed(department => $("#department").text(department));
    
    // the online status changes often, so tell the SDK
    // to create a presence subscription; note, that
    // despite there are two .subscribe()s below, the SDK
    // will create only one presence subscription
    person.status.subscribe();
    person.activity.subscribe();

    // unlike the online status, contact details like title
    // and department don't change often, so it's enough to
    // fetch them once from the server: .get() sends a GET
    // to UCWA if the property value isn't cached, or returns
    // a resolved promise right away; moreover, the two .get()s
    // below will result in one GET request at most
    person.title.get();
    person.department.get();
});

```

