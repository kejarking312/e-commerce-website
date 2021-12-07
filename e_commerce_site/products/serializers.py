from rest_framework import serializers
from .models import Product
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
