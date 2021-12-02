from django.http.response import HttpResponse
from django.shortcuts import render
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Product
from .serializors import ProductSerializor


# Create your views here.


class ProductDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def delete(self, request, pk):
        try:
            prod = Product.objects.get(id=pk)
            prod.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            prod = Product.objects.get(id=pk)
            updated_prod = ProductSerializor(prod, data=request.data)
            if updated_prod.is_valid():
                updated_prod.save()
                return Response(updated_prod.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(updated_prod.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        try:
            prod = Product.objects.get(id=pk)
            serialized_prod = ProductSerializor(prod)
            return Response(serialized_prod.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ProductListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # POST product

    def post(self, request):
        try:
            prod = ProductSerializor(data=request.data)
            if prod.is_valid():
                prod.save(owner=[request.user])
                return Response(prod.data, status=status.HTTP_201_CREATED)
            else:
                return Response(prod.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # GET products
    def get(self, request):
        try:
            products = Product.objects.all()
            serialized_products = ProductSerializor(products, many=True)
            return Response(serialized_products.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def home(request):
    list_of_products = Product.objects.all()
    print(list_of_products)
    return HttpResponse('<h1>Hello World</h1>')
