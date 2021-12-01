from django.http.response import HttpResponse
from django.shortcuts import render
from django.http.response import HttpResponse
from .models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializors import ProductSerializor

# Create your views here.


class ProductDetailView(APIView):
    def get(self, request, pk):
        prod = Product.objects.get(id=pk)
        print(prod)


class ProductListView(APIView):
    # GET products
    def get(self, request):
        products = Product.objects.all()
        serialized_products = ProductSerializor(products, many=True)
        return Response(serialized_products.data, status=status.HTTP_200_OK)


def home(request):
    list_of_products = Product.objects.all()
    print(list_of_products)
    return HttpResponse('<h1>Hello World</h1>')
