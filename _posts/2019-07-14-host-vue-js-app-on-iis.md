---
layout: post
type: blog
title:  "Host Vue.JS App on IIS"
date:   2019-07-14 05:05:33
snippet: Today I'm going to help you (with simple steps) how to host your vue.js app on IIS
---

In hosting your vue.js app, you have many options to choose from. You can host on different platforms & services like <a href="https://pages.github.com/">Github Pages</a>, <a href="https://about.gitlab.com/product/pages/">Gitlab Pages</a>, <a href="https://www.netlify.com/"> Netlify</a> etc. or even you can create a Docker container that has deployed Vue.JS inside and run it on different virtual machines (this is another topic). These platforms & services provide easy-to-deploy solution but, what if you are in an environment where all of the web apps should be hosted on IIS? Fortunately, IIS supports an easy solution in running vue.js on it. So, let's get started.

### FTF (First Things First)

If you are using Windows Server, make sure to check you include the "IIS" in the Server Roles. Let's get started.

### 1.0 Deploy your Vue.JS App
1.1 Open the terminal and execute the command 

{{highlight ruby linenos}}
    npm run build
{{endhighlight}}

<img src="https://user-images.githubusercontent.com/10904957/61218941-b8694700-a745-11e9-9980-52e93d7157cd.JPG" />

If building is successfully, you can find the folder with a name "dist".

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
