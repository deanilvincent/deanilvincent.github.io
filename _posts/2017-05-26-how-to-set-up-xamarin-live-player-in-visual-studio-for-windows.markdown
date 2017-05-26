---
layout: post
type: blog
title:  "How To Set Up Xamarin Live Player in Visual Studio for Windows"
date:   2017-05-26 10:52:56
snippet: I'll show you some steps on how to setup xamarin live player in Visual Studio 2017 v.15.3
---

Last May 08, 2017 at Microsoft Build Day 2 Keynote, Xamarin Live Player was publicly announced and presented. Many Xamarin Developers were amazed by this release and many tech blog sites shared this cool innovation update from Xamarin.

If you're new in Xamarin Development or haven't heard about Xamarin Live Player before, you should be wondering and asking yourself now, "Then why Xamarin Live Player and What is the purpose of this Xamarin Live Player?"

<img src="https://cloud.githubusercontent.com/assets/10904957/26500191/96763aa8-4267-11e7-864d-9b02abb199b3.png"/>

and he added,

<img src="https://cloud.githubusercontent.com/assets/10904957/26500681/6a2b3b04-4269-11e7-8d1c-0df523b8469f.png"/>

<i>by: Joseph Hill</i>

To make it simpler, Xamarin Live Player will make your debugging really fast and easy using your physical device. The good thing about this is that, you can directly test your app and see how your app behaves in real device.

## Basic Steps In Setting Up Your Visual Studio For Xamarin Live Player

### 1.0 Get The App on Google Play Store or AppStore

- Google Play: <a href="https://play.google.com/store/apps/details?id=com.xamarin.live">https://play.google.com/store/apps/details?id=com.xamarin.live</a>

- AppStore: <a href="https://itunes.apple.com/us/app/xamarin-live-player/id1228841832?ls=1&mt=8">https://itunes.apple.com/us/app/xamarin-live-player/id1228841832?ls=1&mt=8</a>

### 2.0 Download and Use Preview Version Of Visual Studio 2017 v15.3 (If you already have Visual Studio 2017 v.15.3, skip this)

Since the Xamarin Live Player is only working for Visual Studio 2017 v.15.3 (Preview as of May 2017), you need to install a new Visual Studio 2017 v.15.3.

2.1 Here's the link of version 15.3 - Preview: <a href="https://www.visualstudio.com/en-us/news/releasenotes/vs2017-preview-relnotes">https://www.visualstudio.com/en-us/news/releasenotes/vs2017-preview-relnotes</a>

2.2 After downloading the installer, it will ask you to name the preview visual studio 2017 to avoid conflict and to your visual studio 2017 15.2 (if you already installed that).

Here in my case, I just named it as 2,

<img src="https://cloud.githubusercontent.com/assets/10904957/26501544/85dad2b2-426c-11e7-881d-974fe230a9f6.PNG">

2.3 Choose the Mobile development with .NET and check some of the features you want to be included.

<img src="https://cloud.githubusercontent.com/assets/10904957/26501832/48d4caca-426d-11e7-8dd7-01ff90cea9d6.PNG"/>

<img src="https://cloud.githubusercontent.com/assets/10904957/26501840/4b0a2efc-426d-11e7-9f0a-70e6516fbf0c.PNG"/>

2.4 After it is downloaded and installed, you can now run your Visual Studio 2017 v.15.3

### 3.0 Working on Extensions and Updates

3.1 First you need to download this, <a href="https://marketplace.visualstudio.com/items?itemName=Xamarin.XamarinUpdater">Xamarin Updater</a> to include it inside the Updates.

3.2 Click the downloaded installer and the VSIX Installer dialog will appear, install and wait until it successfully finished.

<img src="https://cloud.githubusercontent.com/assets/10904957/26502303/edb8a68c-426e-11e7-80ae-1f67642b5c67.PNG"/>

3.3 Open your Visual Studio 2017 v.15.3 and locate the "Extensions and Updates" in Tools menu.

3.4 Go to "Updates" -> Xamarin Preview(2) and click "Update"

3.5 Once you have finished, you can notice in "Installed" -> "All" the Xamarin for Visual Studio [Experimental]

<img src="https://cloud.githubusercontent.com/assets/10904957/26502643/1d0ab64a-4270-11e7-8b0d-abcd1961be26.PNG"/>

### 4.0 Checking The Live Player Features

Now you already setup your visual studio 2017 15.3 environment for Xamarin Live Player, you can now ready to use it.

4.1 Open Visual Studio 2017 v.15.3

4.2 Create or open the app and check if "Live Player" appear.

<img src="https://cloud.githubusercontent.com/assets/10904957/26503101/feb24b84-4271-11e7-8ad6-2a2c43b2fe13.PNG"/>

When you see it, it means you successfully added the Xamarin Live Player features.

## Helpful links
For Xamarin Live Player FAQ, go to this <a href="https://blog.xamarin.com/xamarin-live-player-faq/">link</a>

For troubleshooting procedures, go to this <a href="https://developer.xamarin.com/guides/cross-platform/live/troubleshooting/">link</a>


Thank you for reading my this post. Feel free to comment below :)