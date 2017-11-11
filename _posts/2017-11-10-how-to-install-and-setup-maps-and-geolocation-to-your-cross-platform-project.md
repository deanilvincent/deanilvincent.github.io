---
layout: post
type: blog
title:  "How to Install and Setup Maps and Geolocation to your Cross Platform Project"
date:   2017-11-10 09:10:33
snippet: This blog post will help you to install and setup maps and geolocation to your cross platform project. 
---

<img src="https://user-images.githubusercontent.com/10904957/32660163-b878c138-c65c-11e7-8241-3494e874ef3f.jpeg" alt-image="Mark Deanil Vicente Blog Map Image" />

In you're planning to implement geolocation and maps to your cross platform project, it is important that you install packages for maps and geolocation and then setup your project first in order to consume maps and geolocation integration properly. This simple blog post will help you how to install and configure your Android, IOS and UWP project.

### Just to give you an idea

Each mobile platform has its own geolocation and map feature. 

- Android has <a href="https://developers.google.com/maps/">Google Maps</a>
- IOS has <a href="https://www.apple.com/ios/maps/">Apple Maps</a>
- UWP or Universal Windows Platform has <a href="https://www.microsoft.com/en-us/maps/choose-your-bing-maps-api">Bing Maps</a>

These maps offer API feature wherein we can consume the information to different platforms and devices. 

### What do we need to do first?
It's important to download and install the packages for maps and geolocation first that support xamarin forms.

### Why we need to setup our projects?

Here are some of the important keys why we need to setup the project to check if the device has:

1. Internet connection.
2. Allow location.
3. Network connection.
4. Api map key.

### Overview of what we're going to create:

<strong>Target Output:</strong> "Cross Platform Project Ready to Consume Geolocation and Maps in Every Platform Project"

<strong>Aim:</strong> After you finish this simple steps, you are now ready to call the geolocation and maps in your xamarin forms project.

If you're ready, let's get started!

## Installing Maps and Geolocation

### 1.0 Search and Install the Maps and Geolocation Package
1.1 Right click the "Solution" and choose "Manage NuGet Packages for Solution..."

1.2 Search for "Geolocator" and install the package to all project.

<img src="https://user-images.githubusercontent.com/10904957/32690363-85f9c994-c730-11e7-82ae-f6da6842aac7.PNG">

<i>(Project <a href="https://github.com/jamesmontemagno/GeolocatorPlugin">Link</a>)</i>

1.3 Search for "Xamarin.Forms.Maps" and install the package to all project.

<img src="https://user-images.githubusercontent.com/10904957/32690362-85cccc64-c730-11e7-9fd2-7fd185892596.PNG">

## Setting Up the Environment

### - For Android -

### 1.0 Generate Google Maps Api Key

1.1 Go to <a href="https://console.cloud.google.com">Google Cloud Console</a> and login with your google account.

1.2 In the search box of your console, search "Google Maps Android API" and click it.

1.3 Click enable and it will redirect you to a new page.

<img src="https://user-images.githubusercontent.com/10904957/32661766-205a16de-c663-11e7-9a4c-7a636693def5.png">

1.4 Click the button "Create Credentials" on the upper right corner.

<img src="https://user-images.githubusercontent.com/10904957/32661880-7cf6db2a-c663-11e7-83e5-eb21aa857e00.png">

1.5 And simply click the button "What credentials do I need?" since the Google Maps Android API is already selected by default of the page.

<img src="https://user-images.githubusercontent.com/10904957/32661958-ccb7df38-c663-11e7-9e6a-de4a1bbe4dfe.png">

1.6 After you finish clicking the button, you'll get your generated API key.

1.7 Copy the generated api key.

Optional: If you want to restrict the use of your api key for specific device, you can choose the "Restrict Key."

### 2.0 Pasting the Key inside the Android Project

2.1 Go to you android project.

2.2 Expand the Properties and look for AndroidManifest.xml.

2.3 Paste this code inside the "< application android:label="YourProjectName.Android" >...</ application >"

{% highlight ruby linenos %}
<application android:label="YourProjectName.Android">
    <meta-data android:name="com.google.android.geo.API_KEY" android:value="PASTEYOURGENERATEDKEYHERE"/>
</application>
{% endhighlight %}

### 3.0 Checking things inside the Android Properties

3.1 Go to "Android Properties" and choose "Android Manifest"

Check the following:
- ACCESS_COARSE_LOCATION
- ACCESS_FINE_LOCATION
- ACCESS_LOCATION_EXTRA_COMMANDS
- ACCESS_MOCK_LOCATION
- ACCESS_NETWORK_STATE
- ACCESS_WIFI_STATE
- INTERNET

3.2 Ctrl+S to save the changes.

### 4.0 Add code snippet inside the MainActivity.cs

4.1 Locate and open the MainActivity.cs file

4.2 Paste this above the "LoadApplication(new App());"

{% highlight ruby linenos %}
global::Xamarin.FormsMaps.Init(this, bundle);
{% endhighlight %}

Reminder: Running Google Maps in Android Emulator requires "Google Play Services." Download Gapps Zip file <a href="http://www.teamandroid.com/gapps/">here</a> and drag-and-drop to your running android emulator.

### - For IOS -

### 1.0 Updating the Info.plist
1.1 Go to iOS Project.

1.2 Locate the Info.plist and right click then choose "Open With"...

1.3 Choose editor type for xml.

1.4 Paste this code after the "< dict >"
{% highlight ruby linenos %}
<key>NSLocationAlwaysUsageDescription</key>
    <string>Can we use your location</string>
<key>NSLocationWhenInUseUsageDescription</key>
    <string>We are using your location</string>
{% endhighlight %}

1.4 Save the file.

### 2.0 Updating the AppDelegate.cs

2.1 Locate the file "AppDelegate.cs"

2.2 Paste this above LoadApplication(new App());

{% highlight ruby linenos %}
global::Xamarin.FormsMaps.Init();  
{% endhighlight %}

2.3 Save the file.

### - For UWP (Universal Windows Platform) -

### 1.0 Generate Bing Maps Api Key

1.1 Go to <a href="https://www.bingmapsportal.com/">Bing Maps Portal</a> and sign in with you microsoft account.

1.2 After you successfully log in, choose the "My account" -> "My Keys"

1.3 Click the "here" to create a new key

<img src="https://user-images.githubusercontent.com/10904957/32685519-f4bdbf06-c6cd-11e7-885c-1d83b33ba9db.png">

1.4 Input the application name

<img src="https://user-images.githubusercontent.com/10904957/32685536-68c91648-c6ce-11e7-8e1a-417575beb839.png">

Make sure to choose "Universal Windows App" but you can choose different Application type depending on your needs.

1.5 And lastly, click the button "Create" to finish generating the key.

When you're done, the details of your bing map api will be shown below.

<img src="https://user-images.githubusercontent.com/10904957/32685571-20e74812-c6cf-11e7-9dcb-9e7e3f39f398.png">

### 2.0 Updating the MainPage.xaml.cs

2.1 Go to UWP project.

2.2 Paste this inside the constructor of MainPage.xaml.cs and after the "this.InitializeComponent();"

{% highlight ruby linenos %}
global::Xamarin.FormsMaps.Init("PASTEHERETHEAPIKEYYOUGENERATED");
{% endhighlight %}

2.3 Save the file.

### 3.0 Updating the Package.appxmanifest

3.1 Locate and click the Package.appxmanifest file and choose "Capabilities"

3.2 Check the following:

- Internet
- Location

3.3 Save the file.

Now you're done installing and configuring the files per project. The next step is do the codings to fully implement maps and geolocation to your application.

If you have some questions or comments, please drop it below. :)
