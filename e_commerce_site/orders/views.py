from django.shortcuts import render

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Order
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer
from .serializers import PopulatedOrderSerializer


class OrderDetailView(APIView):
    def delete(self, request, pk):
        try:
            ord = Order.objects.get(id=pk)
            ord.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        ord = Order.objects.get(id=pk)
        updated_ord = OrderSerializer(ord, data=request.data)
        if updated_ord.is_valid():
            updated_ord.save()
            return Response(updated_ord.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_ord.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        ord = Order.objects.get(id=pk)
        serialized_item = PopulatedOrderSerializer(ord)
        return Response(serialized_item.data, status=status.HTTP_200_OK)


class OrderListView(APIView):
    # POST /order/
    def post(self, request):
        ord = OrderSerializer(data=request.data)
        if ord.is_valid():
            ord.save()
            return Response(ord.data, status=status.HTTP_201_CREATED)
        else:
            return Response(ord.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # GET /orders/
    def get(self, request):
        orders = Order.objects.all()
        serialized_orders = PopulatedOrderSerializer(orders, many=True)
        return Response(serialized_orders.data, status=status.HTTP_200_OK)
