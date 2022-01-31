# SH SPORTS - GA PROJECT 04

![gif](https://github.com/Shak-H/E-commerce-Website/blob/main/Screen%20Recording%202022-01-28%20at%2015.52.27(1).gif)

This is my final project for the General Assembly Software Engineering Immersive course. SH Sports is a full-stack web app, built with a Python Django API and React.

SH Sports is an E-Commerce website. Users can add, edit and delete their own items, as well as add items to Orders list.

This app has been deployed with Heroku and is available here.

Note: Heroku servers are put to sleep after 30 minutes of inactivity, so the site may be slow to load on the first request. After this, it will behave normally.

## TABLE OF CONTENTS

- [Overview](#overview)
  - [Technologies Used](#technologies)
  - [Brief](#brief)
- [Planning](#planning)
- [Backend](#backend)
- [Frontend](#frontend)
- [Wins & Challenges](#wins-challenges)
- [Bugs & Known Errors](#bugs)
- [Future Improvements](#improvements)
- [Key Learnings](#learnings)

## OVERVIEW

### <a name='technologies'>TECHNOLOGIES USED</a>

- Python
- Django
- PostgreSQL
- Django REST Framework
- JWT
- JavaScript (ES6)
- React
- Axios
- Sass
- HTTP-proxy-middleware
- React Bootstrap
- React Router

### <a name='brief'>BRIEF</a>

Build a full-stack application with a React front-end and a Django back-end. It must consume a fully functional RESTful API with all CRUD routes and use multiple relationships. Custom authentication is optional for solo projects.

Wireframes, endpoint mapping, and an entity relationship diagram must be produced prior to development.

## <a name='planning'>PLANNING</a>

Our cohort was given the option to work in pairs, groups, or solo on this project. I opted to work solo, as I wanted to consolidate and test my knowledge by building an entire full-stack app.

I settled on the idea of an E-commerce website fairly quickly. I really wanted to have users be able to add items to a cart and, as this project was primarily aimed at putting into practise what we had learnt about Python, Django and PostgreSQL, I wanted to create the relationship between users, items and orders in the backend. I decided on a clothing e-commerce site, and modelled it on one of my favourite stores, JD Sports. 

The first step was to understand how the relationships between models in the backend would work. I used Google Drawings for my ERD, and Lucidchart for wireframing to map out visuals, endpoints and possible extras.

![image](https://user-images.githubusercontent.com/81522060/151826841-f048e1fa-70d6-4628-8ccb-d1e37552a230.png)

![image](https://user-images.githubusercontent.com/81522060/151826874-d68bea99-5f4e-400c-a851-2bddf491f539.png)

## <a name='backend'>BACKEND</a>

To build my relational database, I used five models - users, products, order items, orders and categories - with each model mapping to a single table within a PostgreSQL database.

### USER MODEL

The first model I built was my custom User model. I wanted to add some additional fields to Django’s default User model and also have the possibility to edit the model later during the process if necessary. I mapped the custom fields into the User model and then included the default Django User class attributes in a serializer. I used Django REST Framework to build a serializer that checks the password and confirmation match and hashes the user’s password.

```

from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError(
                {'password_confirmation': 'Passwords do not match'})

        try:
            password_validation.validate_password(password=password)
        except ValidationError as err:
            raise ValidationError({'password': err.messages})

        data['password'] = make_password(password)

        return data

    class Meta:
        model = User
        fields = '__all__'
        
```

I added authentication middleware using JWT, as certain elements of the site, such as adding items would require authorisation. Finally, I created login and register views, again using JWT to encode tokens on login.

### PRODUCT MODEL & CATEGORY MODEL

The product model was a central point for many of the relationships that connected the database. Each model had an owner attribute to store a foreign key relating to the user who created it, as well as, a category attribute to store a foreign key relating to the category it belonged to. I used a choices widget to create dropdown menus. I also included three additional functions;

- `get_absolute_url` which returns url from product
- `get_add_to_cart_url` which returns url to function add item to cart in the `views.py` file 
- `get_remove_from_cart_url` which returns url to function remove item from cart in `views.py`

Nearly all clothing sites will allow users to select certain clothing categories, most commonly mens, womens and kids clothes. I wanted a separate category model, so when the user wants to navigate the site, they can easily select between these categories. 

```

class Product(models.Model):
    brand = models.CharField(max_length=100)
    product_model = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100)
    colour = models.CharField(max_length=100)
    size = models.CharField(choices=SIZES, max_length=2)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    discount_price = models.DecimalField(
        decimal_places=2, max_digits=5, blank=True, null=True)
    label = models.CharField(choices=LABEL, max_length=2)
    categorys = models.ForeignKey(
        "category.Category", on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, blank=True)
    description = models.CharField(
        max_length=250, default='', blank=True, null=True)
    image_1 = models.CharField(max_length=300)
    image_2 = models.CharField(max_length=300)
    image_3 = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.brand} {self.type}"

    def get_absolute_url(self):
        return reverse("e_commerce_site:product", kwargs={
            "pk": self.pk

        })

    def get_add_to_cart_url(self):
        return reverse("e_commerce_site:add-to-cart", kwargs={
            "pk": self.pk
        })

    def get_remove_from_cart_url(self):
        return reverse("e_commerce_:remove-from-cart", kwargs={
            "pk": self.pk
        })
        
```

I then created two serializers; one for the Products and one which would populate the owner and categories field into any items on the site.

```

from rest_framework import serializers
from .models import OrderItem, Product, Order
from category.models import Category
from jwt_auth.serializers import UserSerializer
from category.serializers import CategorySerializer
from jwt_auth.serializers import SimpleUserSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class PopulatedProductSerializer(ProductSerializer):
    owner = UserSerializer()
    categorys = CategorySerializer()
    
```

I created my urls and views, building CRUD functionality for products as well as adding authentication, so only logged in users can add, edit or delete products. 

```

class ProductListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # POST product

    def post(self, request):
        try:
            prod = ProductSerializer(data=request.data)
            if prod.is_valid():
                prod.save(owner=request.user)
                return Response(prod.data, status=status.HTTP_201_CREATED)
            else:
                return Response(prod.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    # GET products
    def get(self, request):
        try:
            products = Product.objects.all()
            serialized_products = PopulatedProductSerializer(
                products, many=True)
            return Response(serialized_products.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
```

```

urlpatterns = [
    path('home/', views.home),
    path('<int:pk>/', ProductDetailView.as_view()),
    path('', ProductListView.as_view()),
    path('add-to-cart/<int:pk>/', CartView.as_view(), name='add-to-cart'),
    path('remove-from-cart/<int:pk>/',
         CartItemView.as_view(), name='remove-from-cart'),
    path('orders/', OrderListView.as_view()),
]

```
### ORDER ITEM & ORDER MODEL

As mentioned, I wanted to have the cart and CRUD functionality to go with it in the backend. I created the Order Item model to store data of the product the user wants to add along with the quantity. The Order model then stores detailed information of the orders made, and has a many to many relationship with the Order Item model, as the same item can be on several orders. 

```

class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product}"


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateField(auto_now_add=True)
    ordered_date = models.DateField(auto_now_add=True)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

```

The main Django project handles requests from the frontend and routes them to the correct model’s URLs.

I used Postbird to visualise my PostgreSQL database and Postman to test my backend requests, ensuring that my endpoints were correct and I was receiving the right responses.

I had initially hoped to add in a model for reviews, but after completing the work on the five models above, my endpoints list was already looking long and I was concerned about frontend development time. I decided to move on to the frontend, and leave reviews as a potential extra feature if I had time. Despite this, I was really happy with the backend build and hadn’t experienced any major setbacks, bar a bit of time lost (but not wasted!) in Django documentation.

## <a name='frontend'>FRONTEND</a>

With the backend fresh in my mind, I started my work on the frontend by writing an API request library, where axios requests can be imported to the relevant page. Navigation was handled by React-router and I used Sass to write my own CSS styling. I supplemented some elements with React Bootstrap, such as the offcanvas nav and modal’s for the pop-up windows. 

#### HOME

![gif](https://github.com/Shak-H/E-commerce-Website/blob/main/home.gif)

#### ALL ITEMS

![gif](https://github.com/Shak-H/E-commerce-Website/blob/main/all-items.gif)

#### SINGLE ITEM

![gif](https://github.com/Shak-H/E-commerce-Website/blob/main/single-item.gif)

#### ADD AN ITEM

![gif](https://github.com/Shak-H/E-commerce-Website/blob/main/add-item.gif)

## <a name='wins-challenges'>WINS & CHALLENGES</a>

This was my first time working with Django and Python, and I was really happy that I managed to get some complex relationships, particularly in elements such as adding products to cart. A lot of this came down to reading the Django documentation, which is a skill I’m glad I worked on during this project.

In my previous full-stack group project, I had generally manipulated data on the frontend. However, in this project, instead of staying in my JavaScript comfort zone, I used Python and Django to code specific views to filter through the database.

This was the first time I really got to grips with React Bootstrap. In particular, I wanted the forms to be in a pop-up window as this is a very common feature you see on websites, so I was very happy to make this work and felt it added to the user experience. 

I was happy with the different ways a user can navigate the site, there is a search bar, and drop down menu and links on both the home and view all items page which allow users to select particular categories.

In terms of challenges, it initially took me a while to wrap my head around the relational structure of SQL databases and how the different tables work together. In particular, getting the CRUD functionality of adding items to the order items table and then to the orders table, this was definitely my biggest challenge. 

## <a name='bugs'>BUGS & KNOWN ERRORS</a>

The main bug is when adding items to Orders. It works on the back end and when testing in Postman, however there are issues when trying to display this on the Frontend. You can only see two orders on the page and can only see one item per order (unless the same item is added more than once), then if there is less than one order in total the page won't load. 

There are also some styling issues, in particular, on the add an item page, depending on the zoom percentage of the page, the form encroaches on the footer. 

I also didn't have time to add the functionality for the favourites button, or a page which holds only items which are on sale.

## <a name='improvements'>FUTURE IMPROVEMENTS</a>

As mentioned above, I styled a favourites button onto the browse all items and single item page, but these are not currently functional. I’d like to add in filtering by size, brand, etc. 

I would work to fix the issue of displaying orders on the orders page. Aslo, while I was happy to improve my understanding of django and relationships between models in the back end, I would like to look at adding the cart on the front end, possibly using redux. 

Add in a review section to each item, where users can post reviews of different items. 

## <a name='learnings'>KEY LEARNINGS</a>

This was my first project working with Python and Django, and I learned a lot about relational databases and the ease that Django’s ORM offers.

Building the entire app solo, I also consolidated my understanding of React, particularly regarding Hooks and passing props and state between components.

Time management! This was a great opportunity to learn what I am capable of when working alone, and how much is achievable. My previous full-stack project had been a group project, so working solo was a new challenge - there wasn’t someone there to balance out weaknesses and more time was spent overcoming blockers. I was definitely optimistic during planning about how much I could achieve in the time frame.

However, I’m really happy I chose to work alone. Building each and every element of a full-stack app really cemented my learnings from the course and turned weaknesses into strengths. In addition, this project marked the end of my Software Engineering Immersive bootcamp, and has been a huge confidence boost for me as I enter a new industry.

