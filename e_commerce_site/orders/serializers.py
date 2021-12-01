from django.db import models
from rest_framework import serializers

# from reviews.serializers import ReviewSerializer
from .models import Order
# from reviews.serializers import ReviewSerializer


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class PopulatedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    # one thing: for populating a reverse-relationship,
    # the "many" table (with the FK) is accessed via "whatever_set"
    # q: why? a: this is the django way
    # review_set = ReviewSerializer(read_only=True, many=True)
