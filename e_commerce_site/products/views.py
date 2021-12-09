from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.utils import timezone
from .models import (
    Product,
    Order,
    OrderItem
)
from .serializers import OrderItemSerializer, ProductSerializer, OrderSerializer, PopulatedOrderSerializer
from .serializers import PopulatedProductSerializer


# Create your views here.

class ProductListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # POST product

    def post(self, request):
        try:
            prod = ProductSerializer(data=request.data)
            if prod.is_valid():
                prod.save(owner=request.user)
                return Response(prod.data, status=status.HTTP_201_CREATED)
            else:
                return Response(prod.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    # GET products
    def get(self, request):
        try:
            products = Product.objects.all()
            serialized_products = PopulatedProductSerializer(
                products, many=True)
            return Response(serialized_products.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


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
            request.data['owner'] = request.user.id
            updated_prod = ProductSerializer(prod, data=request.data)
            if updated_prod.is_valid():
                updated_prod.save(owner=request.user)
                return Response(updated_prod.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(updated_prod.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        try:
            prod = Product.objects.get(id=pk)
            serialized_prod = PopulatedProductSerializer(prod)
            return Response(serialized_prod.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CartView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def post(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        print(request.user)
        order_item, created = OrderItem.objects.get_or_create(
            product=product,
            user=request.user,
            ordered=False
        )
        order, _ = Order.objects.get_or_create(
            user=request.user, ordered=False)

        if True:
            # order = order_qs[0]
            print(order.items)

            if not created:
                order_item.quantity += 1
                order_item.save()
                messages.info(request, "Added quantity Item(s)")

            else:
                order_item.quantity = 1
                order_item.save()
                messages.info(request, "Item added to your cart")
            order.items.add(order_item)
            order.save()
            serialized_orders = OrderSerializer(
                order)
            return Response(serialized_orders.data, status=status.HTTP_202_ACCEPTED)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            messages.info(request, "Item added to your cart")
            return redirect("e_commerce_site:product", pk=pk)


class CartItemView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def delete(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order = order_qs[0]
            if order.items.filter(product__pk=product.pk).exists():
                order_item = OrderItem.objects.filter(
                    item=product,
                    user=request.user,
                    ordered=False
                )[0]
                order.items.remove(order_item)
                messages.info(request, "Item remove from your cart")
                return redirect("e_commerce_site:product", pk=pk)
            else:
                messages.info(request, "This Item not in your cart")
                return redirect("e_commerce_site:product", pk=pk)
        else:
            messages.info(request, "You do not have an Order")
            return redirect("e_commerce_site:product", pk=pk)


class OrderListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # # POST product

    # def post(self, request):
    #     try:
    #         prod = ProductSerializer(data=request.data)
    #         if prod.is_valid():
    #             prod.save(owner=request.user)
    #             return Response(prod.data, status=status.HTTP_201_CREATED)
    #         else:
    #             return Response(prod.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    #     except Exception as e:
    #         return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    # GET Orders
    def get(self, request):
        try:
            orders = Order.objects.all()
            serialized_orders = PopulatedOrderSerializer(
                orders, many=True)
            return Response(serialized_orders.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


def home(request):
    list_of_products = Product.objects.all()
    print(list_of_products)
    return HttpResponse('<h1>Hello World</h1>')
