---
title: "microsoft azure ai FAQ"
metaTitle: "microsoft azure ai FAQ"
metaDescription: "microsoft azure ai FAQ"
---

### Principal does not have access to API/Operation

assign the role Cognitive Services OpenAI Contributor to yourself

- open https://portal.azure.com/
- find the azure openai resourse
- go to Access control (IAM) - Add - Add role assignment
- find and select "Cognitive Services OpenAI Contributor", click next
- "Assign access to" select "User, group, or service principal"
- Select members select yourself(the login account)


### An error occurred when calling Azure OpenAI: Server responded with status 429, Rate limit is exceeded. Try again in 10 seconds


### Role needed for services
Azure OpenAI need ROLE FOR AI Search:
Search Service Contributor, 
Search Index Data Reader


Azure OpenAI need Role for storage:
Storage Blob Data Contributor


Azure AI Search need roles for Azure OpenAI resource:
Cognitive Services OpenAI Contributor


Azure AI Search need roles for Storage:
Storage Blob Data Reader




### 免费虚拟机便捷创建入口
linux:
https://portal.azure.com/#create/microsoft.freeaccountvirtualmachine-linux

windows
https://portal.azure.com/#create/microsoft.freeaccountvirtualmachine-windows


### Different types of Azure AI Search 
Keyword Search: This is the most common type of search, where users enter a keyword or phrase to find relevant content.

Semantic Search: This type of search uses natural language processing and machine learning to understand the meaning behind search queries and return more relevant results.

Vector Search: This type of search uses vector space models to find similar items based on their features and characteristics.

Hybrid search: Hybrid search combines the strengths of vector search and keyword search.




### azure web app 部署 nodejs 项目不会自动安装依赖
```
// 配置 environment variables

SCM_DO_BUILD_DURING_DEPLOYMENT
true
```