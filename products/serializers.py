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


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('product', 'quantity', 'id', 'ordered')


class PopulatedOrderItemSerializer(OrderItemSerializer):
    product = PopulatedProductSerializer()


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class PopulatedOrderSerializer(OrderSerializer):
    items = PopulatedOrderItemSerializer(many=True)
