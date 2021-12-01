from rest_framework import serializers
from .models import Product


class ProductSerializor(serializers.ModelSerializer):
    class Meta:
        model = Product
        field = '__all__'
