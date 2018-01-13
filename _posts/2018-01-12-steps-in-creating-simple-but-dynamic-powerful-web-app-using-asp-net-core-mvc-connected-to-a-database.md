---
layout: post
type: blog
title:  "Steps in Creating Simple But Dynamic Powerful Web App using ASP.NET Core MVC connected to a Database"
date:   2018-01-12 11:33:33
snippet: This blog post will help you to create a simple but dynamic powerful web app powered by ASP.NET Core. 
---

### What is ASP.NET Core?

"ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-based, Internet-connected applications." - <a href="https://docs.microsoft.com/en-us/aspnet/core/">Intro to ASP.NET Core</a>

### Just to give you an idea

On June 26, 2016, Microsoft introduced a new way in building small to enterprise powerful web app. This is "ASP.NET Core." Hearing ASP.NET is not new for most developers. If you've been developing web app for so long, I'm sure you already heard about the ASP.NET. Just to give you a history tip, ASP.NET was first released in January 2002 with it's .Net Framework version 1.0. For the past decade and half, ASP.NET evolved until it reached the version 4.6 and 5 that turned to dead version and renamed to ASP.NET Core 1.0.

### Why should I choose ASP.NET Core?

As you can notice, ASP.NET doesn't stop in involving and updating. It has been here for so long and the team in Microsoft who handles this is so busy bringing every developer a more wider scope and range. 

Here are some cool benefits you can get in using ASP.NET Core:

<img src="https://user-images.githubusercontent.com/10904957/34781872-f8de6d92-f661-11e7-99d3-94d5ad33cb83.png" />

<i><a href="https://docs.microsoft.com/en-us/aspnet/core/">Image Ref.</a><i>

I already introduced to you what is ASP.NET Core. If you're ready, let's get started!

### FTF (First Things First)

It's important that you have a good environment with installed:

1. Visual Studio Community (Free) or Visual Studio Code (FREE) for IDE. Download <a href="https://www.visualstudio.com/downloads/">here</a> (Choose your OS platform).
2. Installed .NET SDK. Download <a href="https://www.microsoft.com/net/learn/get-started/windows">here</a> (Choose your OS platform)
3. Git. (Optional) Download <a href="https://git-scm.com/downloads">here</a> (Choose your OS platform)
4. SQL Server 2017 Express Edition (FREE with 10 GB Database Storage) or any other server. Download SQL Server here <a href="https://www.microsoft.com/en-us/sql-server/sql-server-editions-express">here</a>

### Overview of what we're going to create:

<strong>Target Output:</strong> "ASP.NET Core App connected to Database"

<strong>Aim:</strong> After you finish this simple steps, you are already know how to create your first ASP.NET Core Web App connected to a MS SQL Server database.

If you're ready, let's get started!

## Setting Up the Environment

### 1.0 Create Your ASP.NET Core MVC Project
1.1 Open your Visual Studio then choose "File -> New -> Project" or "Ctrl+Shift+N"

1.2 Choose "Installed -> Visual C# -> Web" then look for "ASP.NET Core Web Application" and name your application.

1.3 When the white dialog box appears, choose "Web Application (Model-View-Controller) and click "Okay"

<img src="https://user-images.githubusercontent.com/10904957/34873753-4f953088-f7d1-11e7-9a3d-decf0786baf7.PNG" />

In the image, 1.) Make sure it's .NET Core and 2.) Make sure you use the stable version of ASP.NET Core.

You can run the created project by clicking "IIS Express" or by simply clicking "F5"

### 2.0 Edit the Project .csproj 

2.1 Right click your project and choose "Edit 'YourProjectName'.csproj

<img src="https://user-images.githubusercontent.com/10904957/34874006-4678e89a-f7d2-11e7-8c21-21bbea6cce37.png" />

2.2 Below the <DotNetCliToolReference ... /> Add this code snippet,

{{highlight ruby linenos}}
`<DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.0" />`
{{endhighlight}}

Similar to this image

<img src="https://user-images.githubusercontent.com/10904957/34874184-ef9fbbec-f7d2-11e7-9122-300211a5e70e.PNG" />

We include this DotNeCliToolReference because we'll rely on git bash, or powershell or cmd in our code first entity commands. This is also a best practice as far as I know.

2.3 Save the file.

### 3.0 Create Your Model Class 

3.1 Right click the "Model" folder, choose "Add -> Class..." then name it, in our example, it's "Students" and click "Add"

Our Model class "Students" represents our table in mind where it has different properties like string, int etc.. Don't get confused, model is just a class. 

3.2 Add these following properties inside the Students class:

{{highlight ruby linenos}}
    public int Id { get; set; } // this represents our primary key in the table that we're going to migrate.
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Section { get; set; }
{{endhighlight}}

3.3 Save the File.

### 4.0 Create Controller and Generate Views using Scaffolding

4.1 Right click the "Controllers" folder, choose "Add -> Controller..." then choose "MVC Controller with views, using <a href="https://docs.microsoft.com/en-us/aspnet/entity-framework">Entity Framework</a>" and click "Add"

<img src="https://user-images.githubusercontent.com/10904957/34874819-87c1aa82-f7d5-11e7-8c50-9eb2e546b59c.PNG" />

Similar to the image above.

4.2 When the white dialog appears, choose the class name you've created which is "Students"

4.3 Since we haven't created yet the our Data context class, simply click the "+" and then click "Add" (You can name your Db Context class like the image below)

<img src="https://user-images.githubusercontent.com/10904957/34874919-ff948a02-f7d5-11e7-9b6a-e5139961c887.PNG" />

4.4 When you're done, click the "Add" 

Folders and files were generated in just a seconds.

<img src="https://user-images.githubusercontent.com/10904957/34875458-48c3b3fe-f7d8-11e7-9585-9f7b2b51719b.PNG" />

This is the power of Scaffolding. It generates different files and folders that are connected with each other.

You can re-view each file and folder that are created.

### 5.0 Establish Database Connection inside the Db Context Class file.

5.1 Open your DbContext file, and put this code snippet

{{highlight ruby linenos}}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=YOUR_HOST;Database=YOUR_DATABASE;User id=YOUR_USERID;Password=YOUR_PASSWORD;Integrated Security=false;MultipleActiveResultSets=true");
    }
{{endhighlight}}

<img src="https://user-images.githubusercontent.com/10904957/34875740-7c4411fa-f7d9-11e7-91d7-00fcdd5d2ec0.PNG" />

Similar to this image above.

### 6.0 Update Startup.cs

6.1 Look for Startup.cs in your project and open it.

6.2 Look for this codes,

{{highlight ruby linenos}}
    services.AddDbContext<MyDbContext>(options=>options.UseSqlServer(Configuration.GetConnectionString("MyDbContext)));
{{endhighlight}}

and replace it with this,

{{highlight ruby linenos}}
    services.AddDbContext<MyDbContext>();
{{endhighlight}}

Since our connection string was created in our db context.

### 7.0 Locate your Project using Command Line

7.1 Open your installed git bash by searching in our windows "Git Bash" (You can use Windows PowerShell)

7.2 Locate your project with this following commands until you reach the main project files.

{{highlight ruby linenos}}
    "cd" for change directory
    "ls" for viewing as lists
{{endhighlight}}

<img src="https://user-images.githubusercontent.com/10904957/34876254-b1037c80-f7db-11e7-8f93-27029e595bb0.PNG" />

### 8.0 Prepare Your Model Class for Migration

8.1 Enter this code snippet (below) and hit enter.

{{highlight ruby linenos}}
    dotnet ef migrations add initialcreate
{{endhighlight}}

This will create a snapshot file ready for migration. You can use different filename in the "initialcreate" just avoid spaces and other illegal characters.

After you hit enter, you'll notice it created a folder with a name of "Migrations" and files with with a name of ..._initialcreate.cs and also MyDbContextModelSnapShot.cs

<img src="https://user-images.githubusercontent.com/10904957/34876484-b52527ea-f7dc-11e7-8e64-6a3ea994595d.PNG" />

If you open the ..._initialcreate.cs file, you'll notice this codes.

<img src="https://user-images.githubusercontent.com/10904957/34876540-ffe481cc-f7dc-11e7-913b-b8aac2522e42.PNG" />

Basically, what it saying, "Hey, I'm going to CreateTable with a name of "Students" this table has a columns of Id which is nullable isn't allowed (false) and IdentityColumn(Primary Key and Auto Increment). I'm going to create other columns too, the Firstname, Lastname and Section that allows string values.

### 9.0 Update Your Database

9.1 Go back to your command line then enter this code snippet (below) and hit enter.

{{highlight ruby linenos}}
    dotnet ef database update 
{{endhighlight}}

This will update your database. Since you haven't created yetyour database in Sql Server, it will automatically create together with your table and columns.

After you received a "Done." message, everything works fine.

### 10.0 Checking your Sql Server

10.1 Open your Sql Server and check your automatically migrated database.

<img src="https://user-images.githubusercontent.com/10904957/34876904-a9dcb180-f7de-11e7-9e52-797d7ca8cc57.PNG" />

### 11.0 Running your App 

11.1 Simply run your app and navigate to "locahost:yourportassignedhere/Students/" and Create, Edit or even Delete information.

<img src="https://user-images.githubusercontent.com/10904957/34877039-42a54882-f7df-11e7-9d0e-ec3746a63acc.PNG" />

<img src="https://user-images.githubusercontent.com/10904957/34877040-42d7b452-f7df-11e7-8395-7a42a273f418.PNG" />

Voila! you're done creating your ASP.NET Core Web App connected to a Database.

If you have some questions or comments, please drop it below 👇 :)
