# Simple Threat Model
![Fred the Ghost](https://github.com/mattboddy47/simple_threat_model/src/images/ghost_logo.png?raw=true)

## Intro
The Simple Threat Model is designed for Developers and Security Engineers to quickly Threat Model their cloud applications as a part of Agile workflow. 

This tool tests whether its feasible to model the threats facing an organisation without the need to draw a data flow diagram. 

## Access
Anyone can sign up to the Simple Threat Model at https://simple-threat-model.web.app/.

## How to use the tool
Really, the Simple Threat Model should be so simple that anybody can use it, but it is understandable that some might be weary about signing up to yet another platform. Firstly, you can rest assured, the sign up is just in place as a method of differentiating user data (i.e. Bob is shown Bob's Threat Model, Alice is shown Alice's Threat Model). The tool is created to use on Firebase, if you would like to spin up your own version of the tool, then you should have everything you need to do so, I will release instructions on how exactly you can do that soon.

## Step 1
Once you are logged in to the Threat Modelling tool, you are presented with a choice, would you like to model your SecOps (i.e. your operational technology), or DevSecOps (i.e. your development environment). SecOps is not active today (it's what I initially created, and I can't bring myself to delete it just yet), so select DevSecOps to move onto step 2. 

![Opening screen](https://github.com/mattboddy47/simple_threat_model/src/images/walkthrough/start_threat_modelling.JPG?raw=true)

## Step 2
This is where the action happens. 

In front of you is a list of technologies that you might be using in your epic, story, task, project or feature. Each technology type is clickable, select a technology you will use and you will be presented with a series of questions about that technology that will assist the model.

![Select tech stack](https://github.com/mattboddy47/simple_threat_model/src/images/walkthrough/select_tech_stack.JPG?raw=true)

The screenshot below shows a selected technology being filled with multiple choice answers helping the Threat Model to understand the data it holds. More about the What, Who, How and Why is discussed under the heading below. 

![File storage](https://github.com/mattboddy47/simple_threat_model/src/images/walkthrough/file_storage.JPG?raw=true)

Once all of the relevant technology is added to the model, select `Review Threats` to navigate to the next page and final step. 

## Step 3

Now you are presented with a set of reccomendations to help keep your data safe within your chosen Tech Stack. The image below shows the reccomendation of ensuring that a file storage API is behind a load balancer to scale to surges in traffic volume. It also provides a reccomendation to ensuring that denial of service attacks are dealt with through the use of a Web Application Firewall. 

![File Storage Reccomendation](https://github.com/mattboddy47/simple_threat_model/src/images/walkthrough/file_storage_reccomendation.JPG?raw=true)

## What, Who, How and Why
To gather relevant data that would otherwise be collected in a Data Flow Diagram, the Simple Threat Model asks 4 questions of technology that holds data, what, who, how and why. By having a structured answer to these, some information about the data and how it is accessed is then understood by us. This allows for an interpretation of how the data could be maliciously accessed, in a similar way to a DFD.
