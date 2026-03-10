---
title: "tailwindcss"
metaTitle: "tailwindcss 使用方法"
metaDescription: "tailwindcss 使用方法，tailwindcss 使用技巧"
---

### custom css


#### components
Use the components layer for any more complicated classes you want to add to your project that you'd still like to be able to override with utility classes.

```
<!-- css -->
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);
    box-shadow: var(--shadow-xl);
  }
}

<!-- html -->
<!-- Will look like a card, but with square corners -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```