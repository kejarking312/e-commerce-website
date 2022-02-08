from django.urls import path
from . import views
from .views import CategoryListView
from .views import CategoryDetailView

urlpatterns = [
    # wildcard: we specify that the route can match /5 or /6
    path('<int:pk>/', CategoryDetailView.as_view()),
    path('', CategoryListView.as_view()),
]
