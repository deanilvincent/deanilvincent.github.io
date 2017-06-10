---
layout: post
type: blog
title:  "Creating Simple Xamarin Forms Crud App with RealmDB and MVVM Part 1"
date:   2017-06-09 11:36:33
snippet: In this post, we'll be creating simple Xamarin.Forms crud app with Realm Database and MVVM architectural design pattern. (Part 1)
---

In this blog tutorial, I'll be guiding you with very easy steps how to create a simple Xamarin.Forms crud app with Realm Database for local storage and integrated with MVVM architectural design pattern.

If you have no idea about MVVM (Model-View-View-Model) and DataBinding in Xamarin.Forms yet, you can read this post created by <a href="https://deanilvincent.github.io/">Me</a> of course :)

<a href="https://deanilvincent.github.io//2017/06/03/basic-understanding-of-mvvm-and-databinding-in-xamarin-forms/">Basic Understanding How Data Binding and MVVM works in Xamarin Forms</a>

If you are ready, Let us get started.

## What is Realm Mobile Database?

Basically, <a href="https://realm.io/products/realm-mobile-database/">Realm Mobile Database</a> is alternative for Sqlite. If you are familiar with Sqlite, it's the local database for your phone. This database is for light purposes only like storing cache, storing simple to-do task, simple game storage etc. Same way with Realm Mobile Database.

<img src="https://user-images.githubusercontent.com/10904957/26984406-dd282b68-4d71-11e7-9774-a07e3a1a045e.png"/>

<i>For more: <a href="https://realm.io/docs/get-started/overview/">Realm Get Started Page</a></i>

What the cool thing about Realm Database is that, it's so fast. They have some promising things about their Mission too:

<img src="https://user-images.githubusercontent.com/10904957/26983928-fad73fca-4d6f-11e7-9927-ddbe914126c5.png"/>

<i><a href="https://realm.io/about/">https://realm.io/about/</a></i>

Realm Mobile Database supports, 

  - Xamarin - Docs: <a href="https://realm.io/docs/xamarin/latest/">Realm Xamarin</a>
  - Java - Docs: <a href="https://realm.io/docs/java/latest/">Realm Java</a>
  - Objective-C - Docs: <a href="https://realm.io/docs/objc/latest/">Realm Objective-C</a>
  - Javascript - Docs: <a href="https://realm.io/docs/javascript/latest/">Realm Javascript</a>
  - Swift - Docs: <a href="https://realm.io/docs/swift/latest/">Realm Swift</a>
  
In this blog, we'll focusing on Realm Xamarin.
  
## Creating Our Xamarin.Forms Crud(Create, Read, Update & Delete) App with Realm Mobile Database and MVVM

### 1.0 Creating the Cross Platform App inside the Visual Studio

1.1 Open your visual studio and create new "Cross Platform Application" (Ctrl + Shift + N)

1.2 Choose "Installed" -> "Templates" -> "Visual C#" -> "Cross Platform." After naming your App, choose Xamarin.Forms and Portable Class Library (PCL) and click "Okay"

<img src="https://user-images.githubusercontent.com/10904957/26985153-d8db6446-4d74-11e7-9c92-d7cc63b6916b.PNG"/>

### 2.0 Installing Realm Mobile Database

2.1 Simply go to "Tools" (on the nav bar) -> "NuGet Package Manager" -> "Manage NuGet Packages for Solution..."

2.1 Search for "Realm"

<img src="https://user-images.githubusercontent.com/10904957/26987740-4e92e254-4d7f-11e7-9f00-3cfd919c0ead.PNG"/>

2.2. Check the "Project" to automatically check all the projects since we're targeting to use Realm Mobile Database in each platform.

<img src="https://user-images.githubusercontent.com/10904957/26987741-4e939f50-4d7f-11e7-95b7-d65ce884d552.PNG"/>
  
2.3 Click "Install" and wait until it finish.

### 3.0 Creating Simple MVVM Implementation in our Portable Project

3.1 Simply, Add these following folders

  - Models
  - ViewModels
  - Views

(By Default, MainPage.xaml is out the Views folder, just drag it inside our "Views" folder)
  
<img src="https://user-images.githubusercontent.com/10904957/26988112-9f196de6-4d80-11e7-9138-30f9cf4935c9.PNG"/>

### 4.0 Creating Model Class File.

4.1 Right Click the Folder "Models" -> "Add" -> "New Item..." and choose "Visual C#" -> "Class"

4.5 Name your class file. In our example, we use "CustomerDetails.cs" and click "Okay"

{% highlight ruby linenos %}
...
using Realms;

namespace CrudWithRealmApp.Models
{
  //  RealmObject means, Implicit reference conversion from model to realmobject
  public class CustomerDetails : RealmObject 
  {
    [PrimaryKey]
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public int CustomerAge { get; set; }
  }
}
{% endhighlight %}

The "PrimaryKey" is the key attribute in our table "CustomerDetails"

### 5.0 Creating our ViewModel class file

5.1 Right click the "ViewModels" folder -> "Add" -> "New Item..." and choose "Visual C#" -> "Class"

5.2 Name your class file. In our example, we use "CustomerViewModel.cs" and click "Okay"

### 6.0 Preparation of Our ViewModel For Getting the List Of Details

6.1 Let first implement the INotifyPropertyChanged

{% highlight ruby linenos %}
... 
using System.ComponentModel;

namespace CrudWithRealmApp.ViewModels
{
  public class CustomerViewModel : INotifyPropertyChanged
  {
    // code goes here
  }
}
{% endhighlight %}

<strong>Question:</strong> <i>What does "INotifyPropertyChanged" means?</i>

<strong>Answer:</strong> Is an interface to notify clients, typically binding clients that there has changed or the property has changed.

6.2 Paste this code snippet to easily use the "OnPropertyChanged" method. We use this method in our setter declaration because the property value is changing.

{% highlight ruby linenos %}
...
// Import this package
using System.RunTime.CompilerServices;

// Add this inside your class
public event PropertyChangedEventHandler PropertyChanged;

protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
{
    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
{% endhighlight %}

6.3 Create a list public and private property (backing field) of our model and put the "OnPropertyChanged" inside our "set"

{% highlight ruby linenos %}
... 
// Import our model
using CrudWithRealmApp.Models;

// Inside your class
private List<CustomerDetails> _listOfCustomerDetails;

public List<CustomerDetails> ListOfCustomerDetails
{
  get { return _listOfCustomerDetails; }
  set
  {
    _listOfCustomerDetails = value;
    OnPropertyChanged(); // Added the OnPropertyChanged Method
  }
}
{% endhighlight %}

6.4 Create a constructor and a method for getting the list of Customer Details

{% highlight ruby linenos %}
...
// Add this package
using Realms;

// Add this inside your view model classs
Realm _getRealmInstance = Realm.GetInstance();

public CustomerViewModel(){
  // supply the public ListOfCustomerDetails with the retrieved list of details
  ListOfCustomerDetails = _getRealmInstance.All<CustomerDetails>().ToList();
}
{% endhighlight %}

### 7.0 Preparation of Our ViewModel For Create, Update and Delete Commands

7.1 Inside the class view model, add this property referencing the model

{% highlight ruby linenos %}
private CustomerDetails _customerDetails = new CustomerDetails();

public CustomerDetails CustomerDetails {
   get { return _customerDetails; } 
   set 
   {
      _customerDetails = value;
      OnPropertyChanged(); // Add the OnPropertyChanged();
   } 
}
{% endhighlight %}

We will use this public "CustomerDetails" for binding in our view.

7.2. For Add, Edit and Delete/Remove Command Snippet, 

{% highlight ruby linenos %}
...
// import this
using Xamarin.Forms

// Add this inside your view model class
public Command CreateCommand // for ADD
{
  get
  {
    return new Command(async()=>{
      // for auto increment the id upon adding
      _customerDetails.CustomerId = _getRealmInstance.All<CustomerDetails>().Count() + 1;
      _getRealmInstance.Write(()=>
      {
        _getRealmInstance.Add(_customerDetails); // Add the whole set of details
      });
    });
  }
}

public Command UpdateCommand // For UPDATE
{
  get
  {
    return new Command(()=>
    {
      // instantiate to supply the new set of details
      var customerDetailsUpdate = new CustomerDetails
      {
        CustomerId = _customerDetails.CustomerId,
        CustomerName = _customerDetails.CustomerName,
        CustomerAge = _customerDetails.CustomerAge
      };

      _getRealmInstance.Write(()=>
      {
        // when there's id match, the details will be replaced except by primary key
        _getRealmInstance.Add(customerDetailsUpdate, update: true);
      })
    });
  }
}

public Command RemoveCommand
{
  get
  {
    return new Command(()=>
    {
      // get the details with specific id
      var getAllCustomerDetailsById = _getRealmInstance.All<CustomerDetails>().First( x => x.CustomerId == _customerDetails.CustomerId);

      using(var transaction = _getRealmInstance.BeginWrite()){
        // remove all details
        _getRealmInstance.Remove(getAllCustomerDetailsById);
        transaction.Commit();
      };
    });
  }
}
{% endhighlight %}

We're are done with the part I, now we can prepare our views and add some code snippets for navigation.

<a href="https://deanilvincent.github.io//2017/06/10/simple-creating-simple-xamarin-forms-crud-app-with-realmdb-and-mvvm-part2/">Creating Simple Xamarin Forms Crud App with RealmDB and MVVM Part 2</a>
https://deanilvincent.github.io//2017/06/10/simple-creating-simple-xamarin-forms-crud-app-with-realmdb-and-mvvm-part2/

If you have some questions or issues while following the steps here in the part 1, let me know below :)
