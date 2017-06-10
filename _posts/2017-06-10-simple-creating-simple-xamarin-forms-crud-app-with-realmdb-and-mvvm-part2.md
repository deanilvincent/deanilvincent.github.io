---
layout: post
type: blog
title:  "Creating Simple Xamarin Forms Crud App with RealmDB and MVVM Part 2"
date:   2017-06-10 00:05:21
snippet: This is the part 2 or the continuation of "Creating Simple Xamarin Forms Crud App with RealmDB and MVVM"
---

In this post, we will create basic design of our pages and navigate them properly.

If you haven't read the first part, you can find it here:

// link please

### 8.0 Creating Pages for List of Customer Details, Create Page, Edit & Delete Page

8.1 Right click the "Views" folder -> "Add" -> "New Item..." and go to "Visual C#" -> "Cross Platform" then choose "Forms Blank Content Page Xaml." Name this page as, for example, "CreateCustomer.xaml"

8.2 Do the same and create pages for "UpdateOrDeleteCustomer.xaml", "ListOfCustomers"

<img src="https://user-images.githubusercontent.com/10904957/26988663-d90430de-4d82-11e7-9c8b-132f95d8323a.PNG"/>

8.3 Since we want to use the "ViewModel" where our Commands are located, we need reference it inside our xaml page then bind the whole page with it.

You can achieve it by adding this code snippet after the x:Class="..." above

<img src="https://user-images.githubusercontent.com/10904957/27001690-ed2969e6-4e02-11e7-8cbb-f1a098072441.PNG"/>

8.4 For "CreateCustomer.xaml" Page Add this code inside your ContentPage

{% highlight ruby linenos %}
<StackLayout Padding="20">
  <Label Text="Enter Customer Name"/>
  <Entry Text="{Binding CustomerDetails.CustomerName, Mode=TwoWay}"/>

  <Label Text="Enter Customer Age"/>
  <Entry Text="{Binding CustomerDetails.CustomerAge, Mode=TwoWay}"/>

  <Button Text="Create"
          Command="{Binding CreateCommand}"/>
</StackLayout>
{% endhighlight %}

We use the Mode=TwoWay to use the property from source to target or target to source. For Basic Understanding of DataBinding and MVVM you can back to this post <a href="https://deanilvincent.github.io//2017/06/03/basic-understanding-of-mvvm-and-databinding-in-xamarin-forms/">Basic Understanding How Data Binding and MVVM works in Xamarin Forms</a>

You also notice the "CreateCommand" is bindable inside our Button. So when the user click the button, the command will execute inside our ViewModel.

8.5 For "UpdateOrDeleteCustomer.xaml" Page Add this code inside your ContentPage

Note: But before that, you need to reference our ViewModel again. Go back to step 8.3 and do the same thing.

{% highlight ruby linenos %}
<StackLayout Padding="20">
  <Label Text="Enter Customer Id for Update/Delete"/>
  <Entry Text="{Binding CustomerDetails.CustomerId, Mode=TwoWay}"/>

  <Label Text="Enter Customer Name"/>
  <Entry Text="{Binding CustomerDetails.CustomerName, Mode=TwoWay}"/>

  <Label Text="Enter Customer Age"/>
  <Entry Text="{Binding CustomerDetails.CustomerAge, Mode=TwoWay}"/>

  <Button Text="Update"
          Command="{Binding UpdateCommand}"/>

  <Button Text="Delete"
          Command="{Binding RemoveCommand}"/>
</StackLayout>
{% endhighlight %}

8.6 For "ListOfCustomers.xaml" Page, add this code snippet inside your content page.

Note: But before that, you need to reference our ViewModel again. Go back to step 8.3 and do the same thing.

{% highlight ruby linenos %}
<ListView ItemSource="{Binding ListOfCustomerDetails}"
          HasUnevenRows="True">
          <ListView.ItemTemplate>
            <DataTemplate>
              <ViewCell>
                <StackLayout Padding="10">
                  <Label Text="{Binding CustomerId}"/>
                  <Label Text="{Binding CustomerName}"/>
                  <Label Text="{Binding CustomerAge}"/>
                </StackLayout>
              </ViewCell>
            </DataTemplate>
          </ListView.ItemTemplate>
</ListView>
{% endhighlight %}

8.7 Lastly, our "MainPage.xaml" page. Just simply add this code snippet

Note: But before that, you need to reference our ViewModel again. Go back to step 8.3 and do the same thing.

{% highlight ruby linenos %}
<StackLayout Padding="20">
  <Button Text="List Of Customers"
          Command="{Binding NavToListCommand}"/>
  <Button Text="Create Customer Details"
          Command="{Binding NavToCreateCommand}"/>
  <Button Text="Update or Delete Customer by Id"
          Command="{Binding NavToUpdateDeleteCommand}"/>
</StackLayout>
{% endhighlight %}

I guess you are wondering now, where these commands are located? Proceed to step 9 instead.

### 9.0 Implementing Simple Navigation Inside Our ViewModel

9.1 Inside our CustomerViewModel, Add this following commands

{% highlight ruby linenos %}
// For Navigation Page
  public Command NavToListCommand
  {
    get
    {
      return new Command(async () =>
      {
        await App.Current.MainPage.Navigation.PushAsync(new ListOfCustomers());
      });
    }
  }

  public Command NavToCreateCommand
  {
    get
    {
      return new Command(async () =>
      {
        await App.Current.MainPage.Navigation.PushAsync(new CreateCustomer());
      });
    }
  }

  public Command NavToUpdateDeleteCommand
  {
    get
    {
      return new Command(async () =>
      {
        await App.Current.MainPage.Navigation.PushAsync(new UpdateOrDeleteCustomer());
      });
    }
  }
{% endhighlight %}

### 10.0 Updating Our App.xaml.cs and Run the App 

10.1 Update our MainPage inside our App.xaml.cs

<img src="https://user-images.githubusercontent.com/10904957/27001886-c66d483c-4e06-11e7-9ee1-df02b744bd50.PNG"/>

10.2 Run the app :)

Now you have a Cross Platform Crud App running in iOS, Android and UWP with Realm Mobile Database in each platform. :)

For Github Repo: <a href="https://github.com/deanilvincent/Xamarin-Forms-Crud-App-With-RealmDB-and-MVVM">Xamarin-Forms-Crud-App-With-RealmDB-and-MVVM</a>

Thank you for reading. I hope you’ve learned from me. Feel free to comment below!
