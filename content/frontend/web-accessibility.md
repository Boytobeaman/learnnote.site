---
title: "web accessibility"
metaTitle: "web accessibility, 网页无障碍设计"
metaDescription: "web accessibility, 网页无障碍设计"
---


### WAI-ARIA
(Web Accessibility Initiative - Accessible Rich Internet Applications) is a specification written by the W3C, defining a set of additional HTML attributes that can be applied to elements to provide additional semantics and improve accessibility wherever it is lacking. There are three main features defined in the spec:


#### Roles
These define what an element is or does
```
for example:

role="navigation" (<nav>)
role="complementary" (<aside>)
role="banner", 
role="search", 
role="tablist", and 
role="tabpanel"
```
#### Properties
These define properties of elements, which can be used to give them extra meaning or semantics.
```
aria-required="true"
aria-labelledby="label"

```
#### States
Special properties that define the current conditions of elements
```
aria-disabled="true"
```
States differ from properties in that properties don't change throughout the lifecycle of an app, whereas states can change, generally programmatically via JavaScript


### Dynamic content updates - aria-live
Screen readers tend to have difficulty with reporting constantly changing content; with ARIA we can use aria-live to inform screen reader users when an area of content is updated dynamically
```
// The default. Updates should not be announced.
aria-live="off"

// Updates should be announced only if the user is idle.
aria-live="assertive"

// Updates should be announced to the user as soon as possible.
aria-live="assertive"
```

### aria-atomic="true"
```
aria-atomic="true"
the entire changed region as a whole will be presented

aria-atomic="false" 
will stop the screen reader from going up the ancestor chain, so only the updated node being read.
```