
# Watson Personality Insights of Hamilton Musical Lyrics
In this developer journey, we will create an app that compares personality traits of characters from the musical 'Hamilton' using Watson Personality Insights, Node JS, HTML, JS and CSS.

![](/design/hamilton-characters.png)


When the reader has completed this journey, they will understand how to:

* Call Watson Personality Insights API using Node JS
* Develop a system to graphically compare Watson PI Data
* Deploy the system to Cloud Foundry or Kubernetes



## Flow

1. Step 1.
2. Step 2.
3. Step 3.
4. Step 4.
5. Step 5.


## With Watson
Want to take your Watson app to the next level? Looking to leverage Watson Brand assets? Join the [With Watson](https://www.ibm.com/watson/with-watson) program which provides exclusive brand, marketing, and tech resources to amplify and accelerate your Watson embedded commercial solution.


## Included components
Select components from [here](../sections/components.md), copy and paste the raw text for ease
* [Component](link): description
* [Component](link): description


## Featured technologies
Select components from [here](../sections/technologies.md), copy and paste the raw text for ease
* [Technology](link): description
* [Technology](link): description


# Watch the Video

# Steps
Use the ``Deploy to Bluemix`` button **OR** create the services and run locally.

## Deploy to Bluemix


1. Press the above ``Deploy to Bluemix`` button and then click on ``Deploy``.


2. In ``Toolchains``, click on ``Delivery Pipeline`` to watch while the app is deployed. Once deployed, the app can be viewed by clicking ``View app``.
![](doc/source/images/toolchain-pipeline.png)




## Run locally
> NOTE: These steps are only needed when running locally instead of using the ``Deploy to Bluemix`` button.



1. [Clone the repo](#1-clone-the-repo)
2. [Create Watson services with IBM Bluemix](#2-create-watson-services-with-ibm-bluemix)
3. [Import the Conversation workspace](#3-import-the-conversation-workspace)
4. [Load the Discovery documents](#4-load-the-discovery-documents)
5. [Configure credentials](#5-configure-credentials)
5. [Run the application](#6-run-the-application)

### 1. Clone the repo





# License
[Apache 2.0](LICENSE)



# Privacy Notice
If using the `Deploy to Bluemix` button some metrics are tracked, the following
information is sent to a [Deployment Tracker](https://github.com/IBM-Bluemix/cf-deployment-tracker-service) service
on each deployment:

* Node.js package version
* Node.js repository URL
* Application Name (`application_name`)
* Application GUID (`application_id`)
* Application instance index number (`instance_index`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)
* Labels of bound services
* Number of instances for each bound service and associated plan information

This data is collected from the `package.json` file in the sample application and the `VCAP_APPLICATION` and `VCAP_SERVICES` environment variables in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

## Disabling Deployment Tracking

To disable tracking, simply remove ``require("cf-deployment-tracker-client").track();`` from the ``app.js`` file in the top level directory.
