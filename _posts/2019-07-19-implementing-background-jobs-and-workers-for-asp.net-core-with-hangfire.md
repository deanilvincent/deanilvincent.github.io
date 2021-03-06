---
layout: post
type: blog
title: 'Implementing Background Jobs & Workers for ASP.NET Core with Hangfire'
date: 2019-07-19 10:56:33
snippet: In this blog tutorial, you'll learn how to implement background jobs & workers for your ASP.NET Core app.
---

In one of my projects, my boss asked me a favor to create an automatic sending of reports to his email. Since majority of my web projects are made using ASP.NET Core, fortunately, there is a package available out there that offers background process or workers without the windows service or separate process running. This cool package is <a href="https://www.hangfire.io/">Hangfire.</a> Don't worry folks, it's "Open and free for commercial use" (Although it offers plans like Startup, Bussiness & Enterprise. read more <a href="https://www.hangfire.io/pricing/">here</a>).

#### Some of its cool features are:

- Simple
- Reliable
- Efficient
- Persistent
- Distributed
- Self-maintainable
- Transparent
- Extensible
- and lastly, Open source

Source: <a href="https://www.hangfire.io/">hangfire.io</a>

So let's implement this cool package in our ASP.NET Core Web App.

### FTF (First Things First)

Make sure you have a ASP.NET Core project solution (MVC or API) where we can install this package. You can use your existing project if you want but I recommend you create a new fresh sample project for this demo. If you're ready, let's get started!

### 1.0 Installing the Package

1.1 Open the Nuget Package Manager and search for the package `Hangfire` and click install. So here we have a version 1.7.5

<img src="https://user-images.githubusercontent.com/10904957/61585630-faa1e680-ab92-11e9-80ef-11fd8f94adac.JPG" />

Optionally, you can use the Nuget Package Manager console and type in `Install-Package HangFire -Version 1.7.5`

1.2 Copy the dist folder content and move it in a folder in Drive C:

In my example, I created a folder with a name "myvueapp" in the path of C:\inetpub\wwwroot and copy and paste all of the files and folders from the dist folder.
<img src="https://user-images.githubusercontent.com/10904957/61219506-f1ee8200-a746-11e9-9638-34941115123e.JPG" />

### 2.0 Create web.config file

2.1 Create a web.config file inside the "myvueapp" and paste these codes:

{{highlight ruby linenos}}
<?xml version="1.0" encoding="utf-8"?>
<configuration>
<system.webServer>
<rewrite>
<rules>
<rule name="Handle History Mode and custom 404/500" stopProcessing="true">
<match url="(.*)" />
<conditions logicalGrouping="MatchAll">
<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
</conditions>
<action type="Rewrite" url="/" />
</rule>
</rules>
</rewrite>
<httpErrors>
<remove statusCode="404" subStatusCode="-1" />
<remove statusCode="500" subStatusCode="-1" />
<error statusCode="404" path="/survey/notfound" responseMode="ExecuteURL" />
<error statusCode="500" path="/survey/error" responseMode="ExecuteURL" />
</httpErrors>
<modules runAllManagedModulesForAllRequests="true"/>
</system.webServer>
</configuration>
{{endhighlight}}

2.2 Save the file.

### 3.0 Create a website on IIS

3.1 Open the IIS app and create a new website under the "Sites" option and name it whatever you prefer. In my example, I name it as "myvuewebsite". Locate the path of "myvueapp" and specify the specific port that you want.

<img src="https://user-images.githubusercontent.com/10904957/61220167-552ce400-a748-11e9-8369-24a99894bbdd.JPG"/>

3.2 Click "Ok" when you are done.

### 4.0 Running the app

4.1 On the right option, you will find the "Browse ..." with a port number. Click and it will open the default browser.

<img src="https://user-images.githubusercontent.com/10904957/61220385-c9678780-a748-11e9-9ec5-785b2ef493e1.JPG" />

<img src="https://user-images.githubusercontent.com/10904957/61220527-12b7d700-a749-11e9-9318-69bac3d202c8.JPG">

Cool! Now you have Vue.JS app running on IIS.

If you have some questions or comments, please drop it below 👇 :)
