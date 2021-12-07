from django.urls import path
from . import views
from .views import (
    ProductListView,
    ProductDetailView,
    add_to_cart,
    remove_from_cart,
)

app_name = 'products'

urlpatterns = [
    path('home/', views.home),
    path('<int:pk>/', ProductDetailView.as_view()),
    path('', ProductListView.as_view()),
    path('add-to-cart/<pk>/', add_to_cart, name='add-to-cart'),
    path('remove-from-cart/<pk>/', remove_from_cart, name='remove-from-cart'),
]
