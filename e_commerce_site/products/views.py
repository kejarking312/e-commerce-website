from django.http.response import HttpResponse
from django.shortcuts import render
from django.http.response import HttpResponse

from .models import Product

# Create your views here.


def home(request):
    list_of_products = Product.objects.all()
    print(list_of_products)
    return HttpResponse('<h1>Hello World</h1>')
