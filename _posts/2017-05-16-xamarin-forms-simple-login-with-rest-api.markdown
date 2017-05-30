---
layout: post
type: blog
title:  "Xamarin Forms Simple Login With Rest API"
date:   2017-05-16 01:23:33
snippet: If you're using asp.net web api or you want to apply this api snippets and add some logic to your xamarin forms login system, this post is very helpful 
---

This project is one of the simplest ways how to implement login system using Web Service Rest API.

### iOS Preview

<img src="https://cloud.githubusercontent.com/assets/10904957/23106000/0b00f0ac-f722-11e6-8510-0107e68a6b0a.png"/>

<img src="https://cloud.githubusercontent.com/assets/10904957/23106001/0b2932ec-f722-11e6-85fe-46b04c75ce6b.png"/>

// Android Preview soon...

// UWP Preview soon...

Before we begin, we need to prepare our Web Service.

I created an optional prerequisite in creating your basic web service api using ASP.NET Web API.

Here's the link: <a href="https://deanilvincent.github.io//2017/05/16/steps-in-creating-basic-aspnet-web-service-api/"> Steps in Creating Basic Asp.Net Web Service API</a>

In this sample web service project, I included these following model class properties:

{% highlight ruby linenos %}
public class UserDetailCredentials
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
}
{% endhighlight %}

When you are done creating your web service, you can now proceed in creating our Xamarin Cross Platform Mobile App project.

## Basic Steps in Implementing Login System using Xamarin Forms.

### 1.0 Creating the project

1.1 Go to File -> New -> Project (Ctrl+Shift+N)

1.2 Choose Templates -> Visual C# -> Cross Platform and rename the project. (Here I named my project as CrossPlatformBasicLoginSystem) and then Click the "OK"

<img src="https://cloud.githubusercontent.com/assets/10904957/23104382/c77b7d80-f707-11e6-8e12-cd104b43dd02.PNG"/>

1.3 A white dialog box will appear and you need to choose the following: Template Blank App, Forms in UI Technology and PCL in Sharing. Then click "Accept" to finalize the project creation.

<img src="https://cloud.githubusercontent.com/assets/10904957/23104393/0c987d00-f708-11e6-85a4-6b668a59bbfa.PNG"/>

Now you have successfully created your project. This includes the following projects summary:

Main Project Portable (PCL)

1. Project.Droid (Android)
2. Project.iOS (iOS)
3. Project.UWP (UWP)
4. // other windows platform projects

### 2.0 Installation of nuget packages

2.1 Install the following nuget packages at the main project solution:

- <a href="https://www.nuget.org/packages/Microsoft.Net.Http/">Microsoft.Net.Http</a>
    - <a href="http://go.microsoft.com/fwlink/?LinkID=280055">Project URL</a>
- <a href="https://www.nuget.org/packages/Microsoft.Bcl/">Microsoft.Bcl</a>
    - <a href="http://go.microsoft.com/fwlink/?LinkID=280057">Project URL</a>
- <a href="https://www.nuget.org/packages/Microsoft.Bcl.Build/">Microsoft.Bcl.Build</a>
    - <a href="http://go.microsoft.com/fwlink/?LinkID=296436">Project URL</a>
- <a href="https://www.nuget.org/packages/newtonsoft.json/">Json.NET</a>
    - <a href="http://www.newtonsoft.com/json/help/html/Introduction.htm">Documetation</a>

You can use either the Manage Packages for Solution or Manually Type in the packages in the Package Manager Console.

<strong>Note:</strong> The simplest way is to just install the Microsoft.Net.Http since Microsoft.BCL & Microsoft.Bcl.Build are part of its dependencies.

<img src="https://cloud.githubusercontent.com/assets/10904957/23104700/e8d106c0-f70d-11e6-95b3-cb33e834d34f.PNG"/>

2.2 Create the following folders in the Portable Project

- Models
- RestAPIClient
- ServicesHandler
- Views

<img src="https://cloud.githubusercontent.com/assets/10904957/23104875/ef96ccbc-f710-11e6-8ab5-f9f537716ab7.PNG"/>

### 3.0 Creating the Model Class

3.1 Right click the Models Folder -> Add -> Class... In this example, we name our class model as "UserDetailCredentials.cs" and click "Add"

<img src="https://cloud.githubusercontent.com/assets/10904957/23104891/4885be28-f711-11e6-9764-ebeee99b7199.PNG"/>

3.2 Add the sample properties for our login details

{% highlight ruby linenos %}
public class UserDetailCredentials
{
   [JsonProperty("id")]
   public int Id { get; set; }
   [JsonProperty("username")]
   public string Username { get; set; }
   [JsonProperty("password")]
   public string Password { get; set; }
   [JsonProperty("name")]
   public string Name { get; set; }
}
{% endhighlight %}

3.3 Build the solution (Ctrl+Shift+B)

### 4.0 Adding our code snippet in our web service api controller

4.1 Go to your web service api controller and paste this following code snippet. In this code, we create a new HTTP Get Request with a custom route request of api/UserCredentials/username={username}/password={password}

{% highlight ruby linenos %}
[HttpGet]
[Route("api/UserCredentials/username={username}/password={password}")]
public async Task<IHttpActionResult> UserDetailsLogin(string username, string password)
{
   UserDetailCredentials login =
                await db.UserDetailCredentials.Where(x => x.Username == username && x.Password == password).SingleOrDefaultAsync();
   if (login == null)
   {
      return NotFound();
   }
   return Ok(login);
}
{% endhighlight %}

### 5.0 Creating the Rest Client class

5.1 Right click the RestAPIClient Folder -> Add -> Class... In this example, we name our class model as "RestClient.cs" and click "Add"

<img src="https://cloud.githubusercontent.com/assets/10904957/23104958/71a5fb14-f712-11e6-8aff-b7d8ca7a822f.PNG"/>

5.2 Inside the RestClient class, include this namespace

{% highlight ruby linenos %}
using System.Net.Http;
{% endhighlight %}

5.3 And paste this code snippet that I created.

{% highlight ruby linenos %}
public class RestClient<T>
{
   private const string MainWebServiceUrl = "http://MainHost/"; // Put your main host url here
   private const string LoginWebServiceUrl = MainWebServiceUrl + "api/UserCredentials/"; // put your api extension url/uri here

   // This code matches the HTTP Request that we included in our api controller
   public async Task<bool> checkLogin(string username, string password)
   {
      var httpClient = new HttpClient();
      // http://MainHost/api/UserCredentials/username=foo/password=foo. The api value and response value should match in order to return a true status code. 
      var response = await httpClient.GetAsync(LoginWebServiceUrl + "username=" + username + "/" + "password=" + password);

      return response.IsSuccessStatusCode; // return either true or false
   }
}
{% endhighlight %}

### 6.0 Creating the Portable service class

6.1 Right click the ServicesHandler Folder -> Add -> Class... In this example, we name our class model as "LoginService.cs" and click "Add"

<img src="https://cloud.githubusercontent.com/assets/10904957/23105221/3db31176-f716-11e6-999c-0733d2681059.PNG"/>

6.2 Inside the LoginService class, paste this following code snippet.

{% highlight ruby linenos %}
// fetch the RestClient<T>
RestClient<UserDetailCredentials> _restClient = new RestClient<UserDetailCredentials>();

// Boolean function with the following parameters of username & password.
public async Task<bool> CheckLoginIfExists(string username, string password)
{
   var check = await _restClient.checkLogin(username, password);

   return check;
}
{% endhighlight %}

### 7.0 Creating our Xaml View Page

7.1 Right click the Views Folder -> Add -> New Item... -> Visual C# -> Cross-Platform and choose Forms Xaml Page. In this example, we name our xaml page as "LoginPage.xaml" and click "Add"

<img src="https://cloud.githubusercontent.com/assets/10904957/23105221/3db31176-f716-11e6-999c-0733d2681059.PNG"/>

7.2 Modify the xaml page. Here I created a basic sample design of the login.

{% highlight ruby linenos %}
<StackLayout Padding="30"
             VerticalOptions="Start">
   <Label Text="Username"
          HorizontalOptions="Center"/>
   <Entry Text=""
          x:Name="EntryUsername"/>
   <Label Text="Password"
          HorizontalOptions="Center"/>
   <Entry Text=""
          x:Name="EntryPassword"
          IsPassword="True"/>
   <Button Text="Login"
           TextColor="White"
           BackgroundColor="#22A7F0"
           x:Name="ButtonLogin"/>
</StackLayout>
{% endhighlight %}

<img src="https://cloud.githubusercontent.com/assets/10904957/23105568/3ef023b6-f71c-11e6-8927-7a4f35c9a814.PNG"/>

7.3 Adding clicked xaml clicked even handler (Clicked="ButtonLogin_Clicked") in the button login with a name identifier of x:Name="ButtonLogin" 

{% highlight ruby linenos %}
<Button Text="Login"
        TextColor="White"
        BackgroundColor="#22A7F0"
        x:Name="ButtonLogin"
        Clicked="ButtonLogin_Clicked"/>
{% endhighlight %}

Once the Xaml event has been created, automatically our .cs event handler will be created too.

{% highlight ruby linenos %}
private void ButtonLogin_Clicked(object sender, EventArgs e)
{
    // code goes here
}
{% endhighlight %}

### 8.0 Calling the rest client to validate the login

8.1 Change the event handler to async by adding "async" before the void and "await" inside the event handler.

What does "async" and "await" do, is that it will optimize the waiting thread of the request.

{% highlight ruby linenos %}
private async void ButtonLogin_Clicked(object sender, EventArgs e)
{
    // await code goes here
}
{% endhighlight %}

8.2 Reference the login service to the login page class.

8.3 Add the code snippet inside the login event

{% highlight ruby linenos %}
private async void ButtonLogin_Clicked(object sender, EventArgs e)
{
   LoginService services = new LoginService();
   var getLoginDetails = await services.CheckLoginIfExists(EntryUsername.Text, EntryPassword.Text);

   if (getLoginDetails)
   {
      await DisplayAlert("Login success", "You are login", "Okay", "Cancel");
   }
   else
   {
      await DisplayAlert("Login failed", "Username or Password is incorrect or not exists", "Okay", "Cancel");
   }
}
{% endhighlight %}

### 9.0 Running the app

9.1 Lastly, change your App.cs and target the MainPage as equal to our login page

{% highlight ruby linenos %}
public App()
{
   MainPage = new LoginPage();
}
{% endhighlight %}

9.2 Run the app

<a href="https://github.com/deanilvincent/Xamarin-Forms-Simple-Login-With-Rest-API">Here's the Github Link For This Post</a>

Give me a ★ :D

Thank you for reading. I hope you've learned from me. Feel to comment below!
