from django.urls import path
from . import views
from .views import (
    CartItemView,
    CartView,
    ProductListView,
    ProductDetailView,
    OrderListView
)

app_name = 'products'

urlpatterns = [
    path('home/', views.home),
    path('<int:pk>/', ProductDetailView.as_view()),
    path('', ProductListView.as_view()),
    path('add-to-cart/<int:pk>/', CartView.as_view(), name='add-to-cart'),
    path('remove-from-cart/<int:pk>/',
         CartItemView.as_view(), name='remove-from-cart'),
    path('orders/', OrderListView.as_view()),
]
