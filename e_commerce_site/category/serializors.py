from django.db import models
from rest_framework import serializers

# from reviews.serializers import ReviewSerializer
from .models import Category
# from reviews.serializers import ReviewSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PopulatedCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
