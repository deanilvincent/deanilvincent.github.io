---
layout: post
type: blog
title:  "Basic Understanding How Data Binding and MVVM works in Xamarin Forms"
date:   2017-06-03 00:33:33
snippet: This post will give you some insights how data binding and mvvm works in Xamarin Forms
---

Here are some simple insights about Data Binding and MVVM. If you already know about this topic or have heard about this before, I hope I could still contribute some ideas to you. If not, this basic representations will help you understand in a simplest manner. 

## Simple Understanding about Data Binding

### Data Binding,

  - Allow properties of two objects to be linked so that a change in one causes change in the other.
  - One of the most important markup extensions in Xamarin.Forms and in other xaml based development tools.
  - Is also a process that establishes a connection between the application UI and business logic. - <a href="https://msdn.microsoft.com/en-us/library/ms752347(v=vs.110).aspx">MSDN</a>

<img src="https://cloud.githubusercontent.com/assets/10904957/26749864/5dd10418-4847-11e7-97f0-329cdaec09d6.png"/>

In this image below, 

<img src="https://cloud.githubusercontent.com/assets/10904957/26749893/15068112-4848-11e7-85de-11db192e059e.png"/>

The Data Binding serves as the bridge between the "View or UI" and the "Object" 

"View or UI" so simply say, the "page" represents the binding target while the "Object" or we can say, the binding source.

Properties in Object represents,

{% highlight ruby linenos %}
string
int
bool
decimal
// and other C# property data types
{% endhighlight %}

Properties in Target represents available bindable ui elements.

In Xamarin Forms here are some of the common bindable ui elements or properties,

{% highlight ruby linenos %}
Text={Binding objectSource}
TextColor={Binding objectSource}
Command={Binding objectCommandSource}
ItemSource{Binding objectSource}
Content={Binding objectContent}
BackgroundColor={Binding objectSource}
Color={Binding objectSource}
// and much much more ...
{% endhighlight %}

The image below, shows a simple visualization in implementing data binding.

<img src="https://cloud.githubusercontent.com/assets/10904957/26750045/620b6e48-484b-11e7-8cf2-f683328f4882.png"/>

### What are the Main Benefits?

  - Binding framework synchonizes automatically.
  - No need to write bunch of save and update codes in your app which is very time consuming.
  - Changes in source are pushed to the target directly.


### Establishing Data Binding in Two Step Process:

  1. The <u>BindingContext</u> <i>(property target must be set to the source)</i>
  2. <u>Binding</u> Markup extension <i>(Binding must established between the target and the source)</i>
  
<img src="https://cloud.githubusercontent.com/assets/10904957/26750251/55ef8cac-4850-11e7-89c1-401ac51f0acb.png"/>

### Mode Types

- OneWay
  - From Source to Target only.
- TwoWay
  - From Source to Target and Target to Source.
- OneWayToSource
  - From Target to Source only.

### Other Benefits?

  - Data Conversion.
  - Output Formatting.

## Simple Understanding about MVVM (Model-View-View-Model)

  - Is an Architectural Design Pattern.
  - MVVM was invented in XAML in mind.

<img src="https://cloud.githubusercontent.com/assets/10904957/26750273/d9cd4208-4850-11e7-940c-89d451eef9fb.png"/>

From Bindings to MVVM

<img src="https://cloud.githubusercontent.com/assets/10904957/26750295/6e158fba-4851-11e7-8023-d7ae05c33c53.png"/>

In this image, Model is compose of CustomerName(string) and CustomerAge(int). ViewModel represents the connection from Model to View. We use Notify Property Changed to automatically push the changes back and forth from View to ViewModel vice versa and the Binding acts like the agent to connect the ViewModel and the View.

You can also see the UI Button from View that it has a bindable button with a command stored in the ViewModel.

### Here are some benefits of MVVM:

  - Separation of concerns​.
  - Developers can create unit tests for the view model w/o using the view​.
  - Easy to redesign the UI of the app w/o touching the code behind because the view is implemented entirely in XAML​.
  - Since it's architectural design pattern, it's maintainable solution. 

### Some Available MVVM Frameworks for Xamarin (with Links)

  - <a href="https://github.com/MvvmCross/MvvmCross">MvvmCross</a>
  - <a href="https://channel9.msdn.com/Shows/XamarinShow/The-Xamarin-Show-12-MVVM-Light-and-Xamarin-with-Laurent-Bugnion">MvvmLight with Video</a>
  - <a href="https://github.com/reactiveui/ReactiveUI">ReactiveUI</a>
  - <a href="https://github.com/PrismLibrary/Prism">Prism</a>
  - <a href="https://github.com/rid00z/FreshMvvm#freshmvvm-for-xamarinforms">FreshMVVM</a>
  - <a href="https://github.com/xamvvm/xamvvm">XamVVM</a>
  - <a href="https://github.com/exrin/Exrin">Exrin</a>

  Thank you for reading. I hope you’ve learned from me. Feel free to comment below!
