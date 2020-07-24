---
layout: post
type: blog
title:  "How to Deploy Vue.JS App on Azure using Visual Studio Code"
date:   2020-07-24 07:25:33
snippet: Deploying Vue.JS on Azure App service made easy using an extension. In this blog, I'm going to show you how you can create an app service and deploy an Vue.JS app there using VS Code.
---

Deploying Vue.JS App made easy using an extension available on Visual Studio Code. In this blog, I'll guide you on how to create your app service on Azure where you will be able to deploy your Vue.JS app in that instance.

### FTF (First Things First)

- Make sure you have an Azure Subscription to continue. If you don't have a subscription, you can register your own free trial here <a href="https://azure.microsoft.com/en-us/free/" target="_blank">https://azure.microsoft.com/en-us/free/</a>
- Visual Studio Code installed, of course amigo.
- Vue.JS Application
- A cup of coffee or tea ☕ (Optional)

### 1. Create Your Azure App Service

1.1 Go to the <a href="https://portal.azure.com" target="_blank">https://portal.azure.com</a> and search for "App Services" on the search box. Choose the "Create app service" or click the "Add" button.

<img src="https://i.imgur.com/yZqmaHF.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

1.2 Configure the app service based on your preferences. 

<img src="https://i.imgur.com/umZbm4b.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

In this sample, I'm using Free F1 but, you can choose other plans depending on your preferred machine specifications.

1.3 Review and click "Create" when you're done. Wait until it's done then you can view your app service overview like the image below.

<img src="https://i.imgur.com/N02zl0w.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

### 2. Install Extension on your Visual Studio Code
2.1 Open your Visual Studio Code and navigate to the "Extensions" tab. 
2.2 Look for "Azure App Service" then click "Install"

<img src="https://i.imgur.com/7GgUDRv.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

### 3. Deploying your Vue.JS App
3.1 Build first your app using `npm run build` command and wait until it finishes.
3.2 Click the Azure Extension logo on the left side and Sign In your Azure Account. This will open a browser tab where you should login your microsoft account with Azure Subscription.

<img src="https://i.imgur.com/3O8MZZF.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

After you successfully login your azure account, you'll be able to see this.

<img src="https://i.imgur.com/0jD2GdY.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code"/>

#### Option #1
3.3.a Right click your app service, in my case, it's the "myvuejsapp" then choose the "Deploy to Web App..."
3.4.b Browse the "dist" folder then select it.

<img src="https://i.imgur.com/ctbhfsL.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

### Option #2
3.3.a Just simply right click the "dist" folder then choose the "Deploy to Web App..." and choose the app service you want to target. In my case, it's the "myvuejsapp"

<img src="https://i.imgur.com/3HYhMwe.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

Wait until it finishes deploying then you're done. 
<img src="https://i.imgur.com/9fMwiIR.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

Lastly, visit your site.

<img src="https://i.imgur.com/NHSm9TS.png" alt="How to Deploy Vue.JS App on Azure using Visual Studio Code" />

Voila! You have now vue.js running and hosted on Azure App Service.

You can also visit this <a href="https://github.com/Microsoft/vscode-azureappservice/wiki" target="_blank">wiki</a> to learn more about this extension.

If you have some questions or comments, please drop it below 👇 :)
