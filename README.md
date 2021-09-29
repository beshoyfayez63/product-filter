# Description of the problem and solution
## Description of the problem
* I have got many products from an api
* Filter products by many things to make it easier for the user to search for a specific product
* Combine multi filters with each other
* I found that the number of products is too many so I decided to handle them with **Pagination**


## My solution
### Divided the application to many components to control:
* `filters component` for handling all filters together like `PriceFilter`, `RatingFilter` and `ColorFilter`
* `products Component` for handling `Products` and `productItem` and `pagination`.
* `categories Component` for handling categories section. 
* `UI Component` for handling UI pieces like `ErrorModal` `LoadingSpinner` and `FilterCard`(Wrapper Component).
* custom hooks like `http-hooks`
* utils for some cleanup

## Bugs:
sometimes i got back empty array from the response when start filtring.




