# SupportKit

# tl;dr
    pod 'SupportKit'
    pod update
    [SupportKit showInViewController:self withZendeskURL:@"https://supportkit.zendesk.com"];

# Installation

Installation of the SupportKit SDK is ridiculously simple and requires only one line of code. Quickly integrate the SupportKit SDK with your project through CocoaPods which also manages library dependencies and SDK updates. Alternatively, you can go the manual route and drop the SDK in your Xcode project.


## Installation via CocoaPods


### Step 1: Install CocoaPods.
Run the following command line in Terminal if [CocoaPods](http://beta.cocoapods.org/?q=#install) isn't already installed:

    $ sudo gem install cocoapods


### Step 2: Run SupportKit's CocoaPod.
In your XCode project directory, run the following:

     $ echo "pod 'SupportKit'" >> Podfile
     $ pod install

Open the .xcworkspace file that Cocoapods generates or modifies in your project directory.


### Step 3: Insert code and launch SupportKit.
Time to insert one line of code and launch SupportKit. See section [Insert Code and Launch SupportKit from Your App.](#Insert Code and Launch SupportKit from Your App)


## Installation via SDK package

### Step 1: Download and unzip.
Download the SDK package from here, and unzip it into your project.


### Step 2: Add SupportKit libraries to XCode.
Drag & drop both SupportKit.framework and SupportKit.bundle to your project in Xcode.

![Xcode with all the frameworks](https://raw.github.com/radialpoint/SupportKit/master/readme_img/dragdrop_sdk.png)


### Step 3: Add other library dependencies.
Add the following frameworks & libs to your project (go to "Build phases" in your project target and select "Link Binary With Libraries"):
- CoreText
- AdSupport
- SystemConfiguration
- CoreTelephony
- Foundation
- CoreGraphics
- UIKit
- libxml2.dylib
- Security

![Xcode with linked frameworks](https://raw.github.com/radialpoint/SupportKit/master/readme_img/linked_framework.png)


### Step 4: Insert one line of code.
Time to insert one line of code and launch SupportKit. See section [Insert Code and Launch SupportKit from Your App.](#Insert Code and Launch SupportKit from Your App)


## Insert Code and Launch SupportKit from Your App
<a name="Insert Code and Launch SupportKit from Your App"></a>
Add the following import statement to the UIViewController that is launching SupportKit:

    #import <SupportKit/SupportKit.h>

And insert this one line of code:

    [SupportKit showInViewController:self withZendeskURL:@"https://supportkit.zendesk.com"];

Optionally, you can specify the specific URL to your ticket creation page (the SDK uses \<zendeskURL>/anonymous_requests/new by default). Passing nil will disable creating tickets.

    [SupportKit showInViewController:self withZendeskURL:@"https://supportkit.zendesk.com" andTicketURL:@"https://supportkit.zendesk.com/requests/new"];

You're done. Build and launch your app.

# Demo App
Download our demo app [here](https://github.com/radialpoint/SupportKit/archive/master.zip).
# Support
Have a look at our [API Documentation](http://www.somewhere.com). Still stuck? Want to suggest a new feature? Check out our [support center](http://supportkit.zendesk.com).