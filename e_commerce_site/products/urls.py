from django.urls import path
from . import views
from .views import ProductListView
from .views import ProductDetailView

urlpatterns = [
    path('home/', views.home),
    path('<int:pk>/', ProductDetailView.as_view()),
    path('', ProductListView.as_view()),
]
