from rest_framework import serializers
from .models import Product
from jwt_auth.serializers import UserSerializer
from category.serializers import CategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class PopulatedProductSerializer(ProductSerializer):
    owner = UserSerializer(many=True)
    categorys = CategorySerializer(many=True)
