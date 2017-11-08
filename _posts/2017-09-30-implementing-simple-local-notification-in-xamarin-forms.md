---
layout: post
type: blog
title:  "Implementing Simple Local Notification in Xamarin Forms"
date:   2017-09-30 08:01:33
snippet: In this blog post, I'm going to show you how to implement simple local notification in xamarin forms. 
---

<img src="https://user-images.githubusercontent.com/10904957/31042965-47e64472-a5e6-11e7-8b79-1a9c72153749.PNG" alt="Android and UWP Local Notifications - http://deanilvincent.github.io" />
(iOS photo will be posted soon)

We often forget a lot of things, from simple up to important things. But technologies like smart phones, really help us to get reminders or notifications. If you're a mobile developer and developing an application for your project, it's important to implement notifications so the user that uses your application get notified about updates or reminders.

### There are two common notifications in mobile that we're aware of. 

#### 1. Push Notifications
#### 2. Local Notifications

### How Push Notifications Work?
"Push notifications are delivered through platform-specific infrastructures called Platform Notification Systems (PNSes). They offer barebone push functionalities to delivery message to a device with a provided handle, and have no common interface. To send a notification to all customers across the iOS, Android, and Windows versions of an app, the developer must work with APNS (Apple Push Notification Service), FCM (Firebase Cloud Messaging), and WNS (Windows Notification Service), while batching the sends."
Read more: <a href="https://docs.microsoft.com/en-us/azure/notification-hubs/notification-hubs-push-notification-overview">Notification Hubs Push Notification Overview - by Microsoft Docs</a>

### Why Local Notifications?
By reading the definitions above about how push notification works in cross platform mobile app, your app must be registered to different notification services depending on what you're targetting. Since it's connected to different services or hubs, your app should be connected to the internet in order fetch the notification from the services.

In this demo, we're going to focus on implementing simple local notification that doesn't require any internet connection to work. The notification is only for each platform (Can be customized per platform).

### Overview of the simple application we're going to create:

<strong>Target Output:</strong> "Simple Xamarin Forms Application that Triggers a Notification When Button is Click"

<strong>Aim:</strong> After you finish reading and following the steps, you can implement simple local notification in your future apps.

If you're ready, let's get started!

## Setting Up the Environment

### 1.0 Creating Your Project (Steps for Beginners)

1.1 Open your Visual Studio with Xamarin Installed.

1.2 Choose File -> New -> Project... or simply use the shortcut key "Ctrl+Shift+N"

1.3 When the dialog box appears, Expand "Installed" -> "Visual C#" -> "Cross-Platform" and choose "Cross Platform App (Xamarin)" 

1.4 Create a name for your project. For this demo, we name our app as "SimpleLocalNofi" and click "OK"

1.5 When the white dialog box appears, make sure "Xamarin.Forms" and "Portable Class Library" are checked.

### 2.0 Install Local Notification Nuget Package
2.1 Right click the main project solution and choose "Manage Nuget Packages for Solution"

2.2 Look for package "Xam.Plugins.Notifier" by Ed Snider and James Montemagno

<img src="https://user-images.githubusercontent.com/10904957/31015674-e3fc7a36-a553-11e7-80a4-cff3f73b4789.PNG">

Package Description: 
The local notification plugin provides a simple, cross-platform way to show local notifications from within native mobile applications. Works with Xamarin.Android, Xamarin.iOS (Classic and Unified), Windows 8.1, Windows Phone 8.1 and Windows Phone Silverlight 8.1.
- License under <a href="https://github.com/edsnider/LocalNotificationsPlugin/blob/master/LICENSE">here</a>

<a href="https://github.com/edsnider/LocalNotificationsPlugin">(Github page)</a>

This package supports:
- Xamarin.iOS version iOS7+
- Xamarin.Android version API 10+
- Windows Phone (Silverlight) version 8.1+
- Windows Phone (WinRT) version 8.1+
- Windows Store (WinRT) version 8.1+
- Windows (UWP) version 10+
- Xamarin.Mac (Not yet supported)

2.3 Check all the projects and click "Install" (For this demo, we're using version 2.1.0)

<img src="https://user-images.githubusercontent.com/10904957/31015892-f67a45b6-a554-11e7-9bc0-9907a9026929.PNG">

### 3.0 Modify MainPage.xaml and MainPage.xaml.cs
3.1 Open MainPage.xaml and change the default label to button then add eventhandler.

{% highlight ruby linenos %}
<Button Text="Click to trigger notification" 
           VerticalOptions="Center" 
           HorizontalOptions="Center"
           Clicked="Button_Clicked"/>
{% endhighlight %}

3.2 Open MainPage.xaml.cs and locate the "Button_Clicked" eventhandler method and add this following codes inside the method.

{% highlight ruby linenos %}
// Add this namespace above
...
using Plugin.LocalNotifications;

{% endhighlight %}

{% highlight ruby linenos %}
private void Button_Clicked(object sender, EventArgs e)
{
    CrossLocalNotifications.Current.Show("Title","Body");
}
{% endhighlight %}

#### Additional information.

CrossLocalNotifications.Current is derived from namespace Plugin.LocalNotifications. We're using "Current" as the public get static property that implements ILocalNotifications. What this does it, it gets the current platform specific ILocalNotifications implementation.

"Show" is a void method that execute or show local notification.

The available arguments are:

{% highlight ruby linenos %}
string title // title of the notification
string body // message body of the notification
int id // id or unique identifier of the notification
DateTime time // date and time when to show the notification

// Example:
CrossLocalNotifications.Current.Show("Title", "Body", 3, DateTime.Now); // Notify right away
{% endhighlight %}

If you need to cancel specific notification by id, you can use this following syntax
{% highlight ruby linenos %}
CrossLocalNotifications.Current.Cancel(3); // Cancel notification by id
{% endhighlight %}

### 4.0 Run the app for testing

If you have some questions or comments, please drop it below. :)

Source code: https://github.com/deanilvincent/Xamarin-Forms-Simple-Local-Notification
