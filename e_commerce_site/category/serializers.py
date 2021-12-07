from django.db import models
from rest_framework import serializers
from products.single_serializer import ProductSerializer

# from reviews.serializers import ReviewSerializer
from .models import Category
# from reviews.serializers import ReviewSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PopulatedCategorySerializer(CategorySerializer):
    products = ProductSerializer(read_only=True, many=True)
