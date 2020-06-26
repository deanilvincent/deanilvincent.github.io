---
layout: post
type: blog
title:  "Seed Users & Roles in ASP.NET Core with Entity Framework (EF) Core"
date:   2020-06-24 07:25:33
snippet: Seeding of users & roles in ASP.NET Core with EF core made easy. In this blog, I'm going to show you how you can implement a basic seeding of users and roles for your ASP.NET Core app.
---

Users & roles seeding in an app is optional but it is one of the important tasks you should consider while building your application authentication. Instead of creating a data via your app form, using data seeding, you can directly populate data upon EF migration. This feature is called "Model seed data" or <a href="https://docs.microsoft.com/en-us/ef/core/modeling/data-seeding" target="_blank">"Data Seeding"</a> and it's out since EF Core 2.1. 

In this blog, we're going to use this feature to seed users & roles because we want our ASP.NET Core app to have its default user and role data.

### FTF (First Things First)

Make sure you already setup your ASP.NET Core app identity models and your database context (DbContext).
In this demo, I'm using ASP.NET Core 3.0 and it's ready for user and role seeding.

### Role Seeding
First, let's seed roles. Inside the `OnModelCreating` of your DbContext file, add this code.

{{highlight ruby linenos}}
    builder.Entity<Role>().HasData(new List<Role>
    {
        new Role {
            Id = 1, 
            Name = "Admin", 
            NormalizedName = "
            ADMIN"
        },
        new Role {
            Id = 2, 
            Name = "Staff", 
            NormalizedName = "STAFF"
        },
    });
{{endhighlight}}

`NormalizedName` must always be upper case.

### User & User Role Seeding 
After we create roles, then we can seed a user with a role attach to it. Place this code after the code from above.

{{highlight ruby linenos}}
    var hasher = new PasswordHasher<User>();
    builder.Entity<User>().HasData(
        new User {
            Id = 1, // primary key
            UserName = "admin",
            NormalizedUserName = "ADMIN",
            PasswordHash = hasher.HashPassword(null, "temporarypass"),
            IsActive = true
        },
        new User {
            Id = 2, // primary key
            UserName = "staff",
            NormalizedUserName = "STAFF",
            PasswordHash = hasher.HashPassword(null, "temporarypass"),
            IsActive = true
        }
    );

    builder.Entity<UserRole>().HasData(
        new UserRole
        {
            RoleId = 1, // for admin username
            UserId = 1  // for admin role
        },
        new UserRole
        {
            RoleId = 2, // for staff username
            UserId = 2  // for staff role
        }
    );
{{endhighlight}}

As you can see above, we called the `PasswordHasher` to generate an hash password of `temporarypass`.
We also called the `builder.Entity<UserRole>` to assign the specific user to a role.

### Do the migration

One you finish the steps above, you can now do the migrations and database update using your command line.

{{highlight ruby linenos}}
    dotnet ef migrations add MigrateUserAndRoleSeed
{{endhighlight}}

As you notice in the snapshot migration file, there's a `migrationBuilder.InsertData(...)` command based from the user and role that we added.

<img src="https://user-images.githubusercontent.com/10904957/69421756-d03c8180-0d5c-11ea-8f84-405327ba0096.PNG" alt="Mark Deanil Vicente User & Role Seed Data" width="100%">

Lastly, update the database.
{{highlight ruby linenos}}
    dotnet ef database update
{{endhighlight}}

<img src="https://user-images.githubusercontent.com/10904957/69421923-49d46f80-0d5d-11ea-8db9-b9f6186a834d.PNG" alt="Mark Deanil Vicente User & Role Seed Data" width="100%">

That's it. It's very simple to seed a users & roles in EF core!

If you have some questions or comments, please drop it below 👇 :)
