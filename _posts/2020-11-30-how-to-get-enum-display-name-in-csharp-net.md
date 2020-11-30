---
layout: post
type: blog
title:  "How to get Enum Display Name in C# .NET"
date:   2020-11-30 02:56:33
snippet: In this blog, I'll show you a basic extension method that you can use to get the display name of your enum.
---

In this blog, I'll show you a basic extension method that you can use to get the display name of your enum.

### Enum Overview

In our sample enum file, we created `TransactionStatus` where it has enum values and ids. We also used the `using System.ComponentModel.DataAnnotations` so we can use the attribute `[Display(Name = "")]`

{{highlight ruby linenos}}
    using System.ComponentModel.DataAnnotations;

    namespace ConsoleApp {
        public enum TransactionStatus
        {
                [Display(Name = "Pending")]
                Pending = 0,
                [Display(Name = "In Progress")]
                InProgress = 1,
                [Display(Name = "Completed")]
                Completed = 2,
                [Display(Name = "Cancelled")]
                Cancelled = 3,
                [Display(Name = "For Approval")]
                ForApproval = 4
        }
    }
{{endhighlight}}

### Extension method
After we create our enum, we can now proceed in creating our extension method. To quick review about extension method, basically, extension methods enable you to "add" methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type. You can also create different extension methods for string, date and other types depending on your requirements. Some of the advantages in using extension methods, it's simpler and makes your code much more cleaner. <a href="https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods" target="_blank">Read more from Microsoft Doc</a>

So let's create our extension method.

{{highlight ruby linenos}}

    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Reflection;

    namespace ConsoleApp
    {
        public static class EnumExtensions
        {
            public static string GetDisplayName(this Enum enumValue)
            {
                return enumValue.GetType()
                    .GetMember(enumValue.ToString())
                    .First()
                    .GetCustomAttribute<DisplayAttribute>()
                    ?.GetName();
            }
        }
    }
{{endhighlight}}

### Sample Usage
Let's try our extension method.

{{highlight ruby linenos}}

    var status = TransactionStatus.ForApproval;
    status.GetDisplayName();

{{endhighlight}}

Then it will display `For Approval`.


<a href="https://github.com/deanilvincent/EnumSampleCsharpConsoleApp" target="_blank">Repo link</a>

If you have some questions or comments, please drop it below 👇 :)
