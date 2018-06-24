---
layout: post
type: blog
title:  "Publish & Host ASP.NET Core App on Windows Services using Self-Contained Application for Windows"
date:   2018-06-23 05:05:33
snippet: Today I'm going to teach how to publish your ASP.NET Core 2.1 app on Windows Service using self-contained application for windows. 
---

If you haven't tried using ASP.NET Core, I have another blog here entitled: <a href="https://deanilvincent.github.io/2018/01/12/steps-in-creating-simple-but-dynamic-powerful-web-app-using-asp-net-core-mvc-connected-to-a-database/">Steps in Creating Simple But Dynamic Powerful Web App using ASP.NET Core MVC connected to a Database</a>. Feel free to read that blog post. 

Normally, in order to publish and host your ASP.NET application on Windows Operation System(OS), you would need to host it on IIS (Internet Information Services). This is the common way to access your published web application.

But the good thing about ASP.NET Core is, you can directly host it on Windows Services without using IIS.

### FTF (First Things First)

It's important that you have a good environment with installed:

1. Visual Studio Community (Free) or Visual Studio Code (FREE) for IDE. Download <a href="https://www.visualstudio.com/downloads/">here</a> (Choose your OS platform).
2. Installed .NET SDK. Download <a href="https://www.microsoft.com/net/learn/get-started/windows">here</a> (Choose your OS platform)
3. Installed .NET Core 2.0 or 2.1 SDK. Download <a href="https://www.microsoft.com/net/download/windows">here</a> (Choose your OS platform)

### Overview of what we're going to create:

<strong>Target Output:</strong> "Publish & Host ASP.NET Core App running on Windows Services Manager"

<strong>Aim:</strong> After you finish these simple steps, you will be able to alternatively use Windows Services to host your ASP.NET Core app.

If you're ready, let's get started!

## Setting Up the Environment

### 1.0 Create Your ASP.NET Core Project
1.1 Open your Visual Studio then choose "File -> New -> Project" or "Ctrl+Shift+N"

1.2 Choose "Installed -> Visual C# -> Web" then look for "ASP.NET Core Web Application" and name your application.

1.3 When the white dialog box appears, choose the target ASP.NET Core version. For this demo, I'm using ASP.NET Core 2.1 & Web Application (Model-View-Controller) (but it doesn't matter what kind of app template you want to choose). click "OK"

<img src="https://user-images.githubusercontent.com/10904957/41809015-13be415e-7719-11e8-875c-7085c953a9e0.PNG" />

### 2.0 Edit the Project .csproj to target Self-Contained App Runtime Identifier for Windows

2.1 Right click your project and choose "Edit 'YourProjectName'.csproj

2.2 Inside the file, Add this code snippet below the `<TargetFramework>...</TargetFramework>`,

{{highlight ruby linenos}}
      <RuntimeIdentifier>win10-x64</RuntimeIdentifier>
      // If you're targeting to windows 7 or any other windows version, change it to win7 or win8
{{endhighlight}}

Similar to this image

<img src="https://user-images.githubusercontent.com/10904957/41809125-98502d00-771a-11e8-84b7-0b5cc30025c1.PNG" />

2.3 Save the file.

Additional Info: This means, that we're targetting to generate a publish output for windows only. If you want to target multiple runtime identifiers you can do the example code snippet below:
{{highlight ruby linenos}}
      <RuntimeIdentifier>win10-x64;ubuntu.16.10-x64</RuntimeIdentifier>
      // We are targetting both windows and ubuntu.
{{endhighlight}}

### 3.0 Install Nuget Package

3.1 Open nuget package manager and search for `Microsoft.AspNetCore.Hosting.WindowsServices`

3.1 Choose what version of Microsoft.AspNetCore.Hosting.WindowsServices <a href="https://www.nuget.org/packages/Microsoft.AspNetCore.Hosting.WindowsServices/">(Nuget.org)</a>, then click "Install"

<img src="https://user-images.githubusercontent.com/10904957/41809718-d939fb48-7724-11e8-9234-239905905248.PNG"/>

### 4.0 Modify Program.cs

4.1 Open the Program.cs of the project and modify the `public static void Main(string[] args){...}` method and paste the following codes below:

{{highlight ruby linenos}}
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Hosting.WindowsServices;
    using System.Diagnostics;
    ... // add these namespaces above

    public static void Main(string[] args){
        var pathToExe = Process.GetCurrentProcess().MainModule.FileName;
        var pathToContentRoot = Path.GetDirectoryName(pathToExe);

        var host = WebHost.CreateDefaultBuilder(args)
            .UseContentRoot(pathToContentRoot)
            .UseStartup<Startup>()
            .UseUrls("http://*:4312") // we're targeting port 4312 but you can choose different available port that you want
            .Build();

        host.RunAsService();
    }
{{endhighlight}}

4.2 Save the file.

### 5.0 Publishing the project

5.1 Open the command line or powershell and target your project location.
Similar to the image below:
<img src="https://user-images.githubusercontent.com/10904957/41809723-ebdc796a-7724-11e8-9ee0-1e35013e13c1.PNG" />

5.2 Enter this code snippet to publish your app targeting windows runtime.

`dotnet publish --configuration Release -r win10-x64 --output C:\MyAppServicePath` and click enter.

<img src="https://user-images.githubusercontent.com/10904957/41809719-d96918ba-7724-11e8-9ff2-3ea6c4d9b983.PNG"/>

Look for the path `C:\MyAppServicePath` and double check if it successfully generated a self-contained app. You'll see the `.exe` & `.dll` of your publish output. This means, you are now ready to run that `.exe` in Windows Services Manager.

<img src="https://user-images.githubusercontent.com/10904957/41809769-b6863354-7725-11e8-8b04-b4aa6b9b83bb.PNG" />

### 6.0 Create Service of your Application

6.1 Open a command line or powershell and "Run as Administrator."

6.2 Enter this command

`sc CREATE NameOfYourService binPath="String_Path_of_the_exe_app"`

<img src="https://user-images.githubusercontent.com/10904957/41809820-84b297ae-7726-11e8-8afe-c2b9728272cf.PNG" />

### 7.0 Check your Created Service on Windows Services Manager

7.1 Open Windows Services Manager and look for the service name you've created.

<img src="https://user-images.githubusercontent.com/10904957/41809863-4d6ea28c-7727-11e8-95bf-bad07293e549.PNG"/>

By default, the service is not yet started.

### 8.0 Start the service

8.1 To the service, just simply enter this command:

`sc START NameOfYourService`

<img src="https://user-images.githubusercontent.com/10904957/41809894-af498a1c-7727-11e8-9b22-6d1f89a14a76.PNG" />

Other available service commands are:

`sc query NameOfYourService` - to view the status of the service.
`sc stop NameOfYourService` - to stop the service.
`sc delete NameOfYourService` - to delete the service.

### 9.0 Running your App 

9.1 To run the application, simply enter the port you've entered in your `Program.cs` for this project, we're using `localhost:4312`.

<img src="https://user-images.githubusercontent.com/10904957/41809954-8e53a6a2-7728-11e8-8118-93a1130083c4.PNG" />

Voila! we host our published ASP.NET Core App without using IIS but alternatively, we're using Windows Services.

If you have some questions or comments, please drop it below 👇 :)
