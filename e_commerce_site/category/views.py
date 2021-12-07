from django.shortcuts import render

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Category
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CategorySerializer
from .serializers import PopulatedCategorySerializer


class CategoryDetailView(APIView):
    def delete(self, request, pk):
        try:
            cat = Category.objects.get(id=pk)
            cat.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        cat = Category.objects.get(id=pk)
        updated_cat = CategorySerializer(cat, data=request.data)
        if updated_cat.is_valid():
            updated_cat.save()
            return Response(updated_cat.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_cat.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        cat = Category.objects.get(id=pk)
        serialized_cat = PopulatedCategorySerializer(cat)
        return Response(serialized_cat.data, status=status.HTTP_200_OK)


class CategoryListView(APIView):
    # POST /category/
    def post(self, request):
        cat = CategorySerializer(data=request.data)
        if cat.is_valid():
            cat.save()
            return Response(cat.data, status=status.HTTP_201_CREATED)
        else:
            return Response(cat.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # GET /category/
    def get(self, request):
        categories = Category.objects.all()
        serialized_categories = PopulatedCategorySerializer(
            categories, many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)
