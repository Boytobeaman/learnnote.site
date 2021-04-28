---
title: "css flex 布局"
metaTitle: "css flex 布局"
metaDescription: "css flex 布局，如何使用 css flex"
---


### CSS Flexbox Layout Module
Before the Flexbox Layout module, there were four layout modes:

1. Block, for sections in a webpage
1. Inline, for text
1. Table, for two-dimensional table data
1. Positioned, for explicit position of an element

The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.


### The CSS Flexbox Container Properties

Property |	Description| Default value
------------ | ------------- | -------------
align-content | align-content	Modifies the behavior of the flex-wrap property. It is similar to align-items, but instead of aligning flex items, it aligns flex lines(只适用多行的flex容器,也就是flex容器中的子项不止一行时该属性才有效果) | stretch
align-items | Vertically aligns the flex items when the items do not use all available space on the cross-axis | stretch
flex-direction | Specifies the direction of the flexible items inside a flex container | row
flex-wrap | Specifies whether the flex items should wrap or not, if there is not enough room for them on one flex line | nowrap
flex-flow | A shorthand property for flex-direction and flex-wrap | row nowrap
justify-content | Horizontally aligns the flex items when the items do not use all available space on the main-axis | row nowrap



### CSS Flex Items
The direct child elements of a flex container automatically becomes flexible (flex) items.




The flex property is a shorthand property for: 

flex-grow 

flex-shrink 

flex-basis 

The initial value is 0 1 auto. The flex-grow and flex-shrink properties are optional and can be omitted from the flex declaration.


flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。



The flex item properties are: 

Property |	Description| Default value
------------ | ------------- | ------------- 
flex-grow | Specifies how much a flex item will grow relative to the rest of the flex items inside the same container | 0
flex-shrink | Specifies how much a flex item will shrink relative to the rest of the flex items inside the same container | 1
flex-basis | The flex-basis property specifies the initial length of a flexible item. | auto
align-self | Specifies the alignment for a flex item (overrides the flex container's align-items property) | auto
order | Specifies the order of the flex items inside the same container | 0


